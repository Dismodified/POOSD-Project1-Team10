const urlBase = '/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	let login = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;
//	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

	let tmp = {login:login,password:password};
//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "contacts.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addContact()
{
    let contactFirstName = document.getElementById("contactFirstName").value;
    let contactLastName = document.getElementById("contactLastName").value;
    let contactPhone = document.getElementById("contactPhone").value;
    let contactEmail = document.getElementById("contactEmail").value;
    document.getElementById("contactAddResult").innerHTML = "";
    
    // Remove any existing asterisks first
    document.querySelectorAll('.error-asterisk').forEach(el => el.remove());
    
    // Check for empty required fields and add asterisks
    let hasError = false;
    
    if (!contactFirstName.trim()) {
        addAsterisk('contactFirstName');
        hasError = true;
    }
    
    if (!contactLastName.trim()) {
        addAsterisk('contactLastName');
        hasError = true;
    }
    
    if (hasError) {
        document.getElementById("contactAddResult").innerHTML = '<div style="position: absolute; padding-top: 10px; color: #f43f5e;">(*) Areas required</div>';
        return;
    }
    
    let tmp = {
        firstName: contactFirstName,
        lastName: contactLastName,
        phone: contactPhone,
        email: contactEmail,
        userId: userId
    };
    let jsonPayload = JSON.stringify( tmp );
    let url = urlBase + '/AddContacts.' + extension;
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                let jsonObject = JSON.parse( xhr.responseText );
                
                if (jsonObject.error && jsonObject.error !== "") {
                    document.getElementById("contactAddResult").innerHTML = jsonObject.error;
                } else {
                    document.getElementById("contactAddResult").innerHTML = '<div style="position: absolute; padding-top: 10px; color: #22c55e;">Contact has been added</div>';
                    
                    // Clear form
                    document.getElementById("contactFirstName").value = "";
                    document.getElementById("contactLastName").value = "";
                    document.getElementById("contactPhone").value = "";
                    document.getElementById("contactEmail").value = "";
                    
                    // Remove any asterisks
                    document.querySelectorAll('.error-asterisk').forEach(el => el.remove());
                }
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        document.getElementById("contactAddResult").innerHTML = err.message;
    }
}

// Add this new function to handle asterisk display
function addAsterisk(inputId) {
    const input = document.getElementById(inputId);
    
    // Create wrapper if it doesn't exist
    if (!input.parentNode.classList.contains('input-wrapper')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'input-wrapper';
        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline-block';
        wrapper.style.width = '100%';
        
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);
    }
    
    // Add red asterisk
    const asterisk = document.createElement('span');
    asterisk.className = 'error-asterisk';
    asterisk.innerHTML = '*';
    asterisk.style.cssText = `
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: #f43f5e;
        font-weight: bold;
        font-size: 20px;
        pointer-events: none;
        z-index: 10;
    `;
    
    input.parentNode.appendChild(asterisk);
}

