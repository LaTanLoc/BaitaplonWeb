window.addEventListener("load", () => {
  const spinner = document.getElementById("spinner");
  const mainContent = document.querySelector("body > *:not(#spinner)");
  
  if (spinner && mainContent) {
    // Hide main content initially
    mainContent.style.opacity = "0";
    mainContent.style.transition = "opacity 0.5s ease-in";
    
    // Fade out spinner with delay
    setTimeout(() => {
      spinner.style.opacity = "0";
      spinner.style.transition = "opacity 0.5s ease-out";
      
      // When spinner fade-out is complete
      spinner.addEventListener("transitionend", () => {
        spinner.classList.remove("show");
        spinner.style.display = "none";
        // Reveal main content
        mainContent.style.opacity = "1";
      }, { once: true });
    }, 1000); // Delay for three-dot animation visibility
  }
});

function revealOnScroll() {
  document.querySelectorAll(".reveal").forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 100;
    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");
    } else {
      el.classList.remove("active"); // Ensure elements can re-trigger animation
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
document.addEventListener("DOMContentLoaded", revealOnScroll);

class TestimonialSlider {
  constructor(selector = '.testimonial', interval = 4000) {
    this.testimonials = document.querySelectorAll(selector);
    this.total = this.testimonials.length;
    this.currentIndex = 0;
    this.interval = interval;
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

document.addEventListener("DOMContentLoaded", () => {
  const slider = new TestimonialSlider();
  slider.start();

  window.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      slider.stop();
    } else {
      slider.start();
    }
  });
});

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
document.addEventListener("DOMContentLoaded", () => {
  new BackToTop();
});

document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = document.querySelectorAll(".nav-item.dropdown");

  dropdowns.forEach(dropdown => {
    dropdown.addEventListener("mouseenter", function () {
      // Đóng các dropdown khác
      dropdowns.forEach(item => {
        if (item !== this) item.classList.remove("open");
      });
      this.classList.add("open");
    });

    dropdown.addEventListener("mouseleave", function () {
      this.classList.remove("open");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("appointment-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Đặt lịch hẹn thành công! Chúng tôi sẽ liên lạc để xác nhận trong 24h.\nCảm ơn bạn đã tin tưởng và lựa chọn dịch vụ của chúng tôi.");
      form.reset();
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
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