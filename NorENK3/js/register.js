document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            submitForm();
        }
    });

    function validateForm() {
        // Add your validation logic here
        // Return true if the form is valid, false otherwise
        return true;
    }

    function submitForm() {
    const formData = new FormData(registerForm);
    const enkData = {};

    for (let [key, value] of formData.entries()) {
        if (key === 'skills') {
            enkData[key] = value.split(',').map(skill => skill.trim());
        } else if (key === 'image') {
            enkData[key] = value.name; // Store the filename
        } else {
            enkData[key] = value;
        }
    }

    console.log('Form submitted:', enkData);
    // Here you would typically send the data to your server
    // For now, we'll just log it to the console

    // Reset the form after submission
    registerForm.reset();
    alert('Registration successful!');
}

});
