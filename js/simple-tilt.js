document.addEventListener('DOMContentLoaded', function() {
    // Function to add tilt effect to an element
    function addTiltEffect(element) {
        element.addEventListener('mousemove', function(e) {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            
            const dx = x - xc;
            const dy = y - yc;
            
            const tiltX = -(dy / yc) * 10;
            const tiltY = (dx / xc) * 10;
            
            element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        element.addEventListener('mouseleave', function() {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });

        element.addEventListener('mouseenter', function() {
            element.style.transition = 'transform 0.1s';
        });

        element.addEventListener('mouseleave', function() {
            element.style.transition = 'transform 0.5s';
        });
    }

    // Add tilt effect to all product cards
    const cards = document.querySelectorAll('.featured-card, .product-card');
    cards.forEach(addTiltEffect);
});
