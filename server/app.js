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

//configs
import passportCFG from './config/passport';
import webpackConfig from '../webpack.config.js';


//routers
import auth from './routes/auth';
import api from './API';

const compiler = webpack(webpackConfig);

const app = express();


app.disable('x-powered-by');
app.use(require("webpack-dev-middleware")(compiler, {
    hot: true,
    inline: true,
    progress: true,
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



passportCFG(passport);
app.use(passport.initialize());
app.use('/', auth);
app.use('/api', api);

app.get('/*', (req, res)=> {
    res.sendFile('views/index.html', {root: './server/' });
});
const server = Server(app);
server.listen(8090,()=>{
    console.log('start Server at http://localhost:8090/'.cyan);
});

export const io = socketServer(server);


// let clients2= {};
// app.get('/subscribe',(req,res)=>{
//     let id = new Date();
//     clients2[id]=res;
//     res.on('close',()=>{
//         console.log('соедение разорвано y clientId: '+id);
//         delete clients2[id];
//     });
// });
//
// app.post('/sendmessage',(req,res)=>{
//     for (let key in clients2){
//         clients2[key].end(req.body.message+'clientId: '+key);
//     }
//     clients2={};
//     res.send('ok');
// });
