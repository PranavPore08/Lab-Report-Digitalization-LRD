var database=firebase.database();
var roothospital=database.ref('Hospital')
var rootuser=database.ref('User')
var HospitalId=sessionStorage.getItem('HospitalId');
var storage = firebase.storage();
var storageRef = storage.ref('');
roothospital.child(HospitalId).once('value', function(snapshot){
     alert("Welcome "+ snapshot.val().Name);
    });


function Add()
{
    var error =document.getElementById("e")
    error.innerHTML="Complete Fields Properly"
    error.innerHTML=""

    var Adhar=document.getElementById("Adhar").value
    if(Adhar=="")
    {
        error.style.display="block"
        error.innerHTML="Complete Fields"
    }
    else{
        var HosName="";
                        database.ref('Hospital/'+HospitalId).once('value', function(snapshot){     
                            HosName=snapshot.val().Name;
                        });     
        var Name;
                database.ref('User/'+Adhar).once('value', function(snapshot){     
                 Name=snapshot.val().Name;
                });            
        var rootuser=database.ref('User')
        rootuser.child(Adhar).once('value', function(snapshot) {
            if(snapshot.val() == null)
            {
              alert('No User exists');
            }
            else{
                roothospital.child(HospitalId+'/Users/'+Adhar).once('value',function(snapshot) {
                    if(snapshot.val()== null)
                    {
                        database.ref('Hospital/'+HospitalId+'/Users/'+Adhar).set({
                            Adhar,Name
                        });
                        database.ref('User/'+Adhar+'/Hospital/'+HospitalId).set({
                            HospitalId,HosName
                        });
                        alert('Added');    
                        location.reload();  
                    }
                    else if(snapshot.val().Adhar == Adhar)
                    {
                        alert('Already exists');
                    }
                    else{
                        database.ref('Hospital/'+HospitalId+'/Users/'+Adhar).set({
                            Adhar,Name
                        });
                        database.ref('User/'+Adhar+'/Hospital/'+HospitalId).set({
                            HospitalId,HosName
                        });
                        alert('Added');   
                        location.reload();   
                    }
                });
            }    
            
        });
    }
    document.getElementById("Adhar").value="";
}

function Remove()
{
    var error =document.getElementById("er")
    error.innerHTML="Complete Fields Properly"
    error.innerHTML=""

    var Adhar=document.getElementById("Addhar").value
    if(Adhar=="")
    {
        error.style.display="block"
        error.innerHTML="Complete Fields"
    }
    else{
        var rootuser=database.ref('User')
        rootuser.child(Adhar).once('value', function(snapshot) {
            if(snapshot.val() == null)
            {
              alert('No User exists');
            }
            else{
                roothospital.child(HospitalId+'/Users/'+Adhar).once('value',function(snapshot) {
                    if(snapshot.val()== null)
                    {
                        alert('Not Added');
                    }
                    else if(snapshot.val().Adhar== Adhar)
                    {
                        database.ref('Hospital/'+HospitalId+'/Users/'+Adhar).remove();
                        database.ref('User/'+Adhar+'/Hospital/'+HospitalId).remove();
                        alert('Removed'); 
                        location.reload();     
                    }
                });
            }    
            
        });
    }
    document.getElementById("Addhar").value="";
}

function next()
{var i=0,o=0 ;
    var Adhar=document.getElementById("AdharId").value
    var file=document.getElementById("file").value
    var error =document.getElementById("err")
    error.innerHTML="Complete Fields Properly"
    error.innerHTML=""
    if(Adhar=="" || file=="")
    {
        error.style.display="block"
        error.innerHTML="Complete Fields"
    }
    else{
        roothospital.child(HospitalId+'/Users/'+Adhar).once('value',function(snapshot) {
            if(snapshot.val()== null)
            {
                error.style.display="block"
                error.innerHTML="Not added in Hospital"
            }
            else if(snapshot.val().Adhar== Adhar)
            {
                rootuser.child(Adhar+'/File/'+file).once('value',function(snapshot){
                    if(snapshot.val()==null)
                    {
                        error.style.display="block"
                        error.innerHTML="No File is Present"
                    }
                    else if(snapshot.val().file==file)
                    {
                        document.getElementById('one').style.display="none";
                        document.getElementById("zero").style.display="initial";
                        storageRef.child(Adhar+'/'+file+'/Lab/').listAll().then(function(result){
                        result.items.forEach(function(pdfRef){
                        i++;
                        pdfRef.getDownloadURL().then(function(url){
                        console.log(url);
                        var new_html='';
                        new_html+='<tr>';
                        new_html+='<td>o</td>';
                        new_html+='<td><a href='+url+' target="_blank">Test Reports</a>';
                        new_html+='</td>';
                        new_html+='</tr>';
                        $('#List').append(new_html);
                        });
                    });
                    });
                    }
                });
            }
        });
    }
}
function nextt()
{
    var Adhar=document.getElementById("AdharId").value
    var file=document.getElementById("file").value
    var storageRef = firebase.storage().ref(Adhar+'/'+ file+'/Lab');

    storageRef.listAll().then(function(result) {
      result.items.forEach(function(fileRef) {
        fileRef.delete();
      });
    }).catch(function(error) {
      
    });

    document.getElementById('zero').style.display="none";
    document.getElementById("preview-container").style.display="initial";
}

var _PDF_DOC,
	_CANVAS = document.querySelector('#pdf-preview'),
	_OBJECT_URL;

function showPDF(pdf_url) {
	PDFJS.getDocument({ url: pdf_url }).then(function(pdf_doc) {
		_PDF_DOC = pdf_doc;

		// Show the first page
		showPage(1);

		// destroy previous object url
    	URL.revokeObjectURL(_OBJECT_URL);
	}).catch(function(error) {
		// trigger Cancel on error
		document.querySelector("#cancel-pdf").click();
		
		// error reason
		alert(error.message);
	});;
}

