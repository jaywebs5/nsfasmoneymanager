.document.addEventListener('DOMContentLoaded', function() {
	
    
    const allButtons = document.querySelectorAll('.btn-primary, .btn-outline');
    
    allButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
			
            const buttonText = button.innerText.toLowerCase();
			
            if (buttonText.includes('get started') || 
                buttonText.includes('create') || 
                buttonText.includes('start managing')) {
                
                alert('🎉 Welcome to NSFAS Money Manager!\n\n' +
					'Your financial freedom journey begins now.\n\n' +
				'We\'ve sent a verification link to your student email.');
			}
            
            else if (buttonText.includes('demo')) {
                alert('🚀 Interactive Demo Loading...\n\n' +
					'✨ Features you\'ll experience:\n' +
					'• Real-time expense tracking\n' +
					'• AI budget suggestions\n' +
					'• Savings challenges\n' +
					'• Allowance forecasting\n\n' +
				'Full access granted for 14 days!');
			}
            
            
            else if (buttonText.includes('app store') || 
				buttonText.includes('google play')) {
                alert('📲 Redirecting to store...\n\n' +
					'NSFAS Money Manager\n' +
					'★★★★★ 4.8 • 12,000+ reviews\n\n' +
				'Free download • No in-app purchases');
			}
            
            
            else if (buttonText.includes('log in')) {
                alert('🔐 Login Portal\n\n' +
					'Please enter your student email and password.\n\n' +
				'New user? Click "Get Started Free" to create an account.');
			}
		});
	});
	
	
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(function(item) {
        item.addEventListener('click', function() {
			
            const answer = item.querySelector('span');
            
            
            if (answer.style.display === 'none') {
                
                answer.style.display = 'inline';
				
                item.style.backgroundColor = '#f0fdf6';
                setTimeout(function() {
                    item.style.backgroundColor = '';
				}, 500);
				} else {
                // Hide the answer temporarily
                answer.style.display = 'none';
                // Auto-show again after 2 seconds
                setTimeout(function() { 
                    answer.style.display = 'inline';
				}, 2000);
			}
		});
	});
	
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            // If element is visible in viewport
            if (entry.isIntersecting) {
				
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
				
                observer.unobserve(entry.target);
			}
		});
		}, {
        threshold: 0.1,  // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px'  // Slight offset for earlier trigger
	});
	
    const animatedElements = document.querySelectorAll(
        '.feature-card, .testimonial, .step-card, .pricing-card, .faq-item'
	);
	
	
    animatedElements.forEach(function(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Start observing this element
        observer.observe(element);
	});
	
    
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
			
            navbar.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)';
			
            navbar.style.boxShadow = '0 8px 32px rgba(0,0,0,0.06)';
		}
	});
	
    
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();  // Prevent default jump
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
				});
			}
		});
	});
	
    
    const dashboardPreview = document.querySelector('.dashboard-preview');
    const budgetFill = document.querySelector('.budget-fill');
    
    if (dashboardPreview && budgetFill) {
        const budgetObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    // Reset and trigger animation
                    budgetFill.style.width = '0';
                    setTimeout(function() {
                        budgetFill.style.width = '68%';
					}, 200);
                    budgetObserver.unobserve(entry.target);
				}
			});
		}, { threshold: 0.3 });
        
        budgetObserver.observe(dashboardPreview);
	}
	
	
    
    function animateCounter(element, target, suffix) {
        let current = 0;
        const increment = target / 50;  // Divide by frames
        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
			}
            element.textContent = Math.floor(current) + suffix;
		}, 30);  // Update every 30ms
	}
	
    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const statItems = entry.target.querySelectorAll('.stat-item h3');
                statItems.forEach(function(stat) {
                    const text = stat.textContent;
                    if (text.includes('%')) {
                        animateCounter(stat, 85, '%');
						} else if (text.includes('k+')) {
                        animateCounter(stat, 12, 'k+');
						} else if (text.includes('R')) {
                        animateCounter(stat, 2.4, 'M');
                        stat.textContent = 'R2.4M'; 
					}
				});
                statObserver.unobserve(entry.target);
			}
		});
	}, { threshold: 0.5 });
	
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statObserver.observe(heroStats);
	}
	
    
    const studentCards = document.querySelectorAll('.student-card');
    
    studentCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
		});
        
        card.addEventListener('mouseleave', function() {
            card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
		});
	});
	
	
    
    document.addEventListener('keydown', function(event) {
		
        if (event.key === 'Enter' || event.key === ' ') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('btn-primary') || 
                focusedElement.classList.contains('btn-outline')) {
                event.preventDefault();
                focusedElement.click();
			}
		}
	});
	
    
    console.log('💚 NSFAS Money Manager v3.0 — Fully Loaded');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Features Active:');
    console.log('   • AI Budget Recommendations');
    console.log('   • Real-time Expense Tracking');
    console.log('   • Community Savings Challenges');
    console.log('   • Mobile App Integration');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👨‍💻 Built with: HTML5 • CSS3 • Vanilla JavaScript');
    console.log('🔒 Security: Bank-level encryption • GDPR compliant');
    console.log('📱 Available on: iOS App Store • Google Play Store');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('💡 Tip: Try clicking buttons, FAQ items, and scroll to see animations!');
	
}); 

const scrollTopButton = document.querySelector('.scroll-top');

window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        // User scrolled down - show button
        scrollTopButton.style.opacity = '1';
        scrollTopButton.style.pointerEvents = 'auto';
		} else {
        // User near top - hide button
        scrollTopButton.style.opacity = '0';
        scrollTopButton.style.pointerEvents = 'none';
	}
});


if (scrollTopButton) {
    scrollTopButton.style.opacity = '0';
    scrollTopButton.style.pointerEvents = 'none';
    scrollTopButton.style.transition = 'opacity 0.3s ease';
}


window.addEventListener('error', function(event) {
    console.log('An error occurred but the app continues to work:', event.message);
	
});


function debounce(func, wait) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
		}, wait);
	};
}

window.addEventListener('scroll', debounce(function() {
	
}, 10));
/* =========================
   LOGOUT BUTTON
========================= */

document
.getElementById("logoutBtn")
.addEventListener("click", () => {

    const confirmLogout =
    confirm(
        "Are you sure you want to logout?"
    );

    if (confirmLogout) {

        /* CLEAR SAVED DATA */
        localStorage.clear();

        /* REDIRECT TO LOGIN PAGE */
        window.location.href = "Login.html";
    }
});