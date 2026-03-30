const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Display Cart Items
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Keranjang Anda kosong</p>';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.image}</div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeItem(${item.id})">Hapus</button>
        </div>
    `).join('');
    
    updateCartTotal();
}

// Update Quantity
function updateQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(i => i.id === productId);
    
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

// Remove Item
function removeItem(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

// Update Cart Total
function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

// Checkout
checkoutBtn?.addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        showToast('Keranjang Anda kosong!');
        return;
    }

    showCheckoutModal();
});

function showCheckoutModal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const items = cart.map(item => `${item.name} (${item.quantity}x)`).join(', ');

    const modalHTML = `
        <div class="modal" id="checkoutModal">
            <div class="modal-content">
                <button class="modal-close" onclick="document.getElementById('checkoutModal').remove()"><i class="fas fa-times"></i></button>
                <div class="modal-body" style="grid-template-columns: 1fr; gap: 1.5rem;">
                    <div>
                        <h2>Checkout Pesanan</h2>
                        <div style="background: var(--light-color); padding: 1.5rem; border-radius: 8px; margin: 1rem 0;">
                            <h3 style="margin-bottom: 1rem;">Detail Pesanan:</h3>
                            <p style="margin-bottom: 0.5rem;"><strong>Produk:</strong> ${items}</p>
                            <p style="margin-bottom: 1rem;"><strong>Total:</strong> Rp ${total.toLocaleString('id-ID')}</p>
                        </div>
                        <h3 style="margin-bottom: 1rem;">Pilih Metode Pembayaran:</h3>
                        <div style="display: flex; flex-direction: column; gap: 1rem;">
                            <button class="checkout-payment-btn" onclick="checkoutVia('whatsapp', '${items}', ${total})">
                                <i class="fab fa-whatsapp"></i> WhatsApp
                            </button>
                            <button class="checkout-payment-btn" onclick="checkoutVia('email', '${items}', ${total})">
                                <i class="fas fa-envelope"></i> Email
                            </button>
                            <button class="checkout-payment-btn" onclick="checkoutVia('call', '${items}', ${total})">
                                <i class="fas fa-phone"></i> Hubungi Langsung
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.getElementById('checkoutModal').classList.add('active');

    // Add styling for checkout buttons
    const style = document.createElement('style');
    style.textContent = `
        .checkout-payment-btn {
            padding: 1rem;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: var(--transition);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        .checkout-payment-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(style);
}

function checkoutVia(method, items, total) {
    const phoneNumber = '6281234567890'; // Ganti dengan nomor WhatsApp/telepon Anda
    const email = 'info@waroengberkah.com'; // Ganti dengan email Anda
    const message = `Pesanan: ${items}\nTotal: Rp ${total.toLocaleString('id-ID')}`;

    switch(method) {
        case 'whatsapp':
            window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
            break;
        case 'email':
            window.location.href = `mailto:${email}?subject=Pesanan Baru&body=${encodeURIComponent(message)}`;
            break;
        case 'call':
            window.location.href = `tel:+${phoneNumber}`;
            break;
    }

    // Clear cart
    localStorage.setItem('cart', JSON.stringify([]));
    displayCartItems();
    updateCartCount();
    document.getElementById('checkoutModal')?.remove();
    document.getElementById('cartSidebar').classList.remove('active');
    showToast('Terima kasih! Segera hubungi kami untuk konfirmasi pesanan.');
}

// Listen to cart sidebar opening
const cartSidebar = document.getElementById('cartSidebar');
const originalRemove = cartSidebar.classList.remove;

const observer = new MutationObserver(() => {
    if (cartSidebar.classList.contains('active')) {
        displayCartItems();
    }
});

observer.observe(cartSidebar, { attributes: true, attributeFilter: ['class'] });

// Initial display
displayCartItems();