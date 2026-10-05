let cart = [];

// Toggle Cart Drawer
function toggleCart() {
    document.getElementById('cartDrawer').classList.toggle('open');
}

// Add Product To Cart
function addToCart(title, price) {
    cart.push({ title, price });
    updateCartUI();
    toggleCart();
}

// Update Cart UI
function updateCartUI() {
    const container = document.getElementById('cartItemsContainer');
    const count = document.getElementById('cartCount');
    const total = document.getElementById('cartDrawerTotal');

    count.innerText = cart.length;

    if (cart.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: var(--text-muted); margin-top: 50px;">السلة فارغة حالياً</p>`;
        total.innerText = `0 ج.م`;
        return;
    }

    let sum = 0;
    container.innerHTML = '';
    cart.forEach((item, index) => {
        sum += item.price;
        container.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.title}</strong>
                    <div style="color: var(--primary);">${item.price} ج.م</div>
                </div>
                <button style="color: red; border:none; background:none; cursor:pointer;" onclick="removeFromCart(${index})">&times;</button>
            </div>
        `;
    });

    total.innerText = `${sum} ج.م`;
    document.getElementById('calcPrice').value = sum;
    calculateDiscount();
}

// Remove item from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Discount & Price Calculator Logic
function calculateDiscount() {
    let basePrice = parseFloat(document.getElementById('calcPrice').value) || 0;
    let coupon = document.getElementById('couponCode').value.trim().toUpperCase();
    let shipping = parseFloat(document.getElementById('shippingSelect').value);
    
    let discount = 0;

    // Apply 20% discount if code SAVE20 is entered
    if (coupon === 'SAVE20') {
        discount = basePrice * 0.20;
    }

    // Free shipping if base price >= 1500 EGP
    if (basePrice >= 1500) {
        shipping = 0;
        document.getElementById('shippingMsg').innerText = "مبروك! حصلت على شحن مجاني 🎉";
        document.getElementById('progressBar').style.width = "100%";
    } else {
        let progress = (basePrice / 1500) * 100;
        document.getElementById('progressBar').style.width = `${progress}%`;
        document.getElementById('shippingMsg').innerText = `أضف بـ ${(1500 - basePrice)} ج.م إضافية للحصول على شحن مجاني!`;
    }

    let finalTotal = (basePrice - discount) + shipping;

    document.getElementById('summaryBasePrice').innerText = `${basePrice} ج.م`;
    document.getElementById('summaryDiscount').innerText = `${discount.toFixed(0)} ج.م`;
    document.getElementById('summaryShipping').innerText = `${shipping} ج.م`;
    document.getElementById('summaryFinal').innerText = `${finalTotal.toFixed(0)} ج.م`;
}

// Initial Calculation Run
calculateDiscount();
