import express from "express";
import app from './app/app-route.js';
import path from 'path';

const port=3000;
const dirname=path.resolve(path.dirname(""));
const server=express();
server.use(express.urlencoded({extended:true}));
server.use(express.json());

server.get('/',(req,resp)=>{
    resp.setHeader("Context-Type","text/html");
    resp.sendFile(dirname+"/index.html");
});
server.get('/style.css',(req,resp)=>{
    resp.setHeader("Context-Type","text/css");
    resp.sendFile(dirname+"/css/style.css");
});
server.get('/book.js',(req,resp)=>{
    resp.setHeader("Context-Type","application/json");
    resp.sendFile(dirname+"/app/book.js");
});
server.get('/person.js',(req,resp)=>{
    resp.setHeader("Context-Type","application/json");
    resp.sendFile(dirname+"/app/person.js");
});
server.get('/car.js',(req,resp)=>{
    resp.setHeader("Context-Type","application/json");
    resp.sendFile(dirname+"/app/car.js");
});
server.get('/jquery-3.6.0.js',(req,resp)=>{
    resp.setHeader("Context-Type","application/json");
    resp.sendFile(dirname+"/js/jquery-3.6.0.js");
});
server.get('/main.js',(req,resp)=>{
    resp.setHeader("Context-Type","application/json");
    resp.sendFile(dirname+"/js/main.js");
});
server.get('/app-route.js',(req,resp)=>{
    resp.setHeader("Context-Type","application/json");
    resp.sendFile(dirname+"/app/app-route.js");
});
server.use('/app',app);
server.listen(port,()=>{
    console.log("http://localhost:3000 is started");
});