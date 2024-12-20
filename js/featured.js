document.addEventListener('DOMContentLoaded', () => {
    const featuredGrid = document.getElementById('featuredGrid');
    if (!featuredGrid) return;

    // Get one product from each category
    const categories = ['scrunchies', 'headbands', 'keychains', 'accessories'];
    
    function createFeaturedCard(product) {
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
        
        return card;
    }

    // Fetch products from products.js and display them
    const featuredProducts = categories.map(category => {
        const product = window.products.find(p => p.category === category);
        if (product) {
            const card = createFeaturedCard(product);
            featuredGrid.appendChild(card);
        }
    });
});
