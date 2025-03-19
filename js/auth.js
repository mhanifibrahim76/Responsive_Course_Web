document.addEventListener('DOMContentLoaded', function() {
    const usernameDisplay = document.getElementById('username-display');
    const loginLink = document.getElementById('login-link');
    
    // Check if user is logged in by checking localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = localStorage.getItem('currentUser');
    
    // Determine if we're in a subpage by checking the URL
    const isSubpage = window.location.pathname.includes('/page/');
    const loginPath = isSubpage ? 'login.html' : './page/login.html';
    const imgPath = isSubpage ? '../img/' : 'img/';
    
    if (currentUser) {
        // User is logged in
        const user = users.find(u => u.username === currentUser);
        if (user) {
            usernameDisplay.textContent = `Welcome, ${user.username}`;
            loginLink.innerHTML = `<img src="${imgPath}user-2.png" onmouseover="this.src='${imgPath}user-1.png'" onmouseout="this.src='${imgPath}user-2.png'" alt="">`;
            loginLink.href = '#';
            loginLink.onclick = function(e) {
                e.preventDefault();
                if (confirm('Are you sure you want to logout?')) {
                    logout();
                }
            };
        }
    } else {
        // User is not logged in
        usernameDisplay.textContent = '';
        loginLink.href = loginPath;
    }
});

function logout() {
    localStorage.removeItem('currentUser');
    window.location.reload();
} 