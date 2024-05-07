document.addEventListener('DOMContentLoaded', function() {
    // Select menu icon, navbar, and menu items
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const menuItems = document.querySelectorAll('.navbar .nav-link');
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

    // Set 'active' class for the current page's menu item based on scroll position
    function setActiveMenuItem() {
        const scrollPosition = window.scrollY;
        const sections = document.querySelectorAll('section');
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const id = section.getAttribute('id');
                const correspondingMenuItem = document.querySelector(`.navbar .nav-link[href="#${id}"]`);
                // Remove 'active' class from all menu items
                menuItems.forEach(item => item.classList.remove('active'));
                // Add 'active' class to the corresponding menu item
                if (correspondingMenuItem) {
                    correspondingMenuItem.classList.add('active');
                }
            }
        });
    }

    // Listen for scroll events to update the active navbar link
    window.addEventListener('scroll', setActiveMenuItem);
});
