


class RBAC {
  constructor(opts) {
    this.init(opts);
  }

  init(roles) {
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
        } else if(typeof operation.name === 'string' && typeof operation.when === 'function') {

          map[role].can[operation.name] = operation.when;
        }
        // Ignore definitions we don't understand
      });

    });

    this.roles = map;
  }

  can(role, operation, params, cb) {

    if(typeof params === 'function') {
      cb = params;
      params = undefined;
    }

    let callback = cb || (()=>{});

    return new Promise((resolve, reject) => {

      if (typeof role !== 'string') {
        throw new TypeError('Expected first parameter to be string : role');
      }

      if (typeof operation !== 'string') {
        throw new TypeError('Expected second parameter to be string : operation');
      }

      let $role = this.roles[role];

      if (!$role) {
        throw new Error('Undefined role');
      }
      // IF this operation is not defined at current level try higher
      if (!$role.can[operation]) {
        // If no parents reject
        if (!$role.inherits) {
          return reject(false);
        }
        // Return if any parent resolves true or all reject
        return Promise.all(
          $role.inherits.map(parent => this.can(parent, operation, params))
        ).then(res=> res.some(e=>e) ? resolve(true) : reject(false));
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
  };
}

export default RBAC;
