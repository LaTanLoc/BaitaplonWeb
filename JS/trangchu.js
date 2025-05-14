document.addEventListener("DOMContentLoaded", () => {
    // Spinner and Main Content Fade
    const spinner = document.getElementById("spinner");
    const mainContent = document.querySelector("body > *:not(#spinner)");

    if (spinner && mainContent) {
        mainContent.style.opacity = "0";
        mainContent.style.transition = "opacity 0.5s ease-in";

        setTimeout(() => {
            spinner.style.opacity = "0";
            spinner.style.transition = "opacity 0.5s ease-out";

            spinner.addEventListener("transitionend", () => {
                spinner.classList.remove("show");
                spinner.style.display = "none";
                mainContent.style.opacity = "1";
            }, { once: true });
        }, 1000);
    }

    // Reveal on Scroll
    function revealOnScroll() {
        document.querySelectorAll(".reveal").forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = 100;
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add("active");
            } else {
                el.classList.remove("active");
            }
        });
    }
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    // Testimonial Slider
    class TestimonialSlider {
        constructor(selector = '.testimonial', interval = 4000) {
            this.testimonials = document.querySelectorAll(selector);
            this.total = this.testimonials.length;
            this.currentIndex = 0;
            this.interval = interval;
            this.intervalId = null;
        }

        showTestimonial(index) {
            this.testimonials.forEach(t => t.classList.remove('active'));
            this.testimonials[index].classList.add('active');
        }

        nextTestimonial() {
            this.currentIndex = (this.currentIndex + 1) % this.total;
            this.showTestimonial(this.currentIndex);
        }

        start() {
            if (this.total > 0) {
                this.showTestimonial(this.currentIndex);
                this.intervalId = setInterval(() => this.nextTestimonial(), this.interval);
            }
        }

        stop() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
        }
    }

    const slider = new TestimonialSlider();
    slider.start();

    window.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            slider.stop();
        } else {
            slider.start();
        }
    });

    // Back to Top
    class BackToTop {
        constructor() {
            this.button = document.getElementById('back-to-top');
            if (this.button) {
                this.init();
            }
        }

        init() {
            window.addEventListener('scroll', () => {
                this.button.style.display = (window.scrollY > 200) ? 'flex' : 'none';
            });

            this.button.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
    new BackToTop();

    // Dropdown Navigation
    const dropdowns = document.querySelectorAll(".nav-item.dropdown");
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener("mouseenter", function () {
            dropdowns.forEach(item => {
                if (item !== this) item.classList.remove("open");
            });
            this.classList.add("open");
        });

        dropdown.addEventListener("mouseleave", function () {
            this.classList.remove("open");
        });
    });

    // Form Submission
    const form = document.getElementById("appointment-form");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Đặt lịch hẹn thành công! Chúng tôi sẽ liên lạc để xác nhận trong 24h.\nCảm ơn bạn đã tin tưởng và lựa chọn dịch vụ của chúng tôi.");
            form.reset();
        });
    }

    // Sticky Navbar
    const nav = document.querySelector('.navbar');
    if (nav) {
        const navOffset = nav.offsetTop;
        function handleScroll() {
            if (window.scrollY >= navOffset) {
                nav.classList.add('sticky');
            } else {
                nav.classList.remove('sticky');
            }
        }
        window.addEventListener('scroll', handleScroll);
    }
});