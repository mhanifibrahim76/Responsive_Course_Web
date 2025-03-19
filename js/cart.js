function addToCart(courseName, imageUrl, materiUrl) {
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
        if (confirm('You need to login first to purchase this course. Do you want to login now?')) {
            window.location.href = '../page/login.html';
        }
        return;
    }

    let purchasedCourses = JSON.parse(localStorage.getItem('purchasedCourses')) || {};
    if (!purchasedCourses[currentUser]) {
        purchasedCourses[currentUser] = [];
    }

    // Check if user already purchased this course
    if (purchasedCourses[currentUser].some(course => course.name === courseName)) {
        alert('You have already purchased this course!');
        return;
    }

    // Add course to purchased courses
    purchasedCourses[currentUser].push({
        name: courseName,
        image: imageUrl,
        materiUrl: materiUrl
    });
    
    localStorage.setItem('purchasedCourses', JSON.stringify(purchasedCourses));
    alert('Course purchased successfully!');
    updateButtonStates();
}

function updateButtonStates() {
    const currentUser = localStorage.getItem('currentUser');
    const courseButtons = {
        'Front-End': document.getElementById('buyFront-EndBtn'),
        'Frame-Work': document.getElementById('buyFrame-WorkBtn'),
        'Back-End': document.getElementById('buyBack-EndBtn')
    };

    // Reset all buttons to Buy state
    for (const [courseName, button] of Object.entries(courseButtons)) {
        if (button) {
            button.textContent = 'Buy';
            button.disabled = false;
            button.style.backgroundColor = '';
            button.onclick = function() {
                addToCart(courseName, 
                    courseName === 'Front-End' ? '../img/front-end.jpg' : 
                    courseName === 'Frame-Work' ? '../img/frame-work.jpg' : 
                    '../img/back-end.jpg',
                    courseName === 'Front-End' ? 'materi-front-end.html' : 
                    courseName === 'Frame-Work' ? 'materi-frame-work.html' : 
                    'materi-back-end.html'
                );
            };
        }
    }

    // If user is logged in, update purchased courses
    if (currentUser) {
        const purchasedCourses = JSON.parse(localStorage.getItem('purchasedCourses')) || {};
        const userCourses = purchasedCourses[currentUser] || [];

        for (const [courseName, button] of Object.entries(courseButtons)) {
            if (button && userCourses.some(course => course.name === courseName)) {
                button.textContent = 'Purchased';
                button.disabled = true;
                button.style.backgroundColor = '#999';
            }
        }

        // Update purchased materials in materi page
        const cartItemsContainer = document.getElementById('cartItems');
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
            userCourses.forEach(course => {
                cartItemsContainer.innerHTML += `
                    <div class="box">
                        <img src="${course.image}" alt="${course.name}">
                        <h2>${course.name}</h2>
                        <a href="${course.materiUrl}" class="btn">View Material</a>
                    </div>
                `;
            });
        }
    }
}

// Call updateButtonStates when page loads
document.addEventListener('DOMContentLoaded', updateButtonStates);
