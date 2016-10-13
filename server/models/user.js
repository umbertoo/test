import Sequelize from 'sequelize';
import db from '../db';
import bcrypt from 'bcrypt-nodejs';
import path from 'path';
const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        validate:{
            len:{args:[3], msg: "Minimum 3" },
        },
    },
    avatar: {
        type: Sequelize.STRING,
        defaultValue:'/images/avatars/defavatar.jpg'
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            isEmail: {msg:"Invalid email format"}
        }
    },
    resetPasswordToken: {
        type: Sequelize.STRING,

    },
    resetPasswordExpires: {
        type: Sequelize.DATE,

    }
},{
    instanceMethods: {
        setPassword(password, done) {
            return bcrypt.genSalt(10, (err, salt) =>  {
                return bcrypt.hash(password, salt, (error, encrypted)=> {
                    this.password = encrypted;
                    this.salt = salt;
                    return done();
                });
            });
        },
        verifyPassword(password, done) {
            return bcrypt.compare(password, this.password, (err, res)=> {
                return done(err, res);
            });
        },
      toJSON () {
        const values = this.get();

        delete values.password;
        delete values.resetPasswordToken;
        delete values.resetPasswordExpires;
        return values;
      }
    }
});
User.beforeCreate((user, options, done) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return done(err);
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return done(err);
            user.password = hash;
            return done(null,user);
        });
    });
});

export default User;
