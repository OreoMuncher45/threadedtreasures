document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', handleHover);
        card.addEventListener('mouseleave', resetCard);
        card.addEventListener('mouseenter', e => {
            card.style.transition = 'none';
        });
    });

    function handleHover(e) {
        const card = this;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate rotation based on mouse position
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        // Apply transform with smooth transition
        card.style.transform = `
            perspective(1000px)
            scale3d(1.05, 1.05, 1.05)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;

        // Add shine effect
        const shine = card.querySelector('.shine') || addShineElement(card);
        const moveX = (x / rect.width) * 150 - 75;
        const moveY = (y / rect.height) * 150 - 75;
        shine.style.transform = `translate(${moveX}%, ${moveY}%)`;
    }

    function resetCard(e) {
        const card = this;
        card.style.transition = 'all 0.5s ease';
        card.style.transform = `
            perspective(1000px)
            scale3d(1, 1, 1)
            rotateX(0deg)
            rotateY(0deg)
        `;
    }

    function addShineElement(card) {
        const shine = document.createElement('div');
        shine.classList.add('shine');
        shine.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 80%);
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        card.appendChild(shine);
        return shine;
    }
});
