// Userlist data array for filling in info box

var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

  // Populate the user table on initial page load
  populateTable();

});

// Functions =============================================================

// Fill table with data
function populateTable() {

  // Empty content string
  var tableContent = '';

  // jQuery AJAX call for JSON
  $.getJSON( '/users/userlist', function( data ) {

    // For each item in our JSON, add a table row and cells to the content string
    tableContent += '<td>';
    tableContent += '<select id='+"user"+'>';
   $.each(data, function(){
     
      tableContent += '<option>' + this.user + '</option>';
    });
    tableContent += '</select></td>'

    // Inject the whole content string into our existing HTML table
    $('#userList').append(tableContent);


  });

  $.getJSON( '/products/', function( data ) {

    // For each item in our JSON, add a table row and cells to the content string
    tableContent=''
    tableContent += '<td>';
    tableContent += '<select id='+"product"+'>';
   $.each(data, function(){
     
      tableContent += '<option>' + this.product + '</option>';
    });
    tableContent += '</select></td>'

    // Inject the whole content string into our existing HTML table
    $('#productList').append(tableContent);
  });

};
function addOrder() {
  if ($('#quant').val()==0) {
    alert("Please enter atleast one quantity");
  }
  if($("#add").text()=="Edit") {
    editOrders();
  }
  else {
    if ($('#quant').val()!=0) {
    $.post( "/orders/add/", { user: $('#user').val(), product: $('#product').val(),quantity: $('#quant').val() })
  .done(function( data ) {
   
  });
}
}
refreshPage();
};

function search() {

    $.getJSON( '/orders/search/',{searchText:$('#searchText').val(),timeperiod:$('#time').val()}, function( data ) {
      tableContent='';

        // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function(){
        tableContent += '<tr>';
        tableContent += '<td>' + this.user + '</td>';
        tableContent += '<td>' + this.product + '</td>';
        tableContent += '<td>' + this.price + '</td>';
        tableContent += '<td>' + this.quantity + '</td>';
        tableContent += '<td>' + this.total + '</td>';
        tableContent += '<td>' + this.date + '</td>';
        tableContent += '<td><a href="#"  onclick=editOrder("'+encodeURIComponent(this.user)+'","'+encodeURIComponent(this.product)+'","'+encodeURIComponent(this.quantity)+'","'+this._id+'") class="linkdeleteuser" rel="' + this._id + '">edit</a></td>';
        tableContent += '<td><a href="#" onclick=deleteOrder("'+this._id+'")  class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
        tableContent += '</tr>';
      });
  
      // Inject the whole content string into our existing HTML table
      $('#orders table tbody').html(tableContent);
    });
    
    };

    function deleteOrder(id){
      $.ajax({  
        url: '/orders/delete',  
        type: 'DELETE',  
        dataType: 'json',  
        data:{"orderid":id},  
        success: function (data, textStatus, xhr) {  
            console.log(data);  
            refreshPage();
        },  
        error: function (xhr, textStatus, errorThrown) {  
            console.log(errorThrown,'Error in Deletion');  
        }  
    }); 
  }

    function editOrder(user,product,quantity,id){
      console.log(user)
      $("#user").val(user.replace("%20"," "))
      $("#product").val(product.replace("%20"," "));
      $("#quant").val(quantity.replace("%20"," "));
      $("#add").text("Edit");
      $("#add").val(id);

    }

    function editOrders() {
      $.ajax({  
        url: '/orders/edit',  
        type: 'PUT',  
        dataType: 'json',  
        data:{user:$('#user').val(),product:$('#product').val(),quantity:$('#quant').val(),"orderid":$('#add').val()},  
        success: function (data, textStatus, xhr) {  
            console.log(data);
            refreshPage(); 
        },  
        error: function (xhr, textStatus, errorThrown) {  
            console.log(errorThrown,'Error in Editing');  
        }  
    }); 
  };  

  function refreshPage() {
    location.reload(true);
}