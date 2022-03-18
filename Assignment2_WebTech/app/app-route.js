import express from 'express';
import car from './car.js';
const app=express.Router();

const cars=[];
cars.push(new car(1,'Ferrari',1987,20000000));
cars.push(new car(2,'Ford Mustang',1969,8000000));

app.get('/cars',(req,resp)=>{
    resp.setHeader("Context-Type","application/javascript");
    resp.send(cars);
});

app.get('/cars/:id',(req,resp)=>{
    resp.setHeader('Context-Type','application/json');
    const id=JSON.parse(req.params.id);
    const car=cars.find(c=>c.id===id);
    if (car) {
        resp.send(car);
    }else{
        resp.status.send("Record has not Found");
    }
});

app.delete('/cars/delete/:id',(req,resp)=>{
    resp.setHeader('Content-Type','application/json');
    const id=JSON.parse(req.params.id);
    for (let i = 0; i < cars.length; i++) {
        if(i===(id-1)){
            cars.splice(i, 1);
        }
    }
    resp.send(cars);
});

app.post('/cars/add',(req,resp)=>{
    resp.setHeader("Context-Type","application/javascript");
    cars.push(new car(JSON.parse(req.body.id),req.body.name,JSON.parse(req.body.model),JSON.parse(req.body.price)));
    resp.send(cars);
});

app.put('/cars/update/:id',(req,resp)=>{
    resp.setHeader('Content-Type','application/json');
    const id=JSON.parse(req.params.id);
    cars.forEach(c=>{
        if(c.id==id){
            c.id=parseInt(req.body.id);
            c.name=req.body.name;
            c.model=parseInt(req.body.model);
            c.price=parseInt(req.body.price);
            resp.send(cars);
        }
    });
    resp.send("Record has been updated..");
});
export default app;