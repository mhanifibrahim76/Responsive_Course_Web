let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(item, img, link) {
    cart.push({ item, img, link });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(item + ' books have been purchased.');

    localStorage.setItem('buy' + item, 'true');
    updateButtonToLink(item);
}

$(document).ready(function() {
    if ($('#cartItems').length) {
        updateCart();
    } else;{
        checkButtonStatus();
    }
});

function updateCart() {
    let cartItems = $('#cartItems');
    let total = 0;

    cartItems.html('');
    cart.forEach(cartItem => {
        let itemDiv = $('<div class="box"></div>');
        let img = $('<img>').attr('src', cartItem.img).attr('alt', cartItem.item).addClass('cart-image');
        itemDiv.append(img);
        itemDiv.append(`<p>${cartItem.item}</p>`);
        let link = $('<a></a>').attr('href', cartItem.link).text('Start Learn').addClass('btn');
        itemDiv.append(link);
        cartItems.append(itemDiv);
        total += cartItem.price;
    });

    $('#totalPrice').text(total.toFixed(2));
}

function checkButtonStatus() {
    cart.forEach(cartItem => {
        if (localStorage.getItem('buy' + cartItem.item) === 'true') {
            updateButtonToLink(cartItem.item);
        }
    });
}

function updateButtonToLink(item) {
    const button = $('#buy' + item + 'Btn');
    const link = $('<a class="btn" ></a>').attr('href', cart.find(cartItem => cartItem.item === item).link).text('Start Learn').addClass('btn');
    button.replaceWith(link);
}