function showPage(page_no) {
	// fetch the page
	_PDF_DOC.getPage(page_no).then(function(page) {
		// set the scale of viewport
		var scale_required = _CANVAS.width / page.getViewport(1).width;

		// get viewport of the page at required scale
		var viewport = page.getViewport(scale_required);

		// set canvas height
		_CANVAS.height = viewport.height;

		var renderContext = {
			canvasContext: _CANVAS.getContext('2d'),
			viewport: viewport
		};
		
		// render the page contents in the canvas
		page.render(renderContext).then(function() {
			document.querySelector("#pdf-preview").style.display = 'inline-block';
			document.querySelector("#pdf-loader").style.display = 'none';
		});
	});
}


/* Show Select File dialog */
document.querySelector("#upload-dialog").addEventListener('click', function() {
    document.querySelector("#pdf-file").click();
});

/* Selected File has changed */
document.querySelector("#pdf-file").addEventListener('change', function() {
    // user selected file
    var file = this.files[0];

    // allowed MIME types
    var mime_types = [ 'application/pdf' ];
    
    // Validate whether PDF
    if(mime_types.indexOf(file.type) == -1) {
        alert('Error : Incorrect file type');
        return;
    }

    // validate file size
    if(file.size > 8*256*1024) {
        alert('Error : Exceeded size 256KB');
        return;
    }

    // validation is successful

    // hide upload dialog button
    document.querySelector("#upload-dialog").style.display = 'none';
    
    // set name of the file
    document.querySelector("#pdf-name").innerText = file.name;
    document.querySelector("#pdf-name").style.display = 'inline-block';

    // show cancel and upload buttons now
    document.querySelector("#cancel-pdf").style.display = 'inline-block';
    document.querySelector("#upload-button").style.display = 'inline-block';

    // Show the PDF preview loader
    document.querySelector("#pdf-loader").style.display = 'inline-block';

    // object url of PDF 
    _OBJECT_URL = URL.createObjectURL(file)

    // send the object url of the pdf to the PDF preview function
	showPDF(_OBJECT_URL);


/* Reset file input */
document.querySelector("#cancel-pdf").addEventListener('click', function() {
    // show upload dialog button
    document.querySelector("#upload-dialog").style.display = 'inline-block';

    // reset to no selection
    document.querySelector("#pdf-file").value = '';

    // hide elements that are not required
    document.querySelector("#pdf-name").style.display = 'none';
    document.querySelector("#pdf-preview").style.display = 'none';
    document.querySelector("#pdf-loader").style.display = 'none';
    document.querySelector("#cancel-pdf").style.display = 'none';
    document.querySelector("#upload-button").style.display = 'none';
});
});
document.querySelector("#upload-button").addEventListener('click', function() {
    Upload();
});

function Upload() 
{ 
        var pic = document.getElementById("pdf-file"); 

		// selected file is that file which user chosen by html form 
		selectedFile = pic.files[0]; 

        var Adhar=document.getElementById("AdharId").value
        var file=document.getElementById("file").value

		// select unique name for everytime when image uploaded 
		// Date.now() is function that give current timestamp 
		var name="Hospital_"+HospitalId+"_"+Date.now(); 

		// make ref to your firebase storage and select images folder 
        var storage = firebase.storage()
        storageoneRef=storage.ref(Adhar+'/'+file+'/Hospital/'+ name); 
        storageRef=storage.ref(Adhar+'/'+file+'/'+ name); 
		// put file to firebase 
		storageoneRef.put(selectedFile); 
        storageRef.put(selectedFile);
        alert('Added in Folder');
        
        document.getElementById('Upload').style.display="none";
        document.getElementById("preview-container").style.display="none";
    
        document.getElementById('View').style.display="initial";  
        document.getElementById("AdharId").value="";
        document.getElementById("file").value="";
}

function UpdateAddress()
{
    var error =document.getElementById("erro")
error.innerHTML="Complete Fields Properly"
error.innerHTML=""

    var address=document.getElementById("currentaddress").value
    var newaddress=document.getElementById("address").value
    if(address=="" || newaddress=="") 
    {
        error.style.display="block"
        error.innerHTML="Complete Fields"
    }
    else{
        roothospital.child(HospitalId).once('value', function(snapshot){
            if(address==snapshot.val().Address)
            {
                roothospital.child(HospitalId).update({
                    "Address" : newaddress
                  });
                alert('Address Updated Successfully')
                location.reload();
            }
            else{
                alert('Invalid Address');
            }
        });
    }
    document.getElementById("currentaddress").value="";
    document.getElementById("address").value="";
}

function UpdateMobile()
{
    var error =document.getElementById("error")
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
        roothospital.child(HospitalId).once('value', function(snapshot){
            if(mobile==snapshot.val().Mobile)
            {
                roothospital.child(HospitalId).update({
                    "Mobile" : newmobile
                  });
                alert('Mobile No. Update Successfully')
                location.reload();
            }
            else{
                alert('Invalid Mobile No.');
            }
        });
    }
    document.getElementById("currentmobile").value="";
    document.getElementById("mobile").value="";
}

function UpdatePassword()
{
    var error =document.getElementById("arror")
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
        roothospital.child(HospitalId).once('value', function(snapshot){
            if(pwd==snapshot.val().Password)
            {
                roothospital.child(HospitalId).update({
                    "Password" : password
                  });
                alert('Password Update Successfully')
                location.reload();
            }
            else{
                alert('Invalid Password');
            }
            
        });
        
    }
    document.getElementById("password").value="";
    document.getElementById("currentpwd").value="";
}