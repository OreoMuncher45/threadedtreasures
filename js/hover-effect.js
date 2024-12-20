document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.product-card, .featured-card');

    cards.forEach(card => {
        let bounds = card.getBoundingClientRect();
        
        function rotateToMouse(e) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const leftX = mouseX - bounds.x;
            const topY = mouseY - bounds.y;
            const center = {
                x: leftX - bounds.width / 2,
                y: topY - bounds.height / 2
            }
            const distance = Math.sqrt(center.x**2 + center.y**2);
            
            card.style.transform = `
                perspective(800px)
                scale3d(1.05, 1.05, 1.05)
                rotate3d(
                    ${center.y / 100},
                    ${-center.x / 100},
                    0,
                    ${Math.log(distance) * 2}deg
                )
            `;
        }

        function removeRotation(e) {
            card.style.transform = `
                perspective(800px)
                scale3d(1, 1, 1)
                rotate3d(0, 0, 0, 0deg)
            `;
        }

        card.addEventListener('mousemove', rotateToMouse);
        card.addEventListener('mouseleave', removeRotation);
        card.addEventListener('mouseenter', () => {
            bounds = card.getBoundingClientRect();
        });
    });
});
