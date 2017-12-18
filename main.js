// Variables
var contactList = [];
var counter = 1;
var currentCount = 0;

//Reset Add form
function resetForm(){
document.getElementById("addForm").reset();
}
// Close Edit Modal
function closeModal(){
$('#modalEdit').modal('hide');
postNodeContact();
fetchList();
}

// Counter Function
function addCounter(){
  counter += 1;
}
// Fetch the array
function fetchList(){
  console.log("fetch list called");
  console.log(contactList)
  $("#contactTbody").empty();
  for( i = 0; i < contactList.length; i++){
  currentCount = i + 1;
  $("#contactTbody").append('<tr><td>'+ currentCount +'</td><td>' + contactList[i].name + '</td><td>'+contactList[i].email+'</td><td> '+ contactList[i].phone +'</td><td><button type="button" id="editBtn" onclick="editContact('+i+')" class="btn btn-info">Edit</button><button type="button" onclick="removeContact('+i+')" class="btn btn-danger">Delete</button></td></tr>');
  addCounter();
  }
}
// Remove Contact
function removeContact(i){
console.log(i)
removeSelected = i;
contactList.splice(removeSelected,1)
postNodeContact();
fetchList();
};




//Edit contact submit button
function editContactSubmit(i){
  var nameEditSubmit = $('#inputNameEdit').val();
  var emailEditSubmit = $('#inputEmailEdit').val();
  var phoneEditSubmit = $('#inputPhoneEdit').val();
  contactList[i] = {name: nameEditSubmit, email: emailEditSubmit, phone: phoneEditSubmit};
  closeModal();
}

//Edit contact button
function editContact(i){
  $(".modal-edit").empty();
  var nameEdit = contactList[i].name;
  var emailEdit = contactList[i].email;
  var phoneEdit = contactList[i].phone;
  console.log(nameEdit);
  console.log(emailEdit);
  console.log(phoneEdit);
  $(".modal-edit").append('<label for="inputName">Name</label><input type="text" class="form-control" id="inputNameEdit" value="'+nameEdit+'" placeholder="Name"><label for="inputEmail">Email</label><input type="email" class="form-control" id="inputEmailEdit" value="'+emailEdit+'" placeholder="Email"><label for="inputPhone">Phone Number</label><input type="tel" class="form-control" id="inputPhoneEdit" value="'+phoneEdit+'" placeholder="Phone Number"><br><button type="submit" onclick="editContactSubmit('+i+')" class="btn btn-info">Edit</button>')
    $('#modalEdit').modal({show:true});
};



// Node.JS Contact Fetch
function getNodeContact() {
  $.get( "/test", function( data ) {
    console.log(data);
  contactList = data;
  console.log(contactList);
  fetchList();
})};

function postNodeContact() {
  $.ajax({
      type: 'POST',
      // make sure you respect the same origin policy with this url:
      // http://en.wikipedia.org/wiki/Same_origin_policy
      url: '/test',
      data: {
        "contactList" : contactList
            },
      // success: function(msg){
      //     alert('wow' + msg);
      // }
  });
}




// Button Functions On Click
$('#submitBtn').on('click',function(e){
  e.preventDefault();
  var name = $('#inputName').val();
  var email = $('#inputEmail').val();
  var phone = $('#inputPhone').val();
  if (name.length, email.length, phone.length <= 0){
    alert('Please fill out all inputs.')
  } else {
    contactList.push({name: name, email: email, phone: phone});
    $("#contactTbody").empty();
    $('#myModal').modal('hide')
    postNodeContact()
    fetchList();
  }

});



$('.openBtn').on('click',function(){
  document.getElementById("inputName").value = name;
  document.getElementById("inputEmail").value = name;
  document.getElementById("inputPhone").value = name;
    $('.modal-body').load('content.html',function(){
        $('#myModal').modal({show:true});
    });
});



// $("body").on("click",".btn-info",function(){
//   $('.modal-edit').load('content.html',function(){
//       $('#modalEdit').modal({show:true});
//   });
// });

$( document ).ready(function() {
getNodeContact();

});
