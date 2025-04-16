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