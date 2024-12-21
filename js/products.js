// Product Database
const products = [
    {
        id: 'SCR001',
        name: '🍏 Green Apple/Red Apple Scrunchie 🍎',
        category: 'scrunchies',
        price: '$29.99',
        description: 'Fresh-picked style for your hair! These fruity scrunchies bring a pop of playful charm with their vibrant apple-inspired hues—perfect for adding a sweet twist to any outfit. 😊',
        images: ['images/products/scrunchies/pink-scrunchie-1.jpg', 'images/products/scrunchies/applescrunchie.jpg'],
        details: 'Handmade with love using 100% cotton yarn. Perfect for all hair types and gentle on your hair.',
        colors: ['Pink', 'Available in other colors upon request'],
        featured: true
    },
    {
        id: 'SCR002',
        name: '🍅 Tomato Scrunchie 🍅',
        category: 'scrunchies',
        price: '$24.99',
        description: 'Fresh, fun, and totally unique! This vibrant red scrunchie adds a pop of charm to any look—perfect for a playful twist on your everyday style. 😊',
        images: ['images/products/scrunchies/tomatoscrunchie.jpg'],
        details: 'Created with premium acrylic yarn in pastel shades. Each piece is unique!',
        colors: ['Pastel Rainbow']
    },
    
];

// DOM Elements
const productsGrid = document.querySelector('.products-grid');
const featuredGrid = document.querySelector('.featured-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('product-modal');
const closeModal = document.querySelector('.close-modal');

// Functions
function createProductCard(product, isFeatured = false) {
    const card = document.createElement('div');
    card.className = 'product-card';
    if (isFeatured) card.classList.add('featured-card');
    card.setAttribute('data-product-id', product.id);
    
    card.innerHTML = `
        <div class="product-image" style="background-color: var(--soft-pink);">
            <div class="product-placeholder">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <div class="product-code">#${product.id}</div>
            <div class="product-price">${product.price}</div>
            <p class="product-description">${product.description}</p>
            ${isFeatured ? '<a href="products.html#' + product.category + '" class="view-more">View More</a>' : ''}
        </div>
    `;
    
    card.addEventListener('click', () => showProductModal(product));
    return card;
}

function showProductModal(product) {
    const modalBody = modal.querySelector('.modal-body');
    modalBody.innerHTML = `
        <div class="modal-image-container">
            <div class="product-image" style="background-color: var(--soft-pink);">
                <div class="product-placeholder">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
            </div>
        </div>
        <div class="modal-info">
            <h2>${product.name}</h2>
            <div class="modal-code">#${product.id}</div>
            <div class="product-price">${product.price}</div>
            <p class="product-description">${product.description}</p>
            <div class="product-details">
                <h4>Details:</h4>
                <p>${product.details}</p>
                <h4>Available Colors:</h4>
                <ul>
                    ${product.colors.map(color => `<li>${color}</li>`).join('')}
                </ul>
            </div>
            <a href="https://www.instagram.com/threadedtreasures.tt" target="_blank" rel="noopener noreferrer" class="order-button">
                <i class="fab fa-instagram"></i> Order on Instagram
            </a>
        </div>
    `;
    
    modal.style.display = 'block';
}

function filterProducts(category) {
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    productsGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        productsGrid.appendChild(createProductCard(product));
    });
}

function displayFeaturedProducts() {
    if (!featuredGrid) return;
    
    // Get one product from each category
    const categories = ['scrunchies', 'headbands', 'keychains', 'accessories'];
    const featuredProducts = categories.map(category => 
        products.find(product => product.category === category && product.featured)
    ).filter(Boolean);
    
    featuredGrid.innerHTML = '';
    featuredProducts.forEach(product => {
        featuredGrid.appendChild(createProductCard(product, true));
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    if (productsGrid) {
        filterProducts('all');
    }
    displayFeaturedProducts();
});

filterButtons?.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const category = button.getAttribute('data-category');
        filterProducts(category);
    });
});

closeModal?.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
