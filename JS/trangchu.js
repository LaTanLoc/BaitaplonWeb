 // Chuyển động của phản hồi khách hàng 
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

  document.addEventListener("DOMContentLoaded", () => {
    const slider = new TestimonialSlider('.testimonial');
    slider.start();
  });

    // Nút quay lên đầu trang
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
  //Menu thả xuống
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

          document.querySelectorAll(".nav-item.dropdown").forEach((item) => {
            if (item !== parent) item.classList.remove("open");
          });
          parent.classList.toggle("open");
        });
      });

      document.addEventListener("click", function (e) {
        if (!e.target.closest(".nav-item.dropdown")) {
          document.querySelectorAll(".nav-item.dropdown").forEach((item) =>
            item.classList.remove("open")
          );
        }
      });
    });
  //Thông báo gửi thành công
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("appointment-form");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Đặt lịch hẹn thành công! Chúng tôi sẽ liên lạc để xác nhận lịch hẹn trong 24h. \nCảm ơn bạn đã sử dụng dịch vụ của Nha Khoa Smile.");
      form.reset();
    });
  });
  //Thẻ nav di chuyển khi cuộn trang
  document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.navbar'); //
    const navOffset = nav.offsetTop;

    function handleScroll() {
      if (window.scrollY >= navOffset) {
        nav.classList.add('sticky');
      } else {
        nav.classList.remove('sticky');
      }
    }

    window.addEventListener('scroll', handleScroll);
  });
