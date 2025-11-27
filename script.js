document.addEventListener('DOMContentLoaded', function () {
    const bars = document.querySelectorAll('.progress');
    bars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = percent + '%';
        }, 300);
    });

    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('click', function () {
            const url = this.getAttribute('data-url');
            if (url) {
                window.location.href = url;
            }
        });
    });

    const canvas = document.getElementById('myCanvas');
    if (canvas && canvas.getContext) {
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#4070f4';
        ctx.fillRect(30, 30, 110, 60);

        ctx.beginPath();
        ctx.arc(210, 75, 40, 0, 2 * Math.PI);
        ctx.fillStyle = '#9552e8';
        ctx.fill();
        ctx.closePath();

        ctx.font = "17px 'Segoe UI', Arial";
        ctx.fillStyle = '#232849';
        ctx.fillText('Canvas Demo', 90, 150);
    }

    const images = document.querySelectorAll('.slider-img');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let current = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            img.style.display = (i === index) ? 'block' : 'none';
        });
    }

    if (images.length > 0) {
        showImage(current);

        prevBtn.addEventListener('click', function () {
            current = (current === 0) ? images.length - 1 : current - 1;
            showImage(current);
        });

        nextBtn.addEventListener('click', function () {
            current = (current === images.length - 1) ? 0 : current + 1;
            showImage(current);
        });
    }

    const toggleBtn = document.getElementById('themeToggle');
    const body = document.body;

    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        toggleBtn.textContent = '☀️ Light Mode';
    }

    toggleBtn.addEventListener('click', function () {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            toggleBtn.textContent = '☀️ Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            toggleBtn.textContent = '🌙 Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    });

    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 200) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name.length < 2) {
                status.textContent = 'Name must be at least 2 characters.';
                status.style.color = 'red';
                return;
            }
            if (!email.includes('@') || !email.includes('.')) {
                status.textContent = 'Please enter a valid email.';
                status.style.color = 'red';
                return;
            }
            if (message.length < 5) {
                status.textContent = 'Message must be at least 5 characters.';
                status.style.color = 'red';
                return;
            }

            const formData = { name, email, message };
            localStorage.setItem('portfolioFormData', JSON.stringify(formData));

            status.textContent = 'Success! Redirecting...';
            status.style.color = 'green';

            setTimeout(() => {
                window.location.href = 'form-details.html'; 
            }, 1000);
        });
    }
});