function searchContacts() {
    let srch = document.getElementById("searchText").value.trim();
    
    document.getElementById("contactSearchResult").innerHTML = "";
    document.getElementById("contactSearchList").innerHTML = "";
    
    if (!srch) {
        document.getElementById("contactSearchResult").innerHTML = '<span style="color: #f43f5e;">Enter a name, phone, or email to search (*)</span>';
        return;
    }
    
    let contactList = "";
    let tmp = {search: srch, userId: userId};
    let jsonPayload = JSON.stringify( tmp );
    let url = urlBase + '/SearchContacts.' + extension;
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                let jsonObject = JSON.parse( xhr.responseText );
                
                if (jsonObject.error && jsonObject.error !== "") {
                    document.getElementById("contactSearchResult").innerHTML = jsonObject.error;
                    document.getElementById("contactSearchList").innerHTML = "";
                    return;
                }
                
                if (jsonObject.results && jsonObject.results.length > 0) {
                    document.getElementById("contactSearchResult").innerHTML = "Found " + jsonObject.results.length + " contact(s):";
                    document.getElementById("contactSearchResult").style.color = "#22c55e";
                    
                    for( let i=0; i<jsonObject.results.length; i++ )
                    {
                        let contact = jsonObject.results[i];
                        contactList += "<div style='background: rgba(37, 99, 235, 0.1); padding: 10px; margin: 5px 0; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;'>";
                        contactList += "<div style='color: #d1d5db; text-shadow: 0px 0px 2px black, -1px -1px 2px black, 1px -1px 2px black, -1px 1px 2px black;'>";
                        contactList += "<strong>" + contact.firstName + " " + contact.lastName + "</strong><br>";
                        if (contact.phone) contactList += "Phone: " + contact.phone + "<br>";
                        if (contact.email) contactList += "Email: " + contact.email;
                        contactList += "</div>";
                        contactList += "<div style='display: flex; gap: 8px;'>";
                        contactList += "<button onclick='editContact(" + contact.id + ", \"" + contact.firstName + "\", \"" + contact.lastName + "\", \"" + (contact.phone || '') + "\", \"" + (contact.email || '') + "\")' style='background: linear-gradient(180deg, #BC9A6A 0%, #9C7A4A 100%); color: #2563eb; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-weight: 600;'>Edit</button>";
                        contactList += "<button onclick='deleteContact(" + contact.id + ")' style='background: linear-gradient(180deg, #BC9A6A 0%, #9C7A4A 100%); color: #8b0000; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-weight: 600;'>Delete</button>";
                        contactList += "</div>";
                        contactList += "</div>";
                    }
                } else {
                    document.getElementById("contactSearchResult").innerHTML = "No contacts found for '" + srch + "'";
                    document.getElementById("contactSearchResult").style.color = "#f43f5e";
                    contactList = "";
                }
                
                document.getElementById("contactSearchList").innerHTML = contactList;
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        document.getElementById("contactSearchResult").innerHTML = err.message;
        document.getElementById("contactSearchList").innerHTML = "";
    }
}

function deleteContact(contactId)
{
	if (!confirm("Are you sure you want to delete this contact?")) {
		return;
	}

	let tmp = {id: contactId, userId: userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/DeleteContacts.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				
				if (jsonObject.error && jsonObject.error !== "") {
					alert("Error deleting contact: " + jsonObject.error);
				} else {
					// Refresh the search results
					searchContacts();
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		alert("Error deleting contact: " + err.message);
	}
}

function editContact(contactId, firstName, lastName, phone, email) {
    // Populate the add contact form with existing data
    document.getElementById('contactFirstName').value = firstName;
    document.getElementById('contactLastName').value = lastName;
    document.getElementById('contactPhone').value = phone || '';
    document.getElementById('contactEmail').value = email || '';
    
    // Find the Add Contact button
    const addButton = document.querySelector('button[onclick="addContact();"]');
    if (addButton) {
        addButton.textContent = 'Update Contact';
        addButton.setAttribute('onclick', `updateContact(${contactId});`);
    }
    
    // Show a message indicating edit mode
    document.getElementById('contactAddResult').innerHTML = '<div style="padding-top: 20px;">Editing contact - click "Update Contact" to save changes or exit</div>';
    document.getElementById('contactAddResult').style.color = '#2563eb';
    
    // Scroll to the form
    document.querySelector('.contact-section:last-of-type').scrollIntoView({ behavior: 'smooth' });
}

function updateContact(contactId) {
    const firstName = document.getElementById('contactFirstName').value.trim();
    const lastName = document.getElementById('contactLastName').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    
    if (!firstName || !lastName) {
        document.getElementById('contactAddResult').innerHTML = 'First and Last name are required';
        document.getElementById('contactAddResult').style.color = '#f43f5e';
        return;
    }
    
    const tmp = {
        id: contactId,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        userId: userId
    };
    
    const jsonPayload = JSON.stringify(tmp);
    const url = urlBase + '/UpdateContacts.' + extension;
    
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    
    try {
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const jsonObject = JSON.parse(xhr.responseText);
                
                if (jsonObject.error && jsonObject.error !== "") {
                    document.getElementById('contactAddResult').innerHTML = jsonObject.error;
                    document.getElementById('contactAddResult').style.color = '#f43f5e';
                } else {
                    document.getElementById('contactAddResult').innerHTML = 'Contact updated successfully';
                    document.getElementById('contactAddResult').style.color = '#22c55e';
                    
                    // Reset form and button
                    resetAddForm();
                    
                    // Refresh search results
                    searchContacts();
                }
            }
        };
        xhr.send(jsonPayload);
    } catch(err) {
        document.getElementById('contactAddResult').innerHTML = err.message;
        document.getElementById('contactAddResult').style.color = '#f43f5e';
    }
}

