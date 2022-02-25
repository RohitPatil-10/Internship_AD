                //For Local Storage
$(function(){
    const products=[{"pid":"1","pname":"pepsi 500ml","price":"50"},
    {"pid":"2","pname":"Sting 500ml","price":"50"},
    {"pid":"3","pname":"Mazza 500ml","price":"50"},
    {"pid":"4","pname":"CocaCola 500ml","price":"50"},
    {"pid":"5","pname":"Fizzz 500ml","price":"50"}];
    $("#addlocal").on('click',()=>{
    
        const product={
            "pid":$("#pid").val(),
            "pname":$("#pname").val(),
            "price":$("#price").val()
        };
        products.push(product);
        if(typeof(Storage)!==undefined){
            localStorage.setItem("products",JSON.stringify(products));
            console.log("Data is loaded to localstorage..");
        }
    })
})
$("#getProductslocal").on('click',function(){
    $("#showLocalRecords").empty();
    if(typeof(Storage)!==undefined){
        const product_list=JSON.parse(localStorage.getItem('products'));
        product_list.forEach(element => {
        const li=$("<li></li>").text(element.pname);
        $("#showLocalRecords").append(li);
        });
        
    }else{
        alert("products");
    }
});

                //For Session Storage
$(function(){
    const products=[{"pid":"1","pname":"pepsi 500ml","price":"50"},
    {"pid":"2","pname":"Sting 500ml","price":"50"},
    {"pid":"3","pname":"Mazza 500ml","price":"50"},
    {"pid":"4","pname":"CocaCola 500ml","price":"50"},
    {"pid":"5","pname":"Fizzz 500ml","price":"50"}];
    $("#addsession").on('click',()=>{
    
        const product={
            "pid":$("#pid").val(),
            "pname":$("#pname").val(),
            "price":$("#price").val()
        };
        products.push(product);
        if(typeof(Storage)!==undefined){
            sessionStorage.setItem("products",JSON.stringify(products));
            console.log("Data is loaded to Session Storage..");
        }
    })
})
$("#getProductssession").on('click',function(){
    $("#showSessionRecords").empty();
    if(typeof(Storage)!==undefined){
        const product_list=JSON.parse(sessionStorage.getItem('products'));
        product_list.forEach(element => {
        const li=$("<li></li>").text(element.pname);
        $("#showSessionRecords").append(li);
        });
        
    }else{
        alert("products");
    }
});