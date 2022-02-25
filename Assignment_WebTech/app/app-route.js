import express from 'express';
import book from './book.js'
import car from './car.js';
import person from './person.js';
const app=express.Router();

                        //For Books
const books=[];
books.push(new book(1,'Harry Potter','J. K. Rowling',250));
books.push(new book(2,'Game of Thrones','George R. R. Martin',381));
app.get('/books',(req,resp)=>{
    resp.setHeader('Context-Type','application/json');
    resp.send(books);
});
app.get('/books/:id',(req,resp)=>{
    resp.setHeader('Context-Type','application/json');
    const id=JSON.parse(req.params.id);
    const book=books.find(b=>b.id===id);
    if (book) {
        resp.send(book);
    }else{
        resp.status.send("Record has not Found");
    }
});
app.put('/books/update/:id',(req,resp)=>{
    resp.setHeader('Content-Type','application/json');
    const id=JSON.parse(req.params.id);
    const updatedbook=req.body;
    books.forEach(b=>{
        if(b.id==id){
            b.name=updatedbook.name;
            b.author=updatedbook.author;
            b.price=updatedbook.price;
        }
    });
    resp.send("Record has been updated..");
});
app.delete('/books/update/delete/:id',(req,resp)=>{
    resp.setHeader('Content-Type','application/json');
    const id=JSON.parse(req.params.id);
    const book=books.find(p=>p.id===id);
    if(book){
        books.pop();
        resp.send("Record has been Deleted");
    }else{
        resp.send("Record has not found");
    }
});
app.post('/books/add',(req,resp)=>{
    resp.setHeader('Content-Type','application/json');
    const book={'id':req.body.id,"name":req.body.name,"author":req.body.author,"price":req.body.price};
    if(book){
        books.push(book);
        resp.send("Record has been Inserted");
    }else{
        resp.send("OOPS,Something went wrong");
    }
});

                        //FOR Person
const person_list=[];
person_list.push(new person(1,'Harry Potter','Male'));
person_list.push(new person(2,'Arya Stark','Female'));
app.get('/person_list',(req,resp)=>{
    resp.setHeader('Context-Type','application/json');
    resp.send(person_list);
});
app.get('/person_list/:id',(req,resp)=>{
    resp.setHeader('Context-Type','application/json');
    const id=JSON.parse(req.params.id);
    const person=person_list.find(b=>b.id===id);
    if (person) {
        resp.send(person);
    }else{
        resp.status.send("Record has not Found");
    }
});
app.put('/person_list/update/:id',(req,resp)=>{
    resp.setHeader('Content-Type','application/json');
    const id=JSON.parse(req.params.id);
    const updatedperson=req.body;
    person_list.forEach(p=>{
        if(p.id==id){
            p.name=updatedperson.name;
            p.gender=updatedperson.gender;
        }
    });
    resp.send("Record has been updated..");
});
app.delete('/person_list/update/delete/:id',(req,resp)=>{
    resp.setHeader('Content-Type','application/json');
    const id=JSON.parse(req.params.id);
    const person=person_list.find(p=>p.id===id);
    if(person){
        person_list.pop();
        resp.send("Record has been Deleted");
    }else{
        resp.send("Record has not found");
    }
});
app.post('/person_list/add',(req,resp)=>{
    resp.setHeader('Content-Type','application/json');
    const person={'id':req.body.id,"name":req.body.name,"gender":req.body.gender};
    if(person){
        person_list.push(person);
        resp.send("Record has been Inserted");
    }else{
        resp.send("OOPS,Something went wrong");
    }
});   

                        //FOR CAR
const cars=[];
cars.push(new car(1,'Mustang',1969,'Black'));
cars.push(new car(2,'Ferrari F40',1987,'Red'));
app.get('/cars',(req,resp)=>{
    resp.setHeader('Context-Type','application/json');
    resp.send(cars);
});
app.get('/cars/:id',(req,resp)=>{
    resp.setHeader('Context-Type','application/json');
    const id=JSON.parse(req.params.id);
    const car=cars.find(b=>b.id===id);
    if (car) {
        resp.send(car);
    }else{
        resp.status.send("Record has not Found");
    }
});
app.put('/cars/update/:id',(req,resp)=>{
    resp.setHeader('Content-Type','application/json');
    const id=JSON.parse(req.params.id);
    const updatedcar=req.body;
    cars.forEach(p=>{
        if(p.id==id){
            p.name=updatedcar.name;
            p.model=updatedcar.model;
            p.color=updatedcar.color;
        }
    });
    resp.send("Record has been updated..");
});
app.delete('/cars/update/delete/:id',(req,resp)=>{
    resp.setHeader('Content-Type','application/json');
    const id=JSON.parse(req.params.id);
    const car=cars.find(p=>p.id===id);
    if(car){
        cars.pop();
        resp.send("Record has been Deleted");
    }else{
        resp.send("Record has not found");
    }
});
app.post('/cars/add',(req,resp)=>{
    resp.setHeader('Content-Type','application/json');
    const car={'id':req.body.id,"name":req.body.name,"model":req.body.model,"color":req.body.color};
    if(car){
        cars.push(car);
        resp.send("Record has been Inserted");
    }else{
        resp.send("OOPS,Something went wrong");
    }
}); 

export default app;