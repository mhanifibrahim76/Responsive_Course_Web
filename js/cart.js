// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Check if a course has been purchased
function isCoursePurchased(courseName) {
    const singlePurchase = JSON.parse(localStorage.getItem('purchasedCourse'));
    const multiPurchase = JSON.parse(localStorage.getItem('purchasedCourses'));
    
    if (singlePurchase && singlePurchase.name === courseName) {
        return true;
    }
    
    if (multiPurchase && multiPurchase.some(course => course.name === courseName)) {
        return true;
    }
    
    return false;
}

// Update course buttons based on purchase status
function updateCourseButtons() {
    const courseBoxes = document.querySelectorAll('.product .box');
    
    courseBoxes.forEach(box => {
        const courseName = box.querySelector('.content h3').textContent;
        const buttonContainer = box.querySelector('.icon');
        const materiUrl = buttonContainer.querySelector('.buy-btn')?.getAttribute('onclick')?.match(/'([^']+)'/g)[2]?.replace(/'/g, '');
        
        if (isCoursePurchased(courseName)) {
            buttonContainer.innerHTML = `
                <a href="${materiUrl}" class="btn">View Material</a>
            `;
        }
    });
}

function addToCart(courseName, imageUrl, materiUrl) {
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
        if (confirm('You need to login first to add this course to cart. Do you want to login now?')) {
            window.location.href = '../page/login.html';
        }
        return;
    }

    // Check if course is already purchased
    if (isCoursePurchased(courseName)) {
        window.location.href = materiUrl;
        return;
    }

    // Check if course is already in cart
    if (cart.some(item => item.name === courseName)) {
        alert('This course is already in your cart!');
        return;
    }

    // Add course to cart
    cart.push({
        name: courseName,
        image: imageUrl,
        materiUrl: materiUrl,
        price: 12.99 // Add price information
    });
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Course added to cart successfully!');
    updateCartDisplay();
}

function buyNow(courseName, imageUrl, materiUrl) {
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
        if (confirm('You need to login first to purchase this course. Do you want to login now?')) {
            window.location.href = '../page/login.html';
        }
        return;
    }

    // Check if course is already purchased
    if (isCoursePurchased(courseName)) {
        window.location.href = materiUrl;
        return;
    }

    // Store single item for payment
    const purchaseItem = {
        name: courseName,
        image: imageUrl,
        materiUrl: materiUrl,
        price: 12.99
    };
    
    localStorage.setItem('currentPurchase', JSON.stringify(purchaseItem));
    window.location.href = 'payment.html';
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;
        
        cart.forEach((item, index) => {
            totalPrice += item.price;
            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <img src="../img/${item.name}.jpg" alt="${item.name}">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p>$${item.price.toFixed(2)}</p>
                    </div>
                    <button onclick="removeFromCart(${index})" class="remove-btn">Remove</button>
                </div>
            `;
        });

        if (totalPriceElement) {
            totalPriceElement.textContent = totalPrice.toFixed(2);
        }
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Store cart items for payment
    localStorage.setItem('currentPurchase', JSON.stringify({
        items: cart,
        totalPrice: cart.reduce((total, item) => total + item.price, 0)
    }));
    
    window.location.href = 'payment.html';
}

// Clear cart
function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Display purchased courses in material page
function displayPurchasedCourses() {
    const purchasedItemsContainer = document.getElementById('cartItems');
    if (!purchasedItemsContainer) return;

    // Get purchased courses from localStorage
    const singlePurchase = JSON.parse(localStorage.getItem('purchasedCourse'));
    const multiPurchase = JSON.parse(localStorage.getItem('purchasedCourses'));
    
    let purchasedItems = [];
    
    // Combine single and multiple purchases
    if (singlePurchase) {
        purchasedItems.push(singlePurchase);
    }
    if (multiPurchase) {
        purchasedItems = purchasedItems.concat(multiPurchase);
    }

    // Display message if no purchases
    if (purchasedItems.length === 0) {
        purchasedItemsContainer.innerHTML = `
            <div class="empty-message">
                <h3>No purchased courses yet</h3>
                <p>Browse our courses and start learning today!</p>
                <a href="courses.html" class="btn">View Courses</a>
            </div>
        `;
        return;
    }

    // Display purchased courses
    purchasedItemsContainer.innerHTML = purchasedItems.map(item => `
        <div class="box">
            <img src="../img/${item.name}.jpg" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Purchase Date: ${new Date(item.purchaseDate).toLocaleDateString()}</p>
            <a href="${item.materiUrl}" class="btn">View Material</a>
        </div>
    `).join('');
}

// Initialize displays when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
    displayPurchasedCourses();
    updateCourseButtons();
    
    // Add event listeners for checkout and clear cart buttons
    const checkoutBtn = document.querySelector('.checkout-btn');
    const clearBtn = document.querySelector('.clear-btn');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', proceedToCheckout);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', clearCart);
    }
});
