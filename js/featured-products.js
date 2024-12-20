document.addEventListener('DOMContentLoaded', function() {
    const featuredGrid = document.getElementById('featuredProductsGrid');
    
    if (!featuredGrid || !window.products) return;

    // Get one product from each category
    const categories = ['scrunchies', 'headbands', 'keychains', 'accessories'];
    
    categories.forEach(category => {
        const product = window.products.find(p => p.category === category);
        if (product) {
            const card = document.createElement('div');
            card.className = 'featured-card';
            
            card.innerHTML = `
                <div class="product-image">
                    <div class="product-placeholder">${category.charAt(0).toUpperCase() + category.slice(1)}</div>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-price">${product.price}</div>
                    <p class="product-description">${product.description}</p>
                    <a href="products.html#${category}" class="view-more">View Collection</a>
                </div>
            `;
            
            featuredGrid.appendChild(card);
        }
    });
});
