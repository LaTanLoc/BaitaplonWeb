// Testimonial Slider
class TestimonialSlider {
  constructor(selector, interval = 4000) {
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
    this.showTestimonial(this.currentIndex);
    setInterval(() => this.nextTestimonial(), this.interval);
  }
}

// Khởi động khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  const slider = new TestimonialSlider('.testimonial');
  slider.start();
});

  
  
  // Back to Top Button
  class BackToTop {
    constructor() {
      this.button = document.getElementById('back-to-top');
      this.init();
    }
  
    init() {
      window.addEventListener('scroll', () => {
        this.button.style.display = 
          (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) 
          ? 'flex' 
          : 'none';
      });
  
      this.button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  
      this.button.addEventListener('mouseover', () => {
        this.button.style.backgroundColor = 'var(--hover-color)';
      });
  
      this.button.addEventListener('mouseout', () => {
        this.button.style.backgroundColor = 'var(--main-color)';
      });
    }
  }
  
  // Initialize components
  document.addEventListener('DOMContentLoaded', () => {
    new TestimonialSlider();
    new BackToTop();
  });

  document.addEventListener("DOMContentLoaded", function () {
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  
    dropdownToggles.forEach((toggle) => {
      toggle.addEventListener("click", function (e) {
        e.preventDefault();
        const parent = this.closest(".dropdown");
  
        // Đóng tất cả dropdown khác
        document.querySelectorAll(".nav-item.dropdown").forEach((item) => {
          if (item !== parent) item.classList.remove("open");
        });
  
        // Mở dropdown hiện tại
        parent.classList.toggle("open");
      });
    });
  
    // Đóng khi click ra ngoài
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".nav-item.dropdown")) {
        document.querySelectorAll(".nav-item.dropdown").forEach((item) =>
          item.classList.remove("open")
        );
      }
    });
  });
  