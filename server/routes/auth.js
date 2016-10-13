
import {Router} from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
//models
import User from '../models/user';
//configs
import transporter from '../config/nodemailer';
import config from '../config/main';


const authRouter = Router();
const checkJWTResetPassword = passport.authenticate('jwtResetPassword', { session: false});

const generateJWT = user =>{
	const timestamp = new Date().getTime();
	return jwt.sign({user:user, iat: timestamp}, config.secret ,{ expiresIn: 10080});
};


authRouter.post('/login', (req, res, next)=> {
	passport.authenticate('login', (err, user, info)=> {
		if (err) {
			return next(err);
		 }
			if (!user) {
				return res.status(401).json(info);
			}
			console.log(generateJWT(user),user);
			                                //'JWT '+
			return res.json({user:user, token:generateJWT(user)});

		})(req, res, next);
	}
);

authRouter.post('/signup', (req,res)=>{
	const { password, name, email } = req.body;
	if (!email)
	return res.status(401).json( {message: 'the email is required'} );
	if (!name)
	return res.status(401).json( {message: 'the name is required'} );
	if (!password)
	return res.status(401).json( {message: 'the password is required'} );

	User.findOne({where:{ email: email }}).then(user=>{
		if (user){
		return res.status(401).json( {message: 'this email already taken'} );

		}else {
			User.create({
				name: req.body.name,
				password: password,
				email:email
			}).then(
				user=>res.json({user:user, token:'JWT '+generateJWT(user)}),
				err=>{
					const list = err.errors.map(err=>err.message);
					return res.status(401).json({message: list.join(',') });
				});
			}

		},err=>console.log(err));
	});


	authRouter.post('/reset_password', (req,res)=>{

		if (req.body.email){

			User.findOne({where:{email:req.body.email}}).then(user=>{

				const mailOptions = {
					from: '"support 👥" <foo@blurdybloop.com>', // sender address
					to: 'v.kokovin@gmail.com', // list of receivers
					subject: 'reset_password', // Subject line
					text: '', // plaintext body
					html: 'You can reset password in this page '+
					'<a href="http://localhost:30000/change_password/?tkn='+generateJWT(user)+'">reset_password_page</a> '
				};
				transporter.sendMail(mailOptions, (error, info)=>{
					if(error){
						return console.log(error);
					}
					console.log('Message sent: ' + info.response);
				});
				res.json({YES:user});

			});
		}

	});

	authRouter.post('/change_password', checkJWTResetPassword,(req,res)=>{
		res.json({YES:'YES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', ss: req.query});

	});
	authRouter.use((err,req,res,next)=>{
		const output = {
			error: {
				name: err.name,
				message: err.message,
				text: err.toString()
			}
		};
		console.log("Поймали ошибку ------------------------------------------------", output);
		const statusCode = err.status || 500;
		res.status(statusCode).json(output);
	});

	export default authRouter;
