//Load Data into Table on customer index
$(document).ready(function () {
    loadData();
});

//Load Data into Table on Store index
function loadData() {
    $.ajax({
        url: "/Store/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                //html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.Name + '</td>';
                html += '<td>' + item.Address + '</td>';
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

//Get the Data Based upon Store Id
function getbyID(CusId) {
    $('#StoreName').css('border-color', 'lightgrey');
    //$('#Age').css('border-color', 'lightgrey');
    $('#Address').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Store/getbyID/" + CusId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#IdEdit').val(result.Id);
            $('#StoreNameEdit').val(result.Name);
            //$('#Age').val(result.Age);
            $('#AddressEdit').val(result.Address);

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


//Delete Store's record
function Delete(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Store/RemoveStore/" + ID,
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


//Add Data 
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var cusObj = {
        //Id: $('#Id').val(),
        Name: $('#StoreName').val(),
        Address: $('#Address').val()
    };
    $.ajax({
        url: "/Store/Add",
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
    if ($('#StoreName').val().trim() == "") {
        $('#StoreName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#StoreName').css('border-color', 'lightgrey');
    }

    if ($('#Address').val().trim() == "") {
        $('#Address').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Address').css('border-color', 'lightgrey');
    }
    return isValid;
}


//Update Store's record
function Update() {
    var res = validateUpdate();
    if (res == false) {
        return false;
    }
    var cusObj = {
        Id: $('#IdEdit').val(),
        Name: $('#StoreNameEdit').val(),
        //Age: $('#Age').val(),
        Address: $('#AddressEdit').val(),

    };
    $.ajax({
        url: "/Store/Update",
        data: JSON.stringify(cusObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModalEdit').modal('hide');
            $('#IdEdit').val("");
            $('#StoreNameEdit').val("");
            //$('#Age').val("");
            $('#AddressEdit').val("");

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Valdidation for updating using jquery
function validateUpdate() {
    var isValid = true;
    if ($('#StoreNameEdit').val().trim() == "") {
        $('#StoreNameEdit').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#StoreNameEdit').css('border-color', 'lightgrey');
    }

    if ($('#AddressEdit').val().trim() == "") {
        $('#AddressEdit').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#AddressEdit').css('border-color', 'lightgrey');
    }
    return isValid;
}