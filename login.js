var database=firebase.database();
var error =document.getElementById("error")
error.innerHTML="Complete Fields Properly"
error.innerHTML=""

function login()
{
    error.innerHTML=""
    var Category=document.getElementById("Category").value
    var Password=document.getElementById("Pwd").value
    if(Category=="")
    {
        error.style.display="block"
        error.innerHTML="Select the Category"
    }
    else if(ID=="" || Password=="")
    {
        error.style.display="block"
        error.innerHTML="Complete the fields"
    }
    else if(Category=="Admin")
    {
        var ID=document.getElementById("ID").value
        if(ID=="Admin123")
        { 
            if(Password=="12345")
            {
                    window.location='Admin/Admin.html'
            }
            else{
                error.style.display="block"
                error.innerHTML="User Not Present"
            }
        }
        else{
            error.style.display="block"
            error.innerHTML="Admin ID is wrong"
        }
    }
    else if(Category=="User")
    {
        var Adhar=document.getElementById("ID").value
        sessionStorage.setItem('Adhar',Adhar);
        var rootuser=database.ref('User')
            rootuser.child(Adhar).once('value', function(snapshot) {
            if(snapshot.val() == null)
            {
                error.style.display="block"
                error.innerHTML="User Not Present"
            }       
            else
            {

                rootuser.child(Adhar).once('value', function(snapshot){
                    if(Password==snapshot.val().Password)
                    {
                        alert("Log In Successfull");
                        window.location='User/User.html'
                    }
                    else
                    {
                        error.style.display="block"
                        error.innerHTML="Enter Correct Password"
                    }
                });
            }
        });
    }
    else if(Category=="Agent")
    {
        var AgentId=document.getElementById("ID").value
        sessionStorage.setItem('AgentId',AgentId);
        var rootagent=database.ref('Agent')
            rootagent.child(AgentId).once('value', function(snapshot) {
            if(snapshot.val() == null)
            {
                error.style.display="block"
                error.innerHTML="Agent Not Present"
            }       
            else
            {
                rootagent.child(AgentId).once('value', function(snapshot) {
                    if(Password==snapshot.val().Password)
                    {
                        alert("Log In Successfull");
                        window.location='Agent/Agent.html'
                    }
                    else
                    {
                        error.style.display="block"
                        error.innerHTML="Enter Correct Password"
                    }
                });
            }
        });
    }
    else if(Category=="Lab")
    {
        var LabId=document.getElementById("ID").value
        sessionStorage.setItem('LabId',LabId);
        var rootlab=database.ref('Lab')
            rootlab.child(LabId).once('value', function(snapshot) {
            if(snapshot.val() == null)
            {
                error.style.display="block"
                error.innerHTML="Lab Not Present"
            }       
            else
            {
                rootlab.child(LabId).once('value', function(snapshot) {
                    if(Password==snapshot.val().Password)
                    {
                        alert("Log In Successfull");
                        window.location='Lab/Lab.html'
                    }
                    else
                    {
                        error.style.display="block"
                           error.innerHTML="Enter Correct Password"
                    }
                });
            }
        });
    }
    else if(Category=="Hospital")
    {
        var HospitalId=document.getElementById("ID").value
        sessionStorage.setItem('HospitalId',HospitalId);
        var roothos=database.ref('Hospital')
            roothos.child(HospitalId).once('value', function(snapshot) {
            if(snapshot.val() == null)
            {
                error.style.display="block"
                error.innerHTML="Hospital Not Present"
            }       
            else
            {
                roothos.child(HospitalId).once('value', function(snapshot) {
                    if(Password==snapshot.val().Password)
                    {
                        alert("Log In Successfull");
                        window.location='Hospital/Hospital.html'
                    }
                    else
                    {
                        error.style.display="block"
                        error.innerHTML="Enter Correct Password"
                    }
                });
            }
        });
    }
    else if(Category=="Medical")
    {
        var MedicalId=document.getElementById("ID").value
        sessionStorage.setItem('MedicalId',MedicalId);
        var rootmed=database.ref('Medical')
            rootmed.child(MedicalId).once('value', function(snapshot) {
            if(snapshot.val() == null)
            {
                error.style.display="block"
                error.innerHTML="Medical Not Present"
            }       
            else
            {
                rootmed.child(MedicalId).once('value', function(snapshot) {
                    if(Password==snapshot.val().Password)
                    {
                        alert("Log In Successfull");
                        window.location='Medical/Medical.html'
                    }
                    else
                    {
                        error.style.display="block"
                        error.innerHTML="Enter Correct Password"
                    }
                });
            }
        });
    }
    else{
        error.style.display="block"
        error.innerHTML="Select Proper Category"
    }
    document.getElementById("Category").value="One";
    document.getElementById("ID").value="";
    document.getElementById("Password").value="";
}

