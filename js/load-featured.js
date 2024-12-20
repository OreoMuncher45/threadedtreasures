document.addEventListener('DOMContentLoaded', () => {
    const featuredGrid = document.getElementById('featuredProductsGrid');
    if (!featuredGrid) return;

    // Function to create a product card
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'featured-card';
        
        card.innerHTML = `
            <div class="product-image" style="background-color: var(--soft-pink);">
                <div class="product-placeholder">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">${product.price}</div>
                <p class="product-description">${product.description}</p>
                <a href="products.html#${product.category}" class="view-more">View Collection</a>
            </div>
        `;
        
        // Add click event to show modal
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('view-more')) {
                showProductModal(product);
            }
        });

        return card;
    }

    // Get one product from each category
    const categories = ['scrunchies', 'headbands', 'keychains', 'accessories'];
    
    // First, clear the grid
    featuredGrid.innerHTML = '';
    
    // Add products
    categories.forEach(category => {
        // Find the first product in each category
        const product = window.products.find(p => p.category === category);
        if (product) {
            const card = createProductCard(product);
            featuredGrid.appendChild(card);
            
            // Initialize tilt effect if available
            if (typeof addTiltEffect === 'function') {
                addTiltEffect(card);
            }
        }
    });
});
