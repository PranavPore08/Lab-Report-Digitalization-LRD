var database=firebase.database();
var error =document.getElementById("error")
error.innerHTML="Complete Fields Properly"
error.innerHTML=""

function User(){
    var Gen= document.getElementsByName("Gender");
    var Gender;
    var p=0,b=0;
    for(i=0;i<Gen.length;i++)
    {
        if(Gen[i].checked)
        {
            Gender=Gen[i].value;
            p=1;
        }
    }
    var Blood = document.getElementById("Blood").value;
    
    var Name= document.getElementById("Name").value
    var Dob= document.getElementById("Dob").value
    console.log(Blood);
    var Age= document.getElementById("Age").value
    var Adhar= document.getElementById("Adhar").value
    var Mobile =document.getElementById("Mobile").value
    var ID=document.getElementById("Id").value
    var AgentId=document.getElementById("AgentId").value
    var Email=document.getElementById("Email").value
    var Address=document.getElementById("Address").value
    var Password=document.getElementById("Pwd").value
    var ConfPwd=document.getElementById("ConfPwd").value
    var rootuser=database.ref('User')
    var rootagent=database.ref('Agent')
        if(Name=="" || Gen==null || Adhar=="" || Blood=="" || Mobile=="" || ID=="" || AgentId=="" || Address=="" || Email=="" || Password=="" || Dob==null || p==0)
        {
            error.style.display="block"
            error.innerHTML="Complete Fields Properly"
        }
        else if(Password != ConfPwd) {
            error.innerHTML="Passwords Doesn't Match"
        }
        else if(Password == ConfPwd)
        {
            rootagent.child(AgentId).once('value', function(snapshot) {
                if(snapshot.val() == null)
                {
                  alert('No Agent exists');
                }
                else{
                rootuser.child(Adhar).once('value', function(snapshot) {
                    if(snapshot.val() !== null)
                    {
                    alert('Adhar no. Already exists');
                    }       
                    else
                    {
                        database.ref('User/' + Adhar).set({
                            Name,Dob,Age,Gender,Blood,Adhar,Mobile,ID,AgentId,Address,Email,Password
                        });
                        database.ref('Agent/'+AgentId+'/Users/'+Adhar).set({
                                Adhar,Name
                        });
                        database.ref('Admin/'+Adhar).set({
                            Adhar,Name
                        });
                        alert("Sign Up Successfull...");
                        window.location.href="../index.html" 
                    }
                });
                }
            });
    document.getElementById("Blood").value=""
    document.getElementById("Name").value=""
    document.getElementById("Dob").value=""
     document.getElementById("Age").value=""
    document.getElementById("Adhar").value=""
    document.getElementById("Mobile").value=""
    document.getElementById("Id").value=""
    document.getElementById("AgentId").value=""
    document.getElementById("Email").value=""
    document.getElementById("Address").value=""
    document.getElementById("Pwd").value=""
    document.getElementById("ConfPwd").value=""
       }
}

function displayDate(){
    var y = new Date(document.getElementById('Dob').value).getFullYear();
    var cy = new Date().getFullYear();
    var result = cy-y;
    document.getElementById("Age").innerHTML = result;
}

function Agent()
{
    var Name= document.getElementById("Name").value
    var Dob= document.getElementById("Dob").value
    var Age= document.getElementById("Age").value
    var Adhar= document.getElementById("Adhar").value
    var Mobile =document.getElementById("Mobile").value
    var Branch =document.getElementById("Branch").value
    var AgentId=document.getElementById("AgentId").value
    var Email=document.getElementById("Email").value
    var Address=document.getElementById("Address").value
    var Password=document.getElementById("Pwd").value
    var ConfPwd=document.getElementById("ConfPwd").value
    var rootagent=database.ref('Agent')
        if(Name=="" || Dob==null || Adhar=="" || Branch=="" || Mobile=="" || AgentId=="" || Address=="" || Email=="" || Password=="")
            {
            error.style.display="block"
            error.innerHTML="Complete Fields Properly"
            }

        else if(Password != ConfPwd) {
            error.innerHTML="Passwords Doesn't Match"
        }
        else if(Password == ConfPwd)
        {
                    rootagent.child(AgentId).once('value', function(snapshot) {
                    if(snapshot.val() !== null)
                    {
                        alert('Id Already exists');
                    }
                    else{
                        database.ref('Agent/' + AgentId).set({
                        Name,Dob,Age,Adhar,Branch,AgentId,Mobile,Address,Email,Password
                    });
                    alert("Sign Up Successfull...");
                    window.location.href="../index.html" 
                }
                    });
    document.getElementById("Name").value=""
    document.getElementById("Dob").value=""
    document.getElementById("Age").value=""
    document.getElementById("Adhar").value=""
    document.getElementById("Mobile").value=""
    document.getElementById("Branch").value=""
    document.getElementById("AgentId").value=""
    document.getElementById("Email").value=""
    document.getElementById("Address").value=""
    document.getElementById("Pwd").value=""
    document.getElementById("ConfPwd").value=""
        }
              
}

