// Sample Products Data
const products = [
    {
        id: 1,
        name: 'Kopi Premium',
        category: 'makanan',
        price: 45000,
        image: '☕',
        description: 'Kopi arabika pilihan dengan rasa yang kaya dan aroma yang memikat. Dipanggang fresh setiap hari.',
        stock: 50,
        rating: 4.5,
        reviews: 120
    },
    {
        id: 2,
        name: 'Snack Crispy',
        category: 'makanan',
        price: 25000,
        image: '🍟',
        description: 'Snack enak dan renyah yang cocok untuk menemani aktivitas Anda. Bahan pilihan berkualitas tinggi.',
        stock: 100,
        rating: 4.3,
        reviews: 85
    },
    {
        id: 3,
        name: 'Madu Asli',
        category: 'makanan',
        price: 75000,
        image: '🍯',
        description: 'Madu murni dari peternak lokal tanpa campuran. Kaya akan nutrisi dan manfaat kesehatan.',
        stock: 30,
        rating: 4.8,
        reviews: 200
    },
    {
        id: 4,
        name: 'Teh Herbal',
        category: 'minuman',
        price: 35000,
        image: '🍵',
        description: 'Teh herbal organik yang menyegarkan dan menyehatkan. Terbuat dari bahan alami pilihan.',
        stock: 60,
        rating: 4.4,
        reviews: 95
    },
    {
        id: 5,
        name: 'Jus Segar',
        category: 'minuman',
        price: 20000,
        image: '🧃',
        description: 'Jus buah segar dibuat langsung dari buah berkualitas tinggi. Tanpa pengawet dan pewarna sintetis.',
        stock: 80,
        rating: 4.2,
        reviews: 110
    },
    {
        id: 6,
        name: 'Sirup Buah',
        category: 'minuman',
        price: 30000,
        image: '🥤',
        description: 'Sirup buah lezat dengan rasa yang autentik. Cocok untuk berbagai minuman dan resep masakan.',
        stock: 40,
        rating: 4.1,
        reviews: 70
    },
    {
        id: 7,
        name: 'Tas Tangan',
        category: 'kerajinan',
        price: 150000,
        image: '👜',
        description: 'Tas tangan buatan lokal dengan desain modern dan elegan. Dibuat dengan keahlian tinggi.',
        stock: 25,
        rating: 4.6,
        reviews: 180
    },
    {
        id: 8,
        name: 'Batik Kain',
        category: 'kerajinan',
        price: 125000,
        image: '🎨',
        description: 'Kain batik asli dengan motif tradisional yang indah. Sempurna untuk pakaian atau dekorasi.',
        stock: 35,
        rating: 4.5,
        reviews: 145
    },
    {
        id: 9,
        name: 'Dompet Kulit',
        category: 'kerajinan',
        price: 95000,
        image: '💼',
        description: 'Dompet kulit asli berkualitas premium dengan jahitan rapi. Tahan lama dan stylish.',
        stock: 45,
        rating: 4.7,
        reviews: 160
    },
    {
        id: 10,
        name: 'LED Lamp',
        category: 'elektronik',
        price: 85000,
        image: '💡',
        description: 'Lampu LED hemat energi dengan teknologi terkini. Dapat diatur brightness-nya.',
        stock: 50,
        rating: 4.4,
        reviews: 130
    },
    {
        id: 11,
        name: 'Power Bank',
        category: 'elektronik',
        price: 150000,
        image: '🔋',
        description: 'Power bank kapasitas besar dengan fast charging. Cocok untuk semua jenis smartphone.',
        stock: 40,
        rating: 4.6,
        reviews: 175
    },
    {
        id: 12,
        name: 'Headphone',
        category: 'elektronik',
        price: 200000,
        image: '🎧',
        description: 'Headphone berkualitas dengan suara jernih dan bass yang dalam. Comfort untuk penggunaan lama.',
        stock: 20,
        rating: 4.8,
        reviews: 210
    }
];

let currentFilter = 'semua';
let filteredProducts = products;

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCartBtn = document.getElementById('closeCart');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const productModal = document.getElementById('productModal');
const modalClose = document.getElementById('modalClose');
const contactForm = document.getElementById('contactForm');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    setupEventListeners();
});

// Display Products
function displayProducts(productsToDisplay) {
    productsGrid.innerHTML = productsToDisplay.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description.substring(0, 60)}...</p>
                <div class="product-rating">
                    <span class="stars">${getStars(product.rating)}</span>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-footer">
                    <span class="product-price">Rp ${product.price.toLocaleString('id-ID')}</span>
                    <span class="product-stock">${product.stock} terjual</span>
                </div>
                <div class="product-buttons">
                    <button class="detail-btn" onclick="event.stopPropagation(); openProductModal(${product.id})">Lihat Detail</button>
                    <button class="cart-btn" onclick="event.stopPropagation(); addToCart(${product.id})">+ Keranjang</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Get Star Rating
function getStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    let stars = '★'.repeat(fullStars);
    if (halfStar) stars += '½';
    stars += '☆'.repeat(5 - Math.ceil(rating));
    return stars;
}

// Filter Products
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        filterAndDisplayProducts();
    });
});

// Search Products
searchInput.addEventListener('input', (e) => {
    filterAndDisplayProducts(e.target.value);
});

function filterAndDisplayProducts(searchTerm = '') {
    filteredProducts = products.filter(product => {
        const matchesFilter = currentFilter === 'semua' || product.category === currentFilter;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });
    displayProducts(filteredProducts);
}

// Product Modal
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('modalImage').textContent = product.image;
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalStars').textContent = getStars(product.rating);
    document.getElementById('modalReviews').textContent = `${product.reviews} ulasan`;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalPrice').textContent = `Rp ${product.price.toLocaleString('id-ID')}`;
    document.getElementById('modalStock').textContent = `${product.stock} tersedia`;
    document.getElementById('quantity').value = 1;
    document.getElementById('quantity').max = product.stock;
    document.getElementById('addToCartBtn').dataset.productId = productId;

    productModal.classList.add('active');
}

// Quantity Controls in Modal
document.getElementById('plusBtn')?.addEventListener('click', () => {
    const input = document.getElementById('quantity');
    input.value = Math.min(parseInt(input.value) + 1, parseInt(input.max));
});

document.getElementById('minusBtn')?.addEventListener('click', () => {
    const input = document.getElementById('quantity');
    input.value = Math.max(parseInt(input.value) - 1, 1);
});

// Add to Cart from Modal
document.getElementById('addToCartBtn')?.addEventListener('click', () => {
    const productId = parseInt(this.dataset.productId);
    const quantity = parseInt(document.getElementById('quantity').value);
    addToCart(productId, quantity);
    productModal.classList.remove('active');
});

// Add to Cart
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`${product.name} ditambahkan ke keranjang!`);
}

// Update Cart Count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

// Setup Event Listeners
function setupEventListeners() {
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('active');
    });

    closeCartBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });

    hamburger?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    modalClose.addEventListener('click', () => {
        productModal.classList.remove('active');
    });

    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.classList.remove('active');
        }
    });

    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Terima kasih! Pesan Anda telah dikirim.');
        contactForm.reset();
    });

    updateCartCount();
}

// Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}