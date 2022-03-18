import express from 'express';
import path from 'path';
import app from './app/app-route.js';
const dirname=path.resolve(path.dirname(''));
const port =3000;
const server=express();
server.use(express.urlencoded({extended:true}));
server.use(express.json());

server.get('/',(req,resp)=>{
    resp.setHeader('Context-Type','text/html');
    resp.sendFile(dirname+"/index.html");
});
server.get('/style.css',(req,resp)=>{
    resp.setHeader('Context-Type','text/css');
    resp.sendFile(dirname+"/css/style.css");
});
server.get('/main.js',(req,resp)=>{
    resp.setHeader('Context-Type','application/javascript');
    resp.sendFile(dirname+"/js/main.js");
});
server.get('/app-route.js',(req,resp)=>{
    resp.setHeader('Context-Type','application/javascript');
    resp.sendFile(dirname+"/app/app-route.js");
});
server.get('/car.js',(req,resp)=>{
    resp.setHeader('Context-Type','application/javascript');
    resp.sendFile(dirname+"/app/car.js");
});

server.use('/app',app);
server.listen(port,()=>{
    console.log("http://localhost:3000/ is started.....");
});