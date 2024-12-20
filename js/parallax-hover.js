document.addEventListener('DOMContentLoaded', function() {
    // Apply to both featured and regular product cards
    const cards = document.querySelectorAll('.featured-card, .product-card');

    cards.forEach(card => {
        // Add mouse event listeners
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
        card.addEventListener('mouseenter', handleMouseEnter);
    });

    function handleMouseMove(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        
        // Calculate mouse position relative to card center
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation (inverted X axis for correct tilt)
        const rotateY = ((mouseX - centerX) / centerX) * 10; // Max 10 degree rotation
        const rotateX = ((mouseY - centerY) / centerY) * -10; // Inverted Y axis

        // Apply transform with more pronounced lift
        card.style.transform = `
            perspective(1000px)
            scale3d(1.1, 1.1, 1.1)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(50px)
        `;

        // Update card content positions for parallax effect
        const cardImage = card.querySelector('.product-image');
        const cardInfo = card.querySelector('.product-info');
        
        if (cardImage) {
            cardImage.style.transform = `
                translateX(${rotateY * 0.5}px)
                translateY(${rotateX * 0.5}px)
            `;
        }
        
        if (cardInfo) {
            cardInfo.style.transform = `
                translateX(${rotateY * 0.3}px)
                translateY(${rotateX * 0.3}px)
            `;
        }

        // Add smooth shadow for lift effect
        card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
    }

    function handleMouseLeave(e) {
        const card = e.currentTarget;
        const cardImage = card.querySelector('.product-image');
        const cardInfo = card.querySelector('.product-info');

        // Reset all transforms with smooth transition
        card.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        card.style.transform = `
            perspective(1000px)
            scale3d(1, 1, 1)
            rotateX(0deg)
            rotateY(0deg)
            translateZ(0)
        `;
        card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';

        if (cardImage) {
            cardImage.style.transition = 'all 0.5s ease-out';
            cardImage.style.transform = 'translateX(0) translateY(0)';
        }

        if (cardInfo) {
            cardInfo.style.transition = 'all 0.5s ease-out';
            cardInfo.style.transform = 'translateX(0) translateY(0)';
        }
    }

    function handleMouseEnter(e) {
        const card = e.currentTarget;
        const cardImage = card.querySelector('.product-image');
        const cardInfo = card.querySelector('.product-info');

        // Remove transition for immediate response
        card.style.transition = 'none';
        if (cardImage) cardImage.style.transition = 'none';
        if (cardInfo) cardInfo.style.transition = 'none';
    }
});
