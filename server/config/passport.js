import bcrypt from 'bcrypt-nodejs';
//strategys
import {Strategy as LocalStrategy} from 'passport-local';
import {ExtractJwt, Strategy as JwtStrategy} from 'passport-jwt';
//configs
import config from './main';
//models
import User from '../models/user';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey : config.secret
};

export default function(passport){

    passport.use('jwt',new JwtStrategy(opts, (jwt_payload, done)=> {
        User.findOne({where:{ id: jwt_payload.user.id }}).then(user=>{
            if (user) {
                done(null, jwt_payload.user);
            } else {
                done(null, false);
                // or you could create a new account
            }
        },err=>{
            console.log('Error ',err);
            return done(err,false);
        });

    }));
    var optsres = {
        jwtFromRequest: ExtractJwt.fromUrlQueryParameter('tkn'),
        secretOrKey : config.secret
    };

    passport.use('jwtResetPassword',
    new JwtStrategy(optsres, (jwt_payload, done)=> {

        User.findOne({where:{ id: jwt_payload.user.id }}).then(user=>{
            if (user) {
                done(null, jwt_payload.user);
            } else {
                done(null, false);
                // or you could create a new account
            }
        },err=>{
            console.log('Error ',err);
            return done(err,false);
        });

    }));
    ///login-----------------------------------------------------
    passport.use('login',new LocalStrategy({usernameField: 'email'},
    (email, password, done)=>{

        User.findOne({where:{ email: email }}).then(user=>{
            if (!user) {
                return done(null, false, { message: 'Incorrect email or password.' });
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false, { message: 'Incorrect email or password.' });
            }
            return done(null, user);

        },err=>{
            if (err) { return done(err); }
        }
    );
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

function(req, email, password, done) {
    console.log('1--------------');
    User.findOne({where:{ email: email }}).then(user=>{
        if (user) {
            return done(null, false, { message: 'this email already taken' });
        }
        if (!user) {
            User.create({
                name: req.body.name,
                password: password,
                email:email
            }).then(user=> done(null, user),err=>{
                let list = err.errors.map(err=>({[err.path]:""+err.message}));
                return done(null, false, { message: list });
            });
        }

    },err=>done(err));
}
));

};
