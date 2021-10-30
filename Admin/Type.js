function Type()
{
    var Category=document.getElementById("Category").value
    if(Category=="User")
    {
        window.location='Userdata.html'
    }
    else if(Category=="Agent")
    {
        window.location='Agentdata.html'
    }
    else if(Category=="Lab")
    {
        window.location='Labdata.html'
    }
    else if(Category=="Hospital")
    {
        window.location='Hospitaldata.html'
    }
    else if(Category=="Medical")
    {
        window.location='Medicaldata.html'
    }
    else if(Category=="")
    {
        error.style.display="block"
        error.innerHTML="Please Select the Category"
    }
}
