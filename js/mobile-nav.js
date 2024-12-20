document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    hamburger.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
    `;

    const navbar = document.querySelector('.navbar .nav-container');
    const navLinks = document.querySelector('.nav-links');

    // Insert hamburger before nav-links
    if (navbar && navLinks) {
        navbar.insertBefore(hamburger, navLinks);

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Handle scroll
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > lastScroll && currentScroll > 100) {
                // Scrolling down - hide nav
                navbar.parentElement.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up - show nav
                navbar.parentElement.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }
});