function logout(){
    window.location.href="Type.html"
}

function Hospital()
{
    var Name= document.getElementById("Name").value
    var HospitalId= document.getElementById("Hosid").value
    var Mobile= document.getElementById("Mobile").value
    var Email=document.getElementById("Email").value
   var Address=document.getElementById("Address").value
    var Password=document.getElementById("Pwd").value
    var ConfPwd=document.getElementById("ConfPwd").value
    var roothos=database.ref('Hospital')
        if(Name=="" || HospitalId=="" || Mobile=="" || Address=="" || Email=="" || Password=="")
        {

            error.style.display="block"
            error.innerHTML="Complete Fields Properly"
        }
        else if(Password != ConfPwd) {
            error.innerHTML="Passwords Doesn't Match"
        }
        else if(Password == ConfPwd)
        {
            roothos.child(HospitalId).once('value', function(snapshot) {
            if(snapshot.val() !== null)
            {
                  alert('ID already exists');
            }
           else{
                database.ref('Hospital/' + HospitalId).set({
                    Name,HospitalId,Mobile,Address,Email,Password
                });
                alert("Sign Up successful...");
                window.location.href="../index.html" 
            }
        });
        document.getElementById("Name").value=""
        document.getElementById("Hosid").value=""
        document.getElementById("Mobile").value=""
        document.getElementById("Email").value=""
        document.getElementById("Address").value=""
        document.getElementById("Pwd").value=""
        document.getElementById("ConfPwd").value=""
        }

}

function Lab()
{
    var Name= document.getElementById("Name").value
    var LabId= document.getElementById("Labid").value
    var Mobile= document.getElementById("Mobile").value
    var Email=document.getElementById("Email").value
    var Address=document.getElementById("Address").value
    var Password=document.getElementById("Pwd").value
    var ConfPwd=document.getElementById("ConfPwd").value
    var rootlab=database.ref('Lab')
        if(Name=="" || LabId=="" || Mobile=="" || Address=="" || Email=="" || Password=="")
        {
            error.style.display="block"
            error.innerHTML="Complete Fields Properly"
        }
        else if(Password != ConfPwd) {
            error.innerHTML="Passwords Doesn't Match"
        }
        else if(Password == ConfPwd)
        {
            rootlab.child(LabId).once('value', function(snapshot) {
                if(snapshot.val() !== null)
                {
                  alert('Id already exists');
                }
                else{
                        database.ref('Lab/' + LabId).set({
                            Name,LabId,Mobile,Address,Email,Password
                        });        
                        alert("Sign Up successful...");
                        window.location.href="../index.html" 
                    }
                });
                document.getElementById("Name").value=""
                document.getElementById("Labid").value=""
                document.getElementById("Mobile").value=""
                document.getElementById("Email").value=""
                document.getElementById("Address").value=""
                document.getElementById("Pwd").value=""
                document.getElementById("ConfPwd").value=""
        }
}

function Medical()
{
    var Name= document.getElementById("Name").value
    var MedicalId= document.getElementById("Medid").value
    var Mobile= document.getElementById("Mobile").value
    var Email=document.getElementById("Email").value
    var Address=document.getElementById("Address").value
    var Password=document.getElementById("Pwd").value
    var ConfPwd=document.getElementById("ConfPwd").value
    var rootmed=database.ref('Medical')
        if(Name=="" || MedicalId=="" || Mobile=="" || Address=="" || Email=="" || Password=="")
        {
            error.style.display="block"
            error.innerHTML="Complete Fields Properly"
        }
        else if(Password != ConfPwd) {
            error.innerHTML="Passwords Don't Match"
        }
        else if(Password == ConfPwd)
        {
            rootmed.child(MedicalId).once('value', function(snapshot) {
                if(snapshot.val() !== null)
                {
                  alert('Id already exists');
                }
                else{
             database.ref('Medical/' + MedicalId).set({
                    Name,MedicalId,Mobile,Address,Email,Password
                });
                alert("Sign Up successful...");
                window.location.href="../index.html" 
            }
        });
                document.getElementById("Name").value=""
                document.getElementById("Medid").value=""
                document.getElementById("Mobile").value=""
                document.getElementById("Email").value=""
                document.getElementById("Address").value=""
                document.getElementById("Pwd").value=""
                document.getElementById("ConfPwd").value=""
        }
}

function Type()
{
    var Category=document.getElementById("Category").value
    if(Category=="User")
    {
        window.location='User.html'
    }
    else if(Category=="Agent")
    {
        window.location='Agent.html'
    }
    else if(Category=="Lab")
    {
        window.location='Lab.html'
    }
    else if(Category=="Hospital")
    {
        window.location='Hospital.html'
    }
    else if(Category=="Medical")
    {
        window.location='Medical.html'
    }
    else if(Category=="")
    {
        error.style.display="block"
        error.innerHTML="Please Select the Category"
    }
}