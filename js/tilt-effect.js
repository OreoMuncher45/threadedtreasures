function addTiltEffect(element) {
    const card = element;
    const height = card.clientHeight;
    const width = card.clientWidth;
    
    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseout', handleOut);
    card.addEventListener('mouseover', handleOver);

    function handleMove(e) {
        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const centerX = width / 2;
        const centerY = height / 2;
        
        const percentX = (mouseX - centerX) / centerX;
        const percentY = -((mouseY - centerY) / centerY);
        
        const maxDegree = 10;
        
        card.style.transform = `
            perspective(1000px)
            scale3d(1.05, 1.05, 1.05)
            rotateX(${percentY * maxDegree}deg)
            rotateY(${percentX * maxDegree}deg)
        `;
    }

    function handleOut() {
        card.style.transform = `
            perspective(1000px)
            scale3d(1, 1, 1)
            rotateX(0)
            rotateY(0)
        `;
        card.style.transition = 'transform 0.5s ease-out';
    }

    function handleOver() {
        card.style.transition = 'transform 0.1s ease-out';
    }
}

// Initialize tilt effect
document.addEventListener('DOMContentLoaded', function() {
    // Add effect to featured cards
    document.querySelectorAll('.featured-card').forEach(card => {
        addTiltEffect(card);
    });

    // Add effect to product cards
    document.querySelectorAll('.product-card').forEach(card => {
        addTiltEffect(card);
    });
});