function resetAddForm() {
    // Clear form
    document.getElementById('contactFirstName').value = '';
    document.getElementById('contactLastName').value = '';
    document.getElementById('contactPhone').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactAddResult').innerHTML = '';
    
    // Reset button
    const updateButton = Array.from(document.querySelectorAll('button')).find(btn => 
        btn.textContent === 'Update Contact'
    );
    
    if (updateButton) {
        updateButton.textContent = 'Add Contact';
        updateButton.setAttribute('onclick', 'addContact();');
    }
}

function initInputValidation() {
    // Find login page fields
    const usernameInput = document.getElementById('loginName') || document.getElementById('registerUsername');
    const passwordInput = document.getElementById('loginPassword') || document.getElementById('registerPassword');
    
    // Check for register-specific fields
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');

    function validateInput(input, minLength) {
        if (!input) return; 
        
        const value = input.value;
        
        // Remove existing validation classes and checkmarks
        input.classList.remove('valid', 'invalid');
        const existingCheckmark = document.getElementById('checkmark-' + input.id);
        if (existingCheckmark) {
            existingCheckmark.remove();
        }
        
        if (value.length === 0) {
            return;
        } else if (value.length >= minLength) {
            // Valid - green with checkmark
            input.classList.add('valid');
            
            // Get input's position and dimensions
            const inputRect = input.getBoundingClientRect();
            const parentRect = input.parentNode.getBoundingClientRect();
            
            // Calculate position relative to parent
            const topPosition = inputRect.top - parentRect.top + (inputRect.height / 2);
            const rightPosition = parentRect.right - inputRect.right + 12;
            
            // Add checkmark
            const checkmark = document.createElement('span');
            checkmark.id = 'checkmark-' + input.id;
            checkmark.innerHTML = '&#9989;';
            checkmark.style.cssText = `
                position: absolute;
                right: ${rightPosition}px;
                top: ${topPosition}px;
                transform: translateY(-50%);
                color: #22c55e;
                font-weight: bold;
                font-size: 18px;
                pointer-events: none;
                z-index: 10;
            `;
            
            // Make sure parent has relative positioning
            if (!input.parentNode.style.position || input.parentNode.style.position === 'static') {
                input.parentNode.style.position = 'relative';
            }
            
            input.parentNode.appendChild(checkmark);
        } else {
            input.classList.add('invalid');
        }
    }

    // Validation for username/login field (1+ characters)
    if (usernameInput) {
        usernameInput.addEventListener('input', function() {
            validateInput(this, 1);
        });
    }
    // Validation for password field (4+ characters)
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            validateInput(this, 4);
        });
    }
    // Validation for first name (1+ characters)
    if (firstNameInput) {
        firstNameInput.addEventListener('input', function() {
            validateInput(this, 1);
        });
    }
    // Validation for last name (1+ characters)
    if (lastNameInput) {
        lastNameInput.addEventListener('input', function() {
            validateInput(this, 1);
        });
    }
}

// Initialize validation when page loads
document.addEventListener('DOMContentLoaded', function() {
    initInputValidation();
    
    // Add asterisk clearing for contact form fields
    ['contactFirstName', 'contactLastName'].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', function() {
                // Remove asterisk when user starts typing
                const asterisk = this.parentNode.querySelector('.error-asterisk');
                if (asterisk && this.value.trim()) {
                    asterisk.remove();
                }
            });
        }
    });
    
    if (document.getElementById('contactsDiv')) {
        readCookie();
    }
});
