// Product Database
const products = [
    {
        id: 'SCR001',
        name: 'Classic Pink Scrunchie',
        category: 'scrunchies',
        price: '$8.99',
        description: 'A delicate pink scrunchie perfect for everyday wear. Made with soft cotton yarn.',
        images: ['images/products/scrunchies/pink-scrunchie-1.jpg', 'images/products/scrunchies/pink-scrunchie-2.jpg'],
        details: 'Handmade with love using 100% cotton yarn. Perfect for all hair types and gentle on your hair.',
        colors: ['Pink', 'Available in other colors upon request'],
        featured: true
    },
    {
        id: 'SCR002',
        name: 'Pastel Rainbow Scrunchie',
        category: 'scrunchies',
        price: '$10.99',
        description: 'Multi-colored pastel scrunchie featuring a beautiful rainbow pattern.',
        images: ['images/products/scrunchies/rainbow-scrunchie-1.jpg'],
        details: 'Created with premium acrylic yarn in pastel shades. Each piece is unique!',
        colors: ['Pastel Rainbow']
    },
    {
        id: 'HB001',
        name: 'Floral Headband',
        category: 'headbands',
        price: '$15.99',
        description: 'Elegant headband with crocheted flowers. Perfect for spring and summer.',
        images: ['images/products/headbands/floral-headband-1.jpg'],
        details: 'Features delicate flower details. Comfortable fit for all-day wear.',
        colors: ['White with Pink Flowers', 'Custom colors available'],
        featured: true
    },
    {
        id: 'HB002',
        name: 'Twisted Knot Headband',
        category: 'headbands',
        price: '$12.99',
        description: 'Classic twisted knot design headband, perfect for any occasion.',
        images: ['images/products/headbands/twisted-headband-1.jpg'],
        details: 'Featuring a comfortable stretch and elegant twisted design.',
        colors: ['Blush Pink', 'Cream', 'Gray']
    },
    {
        id: 'KC001',
        name: 'Mini Heart Keychain',
        category: 'keychains',
        price: '$7.99',
        description: 'Adorable heart-shaped keychain with secure metal ring.',
        images: ['images/products/keychains/heart-keychain-1.jpg'],
        details: 'Made with durable yarn and includes a strong metal keyring.',
        colors: ['Red', 'Pink', 'White'],
        featured: true
    },
    {
        id: 'ACC001',
        name: 'Butterfly Hair Clip',
        category: 'accessories',
        price: '$9.99',
        description: 'Delicate butterfly-shaped hair clip with secure fastening.',
        images: ['images/products/accessories/butterfly-clip-1.jpg'],
        details: 'Handcrafted butterfly design attached to a reliable hair clip.',
        colors: ['Purple', 'Pink', 'Blue'],
        featured: true
    }
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
            <a href="https://www.instagram.com/threadedtreasures.tt" target="_blank" class="order-button">
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
