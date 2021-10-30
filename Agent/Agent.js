var database=firebase.database();
var rootagent=database.ref('Agent')
var rootuser=database.ref('User')
var storage = firebase.storage();
var storageRef = storage.ref('');
var AgentId=sessionStorage.getItem('AgentId');

rootagent.child(AgentId).once('value', function(snapshot){
     alert("Welcome "+ snapshot.val().Name)
    });

  database.ref('Agent/'+AgentId+'/Users/').once('value', function(snapshot){
        if(snapshot.exists()){
            var content = '';
            snapshot.forEach(function(data){
                var val = data.val();
                content +='<tr>';
                content += '<td>' + val.Adhar + '</td>';
                content += '<td>' + val.Name + '</td>';
            content += '</tr>';
            });
            $('#orders').append(content);
        }
    });  


function View()
{
    var Adhar=document.getElementById("Adhar").value
    var error =document.getElementById("error")
    error.innerHTML="Complete Fields Properly"
    error.innerHTML=""
    if(Adhar=="")
    {
        error.style.display="block"
        error.innerHTML="Complete Field"
    }
    else{
        rootuser.child(Adhar).once('value', function(snapshot) {
            if(snapshot.val() == null)
            {
                error.style.display="block"
                error.innerHTML="No User exists"
            }
            else if(snapshot.val().Adhar== Adhar)
            {
                rootagent.child(AgentId+'/Users/'+Adhar).once('value',function(snapshot) {
                    if(snapshot.val()== null)
                    {
                        alert('Not added');
                    }
                    else if(snapshot.val().Adhar==Adhar)
                    {
                            sessionStorage.setItem('Adhar',Adhar);
                            window.location='folder.html'
                    }
                });
            }
        });
        document.getElementById("Adhar").value=""
    }
}
function Delete()
{
    var Adhar=document.getElementById("AdharId").value
    var file=document.getElementById("file").value
    var error =document.getElementById("e")
    error.innerHTML="Complete Fields Properly"
    error.innerHTML=""
    if(Adhar=="" || file=="")
    {
        error.style.display="block"
        error.innerHTML="Complete Fields"
    }
    else{
        rootuser.child(Adhar).once('value', function(snapshot) {
            if(snapshot.val() == null)
            {
                error.style.display="block"
                error.innerHTML="No User exists"
            }
            else if(snapshot.val().Adhar== Adhar)
            {
                rootagent.child(AgentId+'/Users/'+Adhar).once('value',function(snapshot) {
                    if(snapshot.val()== null)
                    {
                        alert('Not added');
                        
                    }
                    else if(snapshot.val().Adhar==Adhar)
                    {
                        rootuser.child(Adhar+'/File/'+file).once('value',function(snapshot){
                        if(snapshot.val()==null)
                        {
                            error.style.display="block"
                            error.innerHTML="No File is Present"
                        }
                        else if(snapshot.val().file==file)
                        {
                            rootuser.child(Adhar+'/File/'+file).remove()
                            alert(file+' File removed');
                            location.reload();
                        }
                        });
                    }
                });
            }
        });
        document.getElementById("AdharId").value=""
        document.getElementById("file").value=""
    }
}

function UpdateBranch()
{
var error =document.getElementById("er")
error.innerHTML="Complete Fields Properly"
error.innerHTML=""
    var branch=document.getElementById("currentbranch").value
    var newbranch=document.getElementById("branch").value
    if(branch=="" || newbranch=="") 
    {
        error.style.display="block"
        error.innerHTML="Complete Fields"
    }
    else{
        rootagent.child(AgentId).once('value', function(snapshot){
            if(branch==snapshot.val().Branch)
            {
                rootagent.child(AgentId).update({
                    "Branch" : newbranch
                  });
                alert('Branch Updated Successfully')
                location.reload();
            }
            else{
                alert('Invalid branch');
            }
        });
        document.getElementById("currentbranch").value=""
        document.getElementById("branch").value=""
    }
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
        rootagent.child(AgentId).once('value', function(snapshot){
            if(mobile==snapshot.val().Mobile)
            {
                rootagent.child(AgentId).update({
                    "Mobile" : newmobile
                  });
                alert('Mobile No. Update Successfully')
                location.reload();
            }
            else{
                alert('Invalid Mobile No.');
            }
        });
        document.getElementById("currentmobile").value=""
        document.getElementById("mobile").value=""
    }
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
        rootagent.child(AgentId).once('value', function(snapshot){
            if(pwd==snapshot.val().Password)
            {
                rootagent.child(AgentId).update({
                    "Password" : password
                  });
                alert('Password Update Successfully')
                location.reload();
            }
            else{
                alert('Invalid Password No.');
            }
        });
        document.getElementById("currentpwd").value=""
        document.getElementById("password").value=""
    }
}