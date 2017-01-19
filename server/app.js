import colors from 'colors';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import { Server } from 'http';
import socketServer from './socket-server';
import helmet from 'helmet';
import session from 'express-session';
import connectRedis from 'connect-redis';

//configs
import passportCFG from './config/passport';
import webpackConfig from '../webpack.config.js';

import db from './models/db';

//routers
import auth from './routes/auth';
import api from './API';

const compiler = webpack(webpackConfig);

const app = express();


// const RedisStore = connectRedis(session);
// app.use(helmet());

app.disable('x-powered-by');
app.use(require("webpack-dev-middleware")(compiler, {
  index: "./dist/index.html",
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  inline: true,
  progress: true,
  color:true,
  stats: 'errors-only',
  historyApiFallback: true,
}));
app.use(require("webpack-hot-middleware")(compiler, {
  log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));
app.use(express.static(path.join(__dirname, '/../public')));

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// console.log(multer);
// app.use(multer({dest:'./uploads/'}));

// app.use(session({
//     store: new RedisStore({logErrors:true}),
//     secret: 'keyboard cat'
// }));

passportCFG(passport);
app.use(passport.initialize());

app.use('/', auth);
app.use('/api', api);

app.get('/*', (req, res)=> {
  res.sendFile('views/index.html', {root: './server/' });
});


//handle errors
app.use((err, req, res, next) =>{
  console.error('error'.red);
  console.error('stack',err.stack);
  next(err);
});
app.use((err,req,res,next)=>{
  if (typeof err == 'number'){
    switch (err) {
      case 401:
      res.status(401).json({error:'access denied'});
      break;
      default:
      res.sendStatus(err);
    }
  } else {
    res.sendStatus(500);
  }
  next(err);
});
const server = Server(app);
server.listen(8090,()=>{
  console.log('start Server at http://localhost:8090/'.blue);
});

export const io = socketServer(server);
