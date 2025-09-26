// Transition
function smoothTransition(url) {
    document.body.classList.add('fade-out');
    setTimeout(() => location.href = url, 400);
}

// Main registration
async function doRegister() {
    // Get form values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value;
    
    // Clear error messages
    const resultElement = document.getElementById('registerResult');
    resultElement.textContent = '';
    resultElement.style.color = '#f43f5e';
    
    // Basic validation
    if (!firstName || !lastName || !username || !password) {
        resultElement.textContent = 'Please fill in all fields';
        return;
    }
    
    // Disable button
    const registerButton = document.querySelector('button[onclick="doRegister();"]');
    const originalText = registerButton.textContent;
    registerButton.disabled = true;
    registerButton.textContent = 'Creating Account';
    
    // Prepare data for API
    const registerData = {
        firstName: firstName,
        lastName: lastName,
        login: username,
        password: password
    };
    
    try {
        const response = await fetch('LAMPAPI/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData)
        });
        
        const result = await response.json();
        
        // Re-enable button
        registerButton.disabled = false;
        registerButton.textContent = originalText;
        
        if (result.error && result.error !== '') {
            // Handle error
            let errorMessage = result.error;
            if (result.error.includes('Duplicate entry')) {
                errorMessage = 'User already exists. Please choose a different user info.';
            }
            resultElement.textContent = errorMessage;
            resultElement.style.color = '#f43f5e'; // Red for errors
        } else {
            // Success
            resultElement.textContent = 'Account Created Successfully! Redirecting to login';
            resultElement.style.color = '#22c55e'; // Green for success
            
            // Clear form
            document.getElementById('firstName').value = '';
            document.getElementById('lastName').value = '';
            document.getElementById('registerUsername').value = '';
            document.getElementById('registerPassword').value = '';
            
            // Redirect to login page after 2 seconds
            setTimeout(() => {
                smoothTransition('index.html');
            }, 2000);
        }
        
    } catch (error) {
        // Re-enable button
        registerButton.disabled = false;
        registerButton.textContent = originalText;
        
        console.error('Registration error:', error);
        resultElement.textContent = 'Network error. Please try again.';
        resultElement.style.color = '#f43f5e';
    }
}
