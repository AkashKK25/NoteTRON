// Legal page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all tab panes
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Show the corresponding tab pane
            const tabId = this.dataset.tab;
            document.getElementById(`${tabId}-pane`).classList.add('active');
            
            // Update URL hash
            window.location.hash = tabId;
        });
    });
    
    // Check for hash in URL to activate specific tab
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const tabButton = document.querySelector(`.tab-button[data-tab="${hash}"]`);
        
        if (tabButton) {
            tabButton.click();
        }
    }
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Add glow effects on hover
    const legalTabs = document.querySelector('.legal-tabs');
    
    if (legalTabs) {
        legalTabs.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px rgba(13, 225, 240, 0.2)';
            this.style.borderColor = 'var(--accent-blue)';
        });
        
        legalTabs.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
            this.style.borderColor = 'var(--border-color)';
        });
    }
});