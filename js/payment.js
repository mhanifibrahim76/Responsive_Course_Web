document.addEventListener('DOMContentLoaded', function() {
    // Get purchase data from localStorage
    const purchaseData = JSON.parse(localStorage.getItem('currentPurchase'));
    
    if (!purchaseData) {
        window.location.href = 'courses.html';
        return;
    }

    const orderDetails = document.getElementById('order-details');
    const paymentAmount = document.getElementById('payment-amount');

    // Handle single course purchase
    if (!purchaseData.items) {
        const course = purchaseData;
        orderDetails.innerHTML = `
            <div class="item">
                <span>Course Name</span>
                <span>${course.name}</span>
            </div>
            <div class="item">
                <span>Duration</span>
                <span>3 Months</span>
            </div>
            <div class="item total">
                <span>Total Amount</span>
                <span>$${course.price.toFixed(2)}</span>
            </div>
        `;
        paymentAmount.textContent = `$${course.price.toFixed(2)}`;
    } 
    // Handle cart checkout
    else {
        const items = purchaseData.items;
        let itemsHtml = '';
        items.forEach(item => {
            itemsHtml += `
                <div class="item">
                    <span>${item.name}</span>
                    <span>$${item.price.toFixed(2)}</span>
                </div>
            `;
        });
        itemsHtml += `
            <div class="item total">
                <span>Total Amount</span>
                <span>$${purchaseData.totalPrice.toFixed(2)}</span>
            </div>
        `;
        orderDetails.innerHTML = itemsHtml;
        paymentAmount.textContent = `$${purchaseData.totalPrice.toFixed(2)}`;
    }
});

function processPayment(event) {
    event.preventDefault();
    
    const purchaseData = JSON.parse(localStorage.getItem('currentPurchase'));
    const selectedPayment = document.querySelector('input[name="payment-method"]:checked').value;
    
    if (!purchaseData) {
        alert('No purchase data found!');
        return false;
    }

    // Simulate payment processing
    alert('Processing payment...');
    
    setTimeout(() => {
        // After successful payment
        if (!purchaseData.items) {
            // Single course purchase
            localStorage.setItem('purchasedCourse', JSON.stringify({
                name: purchaseData.name,
                materiUrl: purchaseData.materiUrl,
                purchaseDate: new Date().toISOString()
            }));
            
            // Redirect to material page
            window.location.href = purchaseData.materiUrl;
        } else {
            // Cart purchase
            const purchasedCourses = purchaseData.items.map(item => ({
                name: item.name,
                materiUrl: item.materiUrl,
                purchaseDate: new Date().toISOString()
            }));
            
            localStorage.setItem('purchasedCourses', JSON.stringify(purchasedCourses));
            localStorage.removeItem('cart'); // Clear cart after successful purchase
            
            // Redirect to first course material
            window.location.href = purchasedCourses[0].materiUrl;
        }
        
        localStorage.removeItem('currentPurchase');
    }, 2000);

    return false;
} 