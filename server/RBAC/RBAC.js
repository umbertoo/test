
const attributes = {
  own : params => params.message.userId === params.userId,
  isMember : params => params.servers.some(s=>s.id==params.serverId)
};


class RBAC {
  constructor(opts) {
    if(typeof opts === 'function') {
      this.getRoles = opts;
    }
    this.isInited = false;
    this.init(opts);
  }
  update(){
    this.init(this.getRoles);
  }
  init(roles) {
    if(typeof roles === 'function') {
      this._init = this.getRoles().then(data => this.init(data));
      return;
    }
    if(typeof roles !== 'object') {
      throw new TypeError('Expected an object as input');
    }
    this.roles = roles;
    const map = {};
    Object.keys(roles).forEach(role => {
      map[role] = {
        can: {}
      };
      if(roles[role].inherits) {
        map[role].inherits = roles[role].inherits;
      }

      roles[role].can.forEach(operation => {
        if(typeof operation === 'string') {
          map[role].can[operation] = 1;
        } else if(typeof operation.name === 'string' && typeof operation.when === 'string') {
          // map[role].can[operation.name] = operation.when;
          map[role].can[operation.name] = attributes[operation.when];
        }
        // Ignore definitions we don't understand
      });

    });
    console.log(map);
    this.roles = map;
    this.isInited = true;
  }

  can(role, operation, params, cb) {
    console.log('can'.yellow, role );
    if (!this.isInited){
      console.log('!!!!2'.magenta);
      return this._init.then(()=>this.can(role, operation, params, cb));
    }


    if(typeof params === 'function') {
      cb = params;
      params = undefined;
    }

    const callback = cb || (()=>{});

    return new Promise((resolve, reject) => {

      if (Array.isArray(role)){

        if(!role.length) return reject(false);

        return Promise.all(
          role.map(r => this.can(r, operation, params)
          .then(res=>res)
          .catch(err=>{
            if(err!=false) reject(err);
            return err;
          })
        ))
        .then(res=> res.some(e=>e===true) ? resolve(true) : reject(false) );
      }

      if (typeof role !== 'string') {
        throw new TypeError('Expected first parameter to be string : role');
      }

      if (typeof operation !== 'string') {
        throw new TypeError('Expected second parameter to be string : operation');
      }

      const $role = this.roles[role];

      if (!$role) {
        reject(false);
        // throw new Error('Undefined role');
      }
      // IF this operation is not defined at current level try higher
      if (!$role.can[operation]) {
        // If no parents reject
        if (!$role.inherits) {
          return reject(false);
        }
        // Return if any parent resolves true or all reject
        return Promise.all(
          $role.inherits.map(parent => this.can(parent, operation, params).then(res=>res,err=>err))
        ).then(res=> res.some(e=>e===true) ? resolve(true) : reject(false));
      }

      // We have the operation resolve
      if ($role.can[operation] === 1) {
        return resolve(true);
      }

      // Operation is conditional, run async function
      if (typeof $role.can[operation] === 'function') {
        return  $role.can[operation](params) ? resolve(true) :  reject(false);
        // $role.can[operation](params, (err, result)=> {
        //     if(err) {
        //         return reject(err);
        //     }
        //     if(!result) {
        //         return reject(false);
        //     }
        //     resolve(true);
        // });
        // return;
      }
      // No operation reject as false
      reject(false);
    });
  }
}

export default RBAC;
// class RBAC {
//   constructor(opts) {
//     if(typeof opts === 'function') {
//       this.getRoles = opts;
//     }
//     this.isInited = false;
//     this.init(opts);
//   }
//   update(){
//     this.init(this.getRoles);
//   }
//   init(roles) {
//     if(typeof roles === 'function') {
//       this._init = this.getRoles().then(data => this.init(data));
//       return;
//     }
//     if(typeof roles !== 'object') {
//       throw new TypeError('Expected an object as input');
//     }
//     this.roles = roles;
//     const map = {};
//     Object.keys(roles).forEach(role => {
//       map[role] = {
//         can: {}
//       };
//       if(roles[role].inherits) {
//         map[role].inherits = roles[role].inherits;
//       }
//
//       roles[role].can.forEach(operation => {
//         if(typeof operation === 'string') {
//           map[role].can[operation] = 1;
//         } else if(typeof operation.name === 'string' && typeof operation.when === 'function') {
//
//           map[role].can[operation.name] = operation.when;
//         }
//         // Ignore definitions we don't understand
//       });
//
//     });
//
//     this.roles = map;
//     this.isInited = true;
//   }
//
//   can(role, operation, params, cb) {
//     console.log('can'.yellow, role );
//     if (!this.isInited){
//       console.log('!!!!2'.magenta);
//       return this._init.then(()=>this.can(role, operation, params, cb));
//     }
//
//
//     if(typeof params === 'function') {
//       cb = params;
//       params = undefined;
//     }
//
//     const callback = cb || (()=>{});
//
//     return new Promise((resolve, reject) => {
//
//       if (Array.isArray(role)){
//         return Promise.all(
//           role.map(r => this.can(r, operation, params)
//           .then(res=>res)
//           .catch(err=>{
//             if(err!=false) reject(err);
//             return err;
//           })
//         ))
//         .then(res=> res.some(e=>e===true) ? resolve(true) : reject(false) )
//       }
//
//       if (typeof role !== 'string') {
//         throw new TypeError('Expected first parameter to be string : role');
//       }
//
//       if (typeof operation !== 'string') {
//         throw new TypeError('Expected second parameter to be string : operation');
//       }
//
//       const $role = this.roles[role];
//
//       if (!$role) {
//         throw new Error('Undefined role');
//       }
//       // IF this operation is not defined at current level try higher
//       if (!$role.can[operation]) {
//         // If no parents reject
//         if (!$role.inherits) {
//           return reject(false);
//         }
//         // Return if any parent resolves true or all reject
//         return Promise.all(
//           $role.inherits.map(parent => this.can(parent, operation, params).then(res=>res,err=>err))
//         ).then(res=> res.some(e=>e===true) ? resolve(true) : reject(false))
//       }
//
//       // We have the operation resolve
//       if ($role.can[operation] === 1) {
//         return resolve(true);
//       }
//
//       // Operation is conditional, run async function
//       if (typeof $role.can[operation] === 'function') {
//         return  $role.can[operation](params) ? resolve(true) :  reject(false);
//         // $role.can[operation](params, (err, result)=> {
//         //     if(err) {
//         //         return reject(err);
//         //     }
//         //     if(!result) {
//         //         return reject(false);
//         //     }
//         //     resolve(true);
//         // });
//         // return;
//       }
//       // No operation reject as false
//       reject(false);
//     });
//   }
// }
//
// export default RBAC;
