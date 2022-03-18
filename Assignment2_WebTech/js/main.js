$(function () {
    var arr = [];
    var id_tr;
    var checker=0;
    function checkData() {
        var fields = 0;
        if ($('#id').val().length == 0) {
            if(checker===3){alert("Enter ID Number of Car");}
            fields++;
        } else
            if ($('#name').val().length == "") {
                if(checker===3){alert("Enter Name of Car");}
                fields++;
            } else
                if ($('#model').val().length == 0) {
                    if(checker===3){alert("Enter Model Number of Car");}
                    fields++;
                } else
                    if ($('#price').val().length == 0) {
                        if(checker===3){alert("Enter Price of Car");}
                        fields++;
                    } else {
                        return fields;
                    }

    }
    function hideButton() {
        $("#update_btn").css("display", "none");
        $("#delete_btn").css("display", "none");
    }
    function showTable(resp_data) {
        if (resp_data != undefined) {
            var count = 1;
            $("#table tbody").empty();
            arr = [];
            resp_data.forEach(element => {
                getdata(element);
                $('#table tbody').append(`<tr id="row_` + count + `">
                    <td id="id_`+ count + `">` + element.id + `</td>
                    <td id="name_`+ count + `">` + element.name + `</td>
                    <td id="model_`+ count + `">` + element.model + `</td>
                    <td id="price_`+ count + `">` + element.price + `</td>
                    </tr>`);
                count++;
            });
        }
    }
    function getdata(element) {
        const data = {
            "id": parseInt(element.id),
            "name": element.name,
            "model": parseInt(element.model),
            "price": parseInt(element.price)
        };
        arr.push(data);
    }
    function flushData() {
        $("#id").val("");
        $("#name").val("");
        $("#model").val("");
        $("#price").val("");
    }
    $(document.body).on("click", "tr", function () {
        const str1 = this.id.substring(0, 4);
        id_tr = this.id.substring(4, 5);
        const id1 = parseInt(id_tr);
        if(isNaN(id1)){
            flushData();
        }else{
        $("#update_btn").css("display", "inline-block");
        $("#delete_btn").css("display", "inline-block");
        if ("row_" == str1) {
            $("#id").val(arr[id1 - 1].id);
            $("#name").val(arr[id1 - 1].name);
            $("#model").val(arr[id1 - 1].model);
            $("#price").val(arr[id1 - 1].price);
        }}
    });
    $(document.body).on("click", "button", function () {
        const str = this.id.substring(0, 10);
        if ("delete_btn" == str) {
            checker=1;
            let field=checkData();
            if (field!=0) {
                alert("Select the Record which you want to Delete.");
            }else{
                $.ajax({
                    url: '/app/cars/delete/' + parseInt(id_tr),
                    type: 'DELETE',
                    success: function (response) {
                        showTable(response);
                        flushData();
                        hideButton();
                    }
                });
            }
        }
        if ("update_btn" == str) {
            checker=2;
            let field=checkData();
            if (field!=0) {
                alert("Select the Record which you want to Update.");
            }
            else{
            const data = {
                "id": parseInt($("#id").val()),
                "name": $("#name").val(),
                "model": parseInt($("#model").val()),
                "price": parseInt($("#price").val())
            }
            $.ajax({
                url: '/app/cars/update/' + arr[parseInt(id_tr) - 1].id,
                type: 'PUT',
                data: data,
                success: function (response) {
                    showTable(response);
                    flushData();
                    hideButton();
                }
            });
        }
        }
    });
    $("#showRecords").on("click", (req, resp) => {
        $.get("/app/cars", (resp_data, status) => {
            showTable(resp_data);
            if (arr.length == 0) {
                alert("No Records,\nTry To Insert Some.");
            }
        });
    });
    $("#add").on("click", (req, resp) => {
        checker=3;
        let field = checkData();
        if (field != 0) {
        } else {
            const carid = parseInt($("#id").val());
            const carname = $("#name").val();
            const carmodel = parseInt($("#model").val());
            const carprice = parseInt($("#price").val());
            const newRecord = {
                "id": carid,
                "name": carname,
                "model": carmodel,
                "price": carprice
            }
            $.post("/app/cars/add", newRecord, (resp_data, status) => {
                showTable(resp_data);
            });
            flushData();
        }
    });
});