document.addEventListener('DOMContentLoaded', function() {
    // Select menu icon, navbar, and menu items
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const menuItems = document.querySelectorAll('.navbar a');
    const emailInput = document.querySelector('input[name="email"]'); // Select the email input field

    // Function to open the navbar
    function openNavbar() {
        menuIcon.classList.add('bx-x');
        navbar.classList.add('active');
    }

    // Function to close the navbar
    function closeNavbar() {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }

    // Toggle navbar state (open/close)
    function toggleNavbar() {
        if (navbar.classList.contains('active')) {
            closeNavbar();
        } else {
            openNavbar();
        }
    }

    // Close the navbar when clicking outside the navbar or menu icon
    document.addEventListener('click', (event) => {
        if (!navbar.contains(event.target) && event.target !== menuIcon) {
            closeNavbar();
        }
    });

    // Menu icon click event listener
    menuIcon.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent event bubbling
        toggleNavbar();
    });

    // Click event listener for menu items
    menuItems.forEach((menuItem) => {
        menuItem.addEventListener('click', () => {
            // Remove 'active' class from all menu items
            menuItems.forEach(item => item.classList.remove('active'));
            // Add 'active' class to the clicked menu item
            menuItem.classList.add('active');
            // Close the navbar after clicking on a menu item
            closeNavbar();
        });
    });

    // Set 'active' class for the current page's menu item
    const path = window.location.pathname;
    const page = path.split("/").pop().replace(".html", ""); // Get current page name without extension
    menuItems.forEach((menuItem) => {
        const href = menuItem.getAttribute('href').substring(1);
        if (href === page) {
            menuItem.classList.add('active');
        }
    });

    // Close the navbar when window is resized (for smaller screens)
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 895) {
            // Close navbar when window width is smaller than or equal to 895px
            closeNavbar();
        }
    });

    // Function to get sender email
    function getSenderEmail() {
        if (emailInput) {
            return emailInput.value; 
        } else {
            // Handle the case where emailInput is not available
            return '';
        }
    }

    // Send email when contact form is submitted
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const senderEmail = getSenderEmail();

        emailjs.sendForm('service_gny9rqq', 'template_8pga0z8', this, 'EKXZWpRsqXRK3nFWK')
            .then(function(response) {
                console.log('Email sent successfully:', response);
            }, function(error) {
                console.error('Email sending failed:', error);
            });
    });
});
