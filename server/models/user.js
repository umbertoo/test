import Sequelize from 'sequelize';
import db from '../db';
import bcrypt from 'bcrypt-nodejs';

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
        setPassword: function(password, done) {
            return bcrypt.genSalt(10, function(err, salt) {
                return bcrypt.hash(password, salt, function(error, encrypted) {
                    this.password = encrypted;
                    this.salt = salt;
                    return done();
                });
            });
        },
        verifyPassword: function(password, done) {
            return bcrypt.compare(password, this.password, function(err, res) {
                return done(err, res);
            });
        }
    }
});
User.beforeCreate(function(user, options, done) {
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return done(err);
        console.log('Salt: ' + 'getting ' + salt);
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return done(err);

            console.log('Info: ' + 'getting ' + hash);

            user.password = hash;

            console.log('Info: ' + 'password now is: ' + user.password);

            return done(null,user);
        });
    });
});
User.sync(
    // {force: true}
).then( () =>{

});
export default User;
