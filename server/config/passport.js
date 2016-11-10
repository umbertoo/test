import bcrypt from 'bcrypt-nodejs';
import isArray from 'lodash/isArray';
//strategys
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
//configs
import config from './main';
//models
import { User, Role, ServerRole } from '../models/';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey : config.secret
};

export default passport => {
  passport.use('jwt',new JwtStrategy(opts, async(jwt_payload, done)=> {
    try {
      const user = await User.findOne({
        where:{ id: jwt_payload.user.id },
        include:[{
          model:ServerRole, attributes:['serverId'],
          include:[Role]
        }]
      });
      if(!user) return done(null, false); // or you could create a new account;

      const roles = {};
      user.serverRoles.forEach(e=>{
        roles[e.serverId] = [...roles[e.serverId] || [], e.role.name];
      });
      const {name, id, email, avatar} = user;
      const newUser = {id, name , email, roles};
      console.log(newUser.roles);
      done(null, newUser);

    } catch (e) {
      done(e,false);
    }

  }));
  const optsres = {
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter('tkn'),
    secretOrKey : config.secret
  };

  passport.use('jwtResetPassword', new JwtStrategy(optsres,
    (jwt_payload, done)=> {

      User.findOne({where:{ id: jwt_payload.user.id }}).then(user=>{
        if (user) {
          done(null, jwt_payload.user);
        } else {
          done(null, false);
          // or you could create a new account
        }
      },e=>{
        return done(e,false);
      });

    }));
    ///login-----------------------------------------------------
    passport.use('login', new LocalStrategy({usernameField: 'email'},
    async (email, password, done)=>{
      try {
        const user = await User.findOne({where:{ email: email }});
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }
        return done(null, user);
      } catch (e) {
        done(e);
      }
    }
  )
);


///---------------Signup-----------------------------------------------------
passport.use('signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: false
},
async(req, email, password, done)=> {
  try {
    const userExist = await User.findOne({where:{ email }});
    if (userExist) {
      return done(null, false, { message: 'this email is taken already' });
    }
    const user = await User.create({
      name: req.body.name,
      password: password,
      email:email
    });
    done(null, user);

  } catch (e) {
    if (isArray(e.errors)){
      const list = e.errors.map(err=>({[err.path]:""+err.message}));
      return done(null, false, { message: list });
    }
    done(e);
  }
}
));

};
