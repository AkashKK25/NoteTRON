document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
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
    
    // FAQ Accordions
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile navigation if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80; // Adjust based on your header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // In a real implementation, you'd send this data to a server
            // For now, we'll just simulate a successful submission
            
            // Disable submit button and show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Simulate server request
            setTimeout(() => {
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. We'll get back to you soon.</p>
                `;
                
                // Replace form with success message
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
                
                // Style success message
                successMessage.style.textAlign = 'center';
                successMessage.style.padding = '30px';
                
                const successIcon = successMessage.querySelector('.success-icon');
                successIcon.style.fontSize = '3rem';
                successIcon.style.color = 'var(--accent-blue)';
                successIcon.style.marginBottom = '20px';
                
                const heading = successMessage.querySelector('h3');
                heading.style.marginBottom = '10px';
                heading.style.fontSize = '1.5rem';
                
                // Reset form (hidden but reset for if we want to show it again)
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('subject').value = '';
                document.getElementById('message').value = '';
            }, 1500);
        });
    }
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(12, 20, 31, 0.95)';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.backgroundColor = 'rgba(12, 20, 31, 0.9)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        }
    });
    
    // Platform Button Animation
    const platformButtons = document.querySelectorAll('.platform-btn');
    
    platformButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-5px)';
            button.style.boxShadow = '0 5px 15px rgba(13, 225, 240, 0.3)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = 'none';
        });
    });
    
    // Initialize first FAQ item as open
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }

    // Version selector functionality
    document.addEventListener('DOMContentLoaded', function() {
        const versionSelect = document.getElementById('version-select');
        const versionInfoBlocks = document.querySelectorAll('.version-info-block');
        const windowsDownload = document.getElementById('windows-download');
        const macDownload = document.getElementById('mac-download');
        const linuxDownload = document.getElementById('linux-download');
        
        // Update download links based on selected version
        function updateDownloadLinks(version) {
            windowsDownload.href = `downloads/notetron-${version}-win.exe`;
            macDownload.href = `downloads/notetron-${version}-mac.dmg`;
            linuxDownload.href = `downloads/notetron-${version}-linux.AppImage`;
            
            // Show the appropriate version info block
            versionInfoBlocks.forEach(block => {
                if (block.dataset.version === version) {
                    block.style.display = 'block';
                } else {
                    block.style.display = 'none';
                }
            });
        }
        
        // Set initial download links
        updateDownloadLinks(versionSelect.value);
        
        // Update links when version selection changes
        versionSelect.addEventListener('change', function() {
            updateDownloadLinks(this.value);
        });
        
        // Add click tracking for downloads
        const downloadButtons = document.querySelectorAll('.platform-btn');
        downloadButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const platform = this.id.split('-')[0];
                const version = versionSelect.value;
                
                console.log(`Download initiated: ${platform} version ${version}`);
            });
        });
    });

});

// Fixed and enhanced version selector functionality
document.addEventListener('DOMContentLoaded', function() {
    const versionSelect = document.getElementById('version-select');
    const versionInfoBlocks = document.querySelectorAll('.version-info-block');
    const platformButtons = document.querySelectorAll('.platform-btn');
    
    if (!versionSelect || !versionInfoBlocks.length || !platformButtons.length) {
        return; // Skip if elements don't exist
    }
    
    // Update the page based on selected version
    function updateVersionInfo(version) {
        // Update version info blocks visibility
        versionInfoBlocks.forEach(block => {
            if (block.dataset.version === version) {
                block.style.display = 'block';
                // Add highlight animation
                block.classList.add('highlight-feature');
                setTimeout(() => {
                    block.classList.remove('highlight-feature');
                }, 1000);
            } else {
                block.style.display = 'none';
            }
        });
        
        // Update download buttons with correct version links
        platformButtons.forEach(button => {
            // Update data attribute for tracking
            button.dataset.version = version;
            
            // Update href based on platform and version
            const platform = button.dataset.platform;
            button.href = getFileExtension(version, platform);

            button.setAttribute('download', `notetron-${version}-${platform}`);
            button.setAttribute('target', '_blank');
            
            // Add animation effect
            button.classList.add('version-updated');
            setTimeout(() => {
                button.classList.remove('version-updated');
            }, 1000);
        });

        platformButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Prevent default link behavior
                e.preventDefault();
                
                // Open the link in a new tab
                window.open(this.href, '_blank');
                
                // Optional: track download
                console.log(`Download initiated: ${this.dataset.platform} version ${this.dataset.version}`);
            });
        });
        
        // Save selected version to localStorage for persistence
        localStorage.setItem('selectedVersion', version);
    }
    
    // Helper function to get file extension based on platform
    function getFileExtension(version, platform) {
        switch (platform) {
            case 'win':
                switch (version) {
                    case '0.0.1':
                        return 'https://drive.google.com/uc?export=download&id=1xHRZ_CsshLAIotoWHLHVbbsj7h7RTEiO';
                    case '1.2.0':
                        return 'https://drive.google.com/uc?export=download&id=1xjscI38ExkZZOHax07hdcADU1GQh_E3y';
            }
            case 'mac':
                switch (version) {
                    case '0.0.1':
                        return 'https://drive.google.com/uc?export=download&id=1xHRZ_CsshLAIotoWHLHVbbsj7h7RTEiO';
                    case '1.2.0':
                        return 'https://drive.google.com/uc?export=download&id=1xjscI38ExkZZOHax07hdcADU1GQh_E3y';
            }
            case 'linux':
                switch (version) {
                    case '0.0.1':
                        return 'https://drive.google.com/uc?export=download&id=1xHRZ_CsshLAIotoWHLHVbbsj7h7RTEiO';
                    case '1.2.0':
                        return 'https://drive.google.com/uc?export=download&id=1xjscI38ExkZZOHax07hdcADU1GQh_E3y';
            }
        }
    }
    
    // Set initial version (check localStorage first for returning visitors)
    const savedVersion = localStorage.getItem('selectedVersion');
    if (savedVersion && versionSelect.querySelector(`option[value="${savedVersion}"]`)) {
        versionSelect.value = savedVersion;
    }
    
    // Initialize with current selected version
    updateVersionInfo(versionSelect.value);
    
    // Update when version selection changes
    versionSelect.addEventListener('change', function() {
        updateVersionInfo(this.value);
    });
    
    // Platform button click tracking (optional)
    platformButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Optional: track download
            console.log(`Download initiated: ${this.dataset.platform} version ${this.dataset.version}`);
            
            // If you want to prevent default and handle the download programmatically:
            // e.preventDefault();
            // downloadFile(this.href);
        });
    });
    
    // Add hover effects for the select element
    const selectWrapper = document.querySelector('.select-wrapper');
    if (selectWrapper) {
        versionSelect.addEventListener('focus', function() {
            selectWrapper.classList.add('focused');
        });
        
        versionSelect.addEventListener('blur', function() {
            selectWrapper.classList.remove('focused');
        });
    }
});