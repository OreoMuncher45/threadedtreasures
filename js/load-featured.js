document.addEventListener('DOMContentLoaded', () => {
    const featuredGrid = document.getElementById('featuredProductsGrid');
    if (!featuredGrid) return;

    // Function to create a product card
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'featured-card';
        
        card.innerHTML = `
            <div class="product-image">
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

    // Get one product from each category
    const categories = ['scrunchies', 'headbands', 'keychains', 'accessories'];
    categories.forEach(category => {
        const product = products.find(p => p.category === category);
        if (product) {
            const card = createProductCard(product);
            featuredGrid.appendChild(card);
        }
    });
});
