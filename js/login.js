$(document).ready(function() {
    $('#register-form').on('submit', function(event) {
        event.preventDefault();
        register();
    });

    function register() {
        const username = $('#username').val();
        const password = $('#password').val();
        const confirmPassword = $('#confirm-password').val();
        const usernameError = $('#username-error');

        // Validate username contains only letters
        const usernamePattern = /^[A-Za-z ]+$/;
        if (!usernamePattern.test(username)) {
            usernameError.text("Usernames can only contain letters!");
            return;
        } else if(String(username).length < 3){
            usernameError.text("username can't be less than 3 letters")
            return;
        } else {
            usernameError.text("");
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.some((user) => user.username === username)) {
            alert(`Username ${username} already registered!`);
            return;
        }
        if(String(password).length < 8){
            alert("password can't be less than 8 letters");
            return;
        }
        if (password !== confirmPassword) {
            alert("Password doesn't match!");
            return;
        }
        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration Success!");
        window.location.href = "login.html";
    }
});

$(document).ready(function() {
    $('#loginForm').on('submit', function(event) {
        event.preventDefault();
        login();
    });

    function login() {
        const username = $('#username').val();
        const password = $('#password').val();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === username && user.password === password);
        
        if (!user) {
            alert('Username or Password is incorrect!');
            return false;
        }
        
        // Store the current user in localStorage
        localStorage.setItem('currentUser', username);
        alert('Login Success!');
        window.location.href = '../index.html';
    }
});
    