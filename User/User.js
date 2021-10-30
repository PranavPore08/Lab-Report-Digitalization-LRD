var database=firebase.database();
var rootuser=database.ref('User')
var Adhar=sessionStorage.getItem('Adhar');

database.ref('User/'+Adhar+'/Hospital').once('value', function(snapshot){
    if(snapshot.exists()){
        var content = '';
        snapshot.forEach(function(data){
            var val = data.val();
            content +='<tr>';
            content += '<td>' + val.HosName + '</td>';
            content += '</tr>';
        });
        $('#hos').append(content);
    }
});  

database.ref('User/'+Adhar+'/Lab').once('value', function(snapshot){
    if(snapshot.exists()){
        var content = '';
        snapshot.forEach(function(data){
            var val = data.val();
            content +='<tr>';
            content += '<td>' + val.LabName + '</td>';
            content += '</tr>';
        });
        $('#lab').append(content);
    }
});  

database.ref('User/'+Adhar+'/Medical').once('value', function(snapshot){
    if(snapshot.exists()){
        var content = '';
        snapshot.forEach(function(data){
            var val = data.val();
            content +='<tr>';
            content += '<td>' + val.MedName + '</td>';
            content += '</tr>';
        });
        $('#med').append(content);
    }
});  

rootuser.child(Adhar).once('value', function(snapshot){
     alert("Welcome "+ snapshot.val().Name);
});

var storage = firebase.storage();
var storageRef = storage.ref('');

database.ref('User/'+Adhar+'/File/').once('value', function(snapshot){
        if(snapshot.exists()){
            var contents = '';
            snapshot.forEach(function(data){
                var val = data.val();
                contents +='<ul>';
                contents += '<li>' + val.file + '</li>';
                contents += '</ul>';
            });
            $('#orders').append(contents);
        }
});  

function Myfilediv()
{
document.getElementById('Myfile').style.display="initial";
document.getElementById('View').style.display="none";
document.getElementById('Create').style.display="none";
document.getElementById('Change').style.display="none";
document.getElementById('UpdateMobile').style.display="none";
document.getElementById('UpdatePassword').style.display="none";
}

function View()
{
    var file=document.getElementById("filename").value
    var error =document.getElementById("error")
    error.innerHTML="Complete Fields Properly"
    error.innerHTML=""
    if(file=="")
    {
        error.style.display="block"
        error.innerHTML="Complete Fields"
    }
    else{
            rootuser.child(Adhar+'/File/'+file).once('value',function(snapshot){
            if(snapshot.val()==null)
            {
                error.style.display="block"
                error.innerHTML="No File is Present"
            }
            else if(snapshot.val().file==file)
            {
                            sessionStorage.setItem('Adhar',Adhar);
                            sessionStorage.setItem('File',file);
                            window.location='file.html'
            }
        });
        document.getElementById("filename").value=""
    }
}


function Create()
{
    var error =document.getElementById("e")
    error.innerHTML="Complete Fields Properly"
    error.innerHTML=""

     var file=document.getElementById("file").value
     if(file=="")
     {
        error.style.display="block"
        error.innerHTML="Enter the filename"
     }
     else
     {
        var Name;
        database.ref('User/'+Adhar).once('value', function(snapshot){     
         Name=snapshot.val().Name;
        });            
        rootuser.child(Adhar+'/File').once('value', function(snapshot){
                if(file==snapshot.val())
                {
                 alert("Already Present");
                }
            else{
                database.ref('User/'+Adhar+'/File/'+file).set({
                    "file": file
                });
                database.ref('Admin/'+Adhar+'/File/'+file).set({
                    "file": file
                });
                
                alert('Created');
                location.reload();
                }
        });
     }
     document.getElementById("file").value="";
}

function Change()
{
    var error =document.getElementById("er")
    error.innerHTML="Complete Fields Properly"
    error.innerHTML=""

    var newAgentId=document.getElementById('newAgentId').value
    if(newAgentId=="")
    {
        error.style.display="block"
        error.innerHTML="Complete the fields"
    }
    else{
            var rootagent=database.ref('Agent')
                rootagent.child(newAgentId).once('value',function(snapshot){
                    if(snapshot.val()==null)
                    {
                        alert(" Agent not Present");
                    }
                    else if(snapshot.val().AgentId==newAgentId)
                    {
                           rootuser.child(Adhar).once('value', function(snapshot){
                           var Agent=snapshot.val().AgentId;
                           if(Agent!=newAgentId)
                           {
                           var adaRef = database.ref('Agent/'+Agent+'/Users/'+Adhar);
                            adaRef.remove();

                            rootuser.child(Adhar).update({
                                "AgentId" : newAgentId
                              });

                              database.ref('Agent/'+newAgentId+'/Users/'+Adhar).set({
                                Adhar
                             });
                             alert('Agent Change Successfully')
                             location.reload();
                          }
                          else{
                            alert('Agent is Same')
                           }
                        });
                    }
                });
        }
        document.getElementById('newAgentId').value=""; 
}

function ChangeNo()
{
    var error =document.getElementById("errror")
    error.innerHTML="Complete Fields Properly"
    error.innerHTML=""
    var newId=document.getElementById('Id').value
    if(newId=="")
    {
        error.style.display="block"
        error.innerHTML="Complete the fields"
    }
    else{
        rootuser.child(Adhar).update({
            "ID" : newId
          });
          alert('Update Successfully')
          location.reload();
    }
    document.getElementById('Id').value="";
}

function UpdateMobile()
{
    var error =document.getElementById("err")
    error.innerHTML="Complete Fields Properly"
    error.innerHTML=""

    var mobile=document.getElementById("currentmobile").value
    var newmobile=document.getElementById("mobile").value
    if(mobile=="" || newmobile=="") 
    {
        error.style.display="block"
        error.innerHTML="Complete Fields"
    }
    else{
        rootuser.child(Adhar).once('value', function(snapshot){
            if(mobile==snapshot.val().Mobile)
            {
                rootuser.child(Adhar).update({
                    "Mobile" : newmobile
                  });
                alert('Mobile No. Update Successfully');
                location.reload();
            }
            else{
                alert('Invalid Mobile No.');
            }
        });
    }
    document.getElementById("currentmobile").value=""
    document.getElementById("mobile").value=""
}

function UpdatePassword()
{
    var error =document.getElementById("erro")
    error.innerHTML="Complete Fields Properly"
    error.innerHTML=""

    var pwd=document.getElementById("currentpwd").value
    var password=document.getElementById("password").value
    if(pwd=="" || password=="") 
    {
        error.style.display="block"
        error.innerHTML="Complete Fields"
    }
    else{
        rootuser.child(Adhar).once('value', function(snapshot){
            if(pwd==snapshot.val().Password)
            {
                rootuser.child(Adhar).update({
                    "Password" : password
                  });
                alert('Password Update Successfully');
                location.reload();
            }
            else{
                alert('Invalid Password No.');
            }
        });
    }
    document.getElementById("currentpwd").value=""
    document.getElementById("password").value=""
}
