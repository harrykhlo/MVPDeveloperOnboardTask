//Load Data into Table on Product index
$(document).ready(function () {
    loadData();
});

//Load Data into Table on Product index
function loadData() {
    $.ajax({
        url: "/Product/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                //html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.Name + '</td>';
                html += '<td>' + item.Price + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.Id + ')"<button type="button" class="btn btn-warning" > <span class = "glyphicon glyphicon-edit"></span></td>';
                html += '<td><a href="#" onclick="Delete(' + item.Id + ')"<button type="button" class="btn btn-danger" > <span class = "glyphicon glyphicon-trash"></span></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Get the Data Based upon Product Id
function getbyID(CusId) {
    $('#ProductName').css('border-color', 'lightgrey'); 
    $('#Price').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Product/getbyID/" + CusId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#IdEdit').val(result.Id);
            $('#ProductNameEdit').val(result.Name);
            $('#PriceEdit').val(result.Price);

            $('#myModalEdit').modal('show');
            //$('#btnUpdate').show();
            //$('#btnAdd').show();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//Valdidation for updating using jquery
function validateUpdate() {
    var isValid = true;
    if ($('#ProductNameEdit').val().trim() == "") {
        $('#ProductNameEdit').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ProductNameEdit').css('border-color', 'lightgrey');
    }

    if ($('#PriceEdit').val().trim() == "") {
        $('#PriceEdit').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#PriceEdit').css('border-color', 'lightgrey');
    }
    return isValid;
}

//Update Product's record
function Update() {
    var res = validateUpdate();
    if (res == false) {
        return false;
    }
    var cusObj = {
        Id: $('#IdEdit').val(),
        Name: $('#ProductNameEdit').val(),
        Price: $('#PriceEdit').val(),

    };
    $.ajax({
        url: "/Product/Update",
        data: JSON.stringify(cusObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModalEdit').modal('hide');
            $('#IdEdit').val("");
            $('#ProductNameEdit').val("");
            $('#PriceEdit').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


//Add Data 
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var cusObj = {
        //Id: $('#Id').val(),
        Name: $('#ProductName').val(),
        Price: $('#Price').val()
    };
    $.ajax({
        url: "/Product/Add",
        data: JSON.stringify(cusObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModalCreate').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#ProductName').val().trim() == "") {
        $('#ProductName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ProductName').css('border-color', 'lightgrey');
    }

    if ($('#Price').val().trim() == "") {
        $('#Price').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Price').css('border-color', 'lightgrey');
    }
    return isValid;
}

//Delete Product's record
function Delete(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Product/RemoveProduct/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}