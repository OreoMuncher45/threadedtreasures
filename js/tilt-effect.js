function addTiltEffect(element) {
    let rect = element.getBoundingClientRect();
    let mouseX = 0;
    let mouseY = 0;
    let centerX = rect.left + rect.width / 2;
    let centerY = rect.top + rect.height / 2;
    let perspective = 800;
    let transformAmount = 15;
    let scaleAmount = 1.07;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let isHovering = false;

    element.style.transition = 'transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)';
    element.style.transformStyle = 'preserve-3d';

    function lerp(start, end, amount) {
        return (1 - amount) * start + amount * end;
    }

    function update() {
        if (!isHovering) {
            mouseX = lerp(mouseX, 0, 0.1);
            mouseY = lerp(mouseY, 0, 0.1);
        } else {
            mouseX = lerp(lastMouseX, mouseX, 0.1);
            mouseY = lerp(lastMouseY, mouseY, 0.1);
        }

        const rotateX = (mouseY / centerY) * -transformAmount;
        const rotateY = (mouseX / centerX) * transformAmount;

        element.style.transform = `
            perspective(${perspective}px)
            scale(${isHovering ? scaleAmount : 1})
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;

        lastMouseX = mouseX;
        lastMouseY = mouseY;

        if (Math.abs(mouseX) > 0.01 || Math.abs(mouseY) > 0.01) {
            requestAnimationFrame(update);
        }
    }

    element.addEventListener('mouseenter', (e) => {
        isHovering = true;
        element.style.transition = 'transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)';
    });

    element.addEventListener('mousemove', (e) => {
        rect = element.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
        mouseX = e.clientX - centerX;
        mouseY = e.clientY - centerY;
        requestAnimationFrame(update);
    });

    element.addEventListener('mouseleave', () => {
        isHovering = false;
        mouseX = 0;
        mouseY = 0;
        element.style.transition = 'transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)';
        requestAnimationFrame(update);
    });
}

// Initialize tilt effect for all product cards
document.addEventListener('DOMContentLoaded', () => {
    // Add effect to featured cards
    document.querySelectorAll('.featured-card').forEach(card => {
        addTiltEffect(card);
    });

    // Add effect to regular product cards
    document.querySelectorAll('.product-card').forEach(card => {
        addTiltEffect(card);
    });
});
