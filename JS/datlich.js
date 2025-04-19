document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".appointment-form form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Đặt lịch hẹn thành công! Chúng tôi sẽ liên lạc để xác nhận lịch hẹn trong 24h. \nCảm ơn bạn đã sử dụng dịch vụ của Nha Khoa Smile.");
        form.reset();
    });
});

class BackToTop {
  constructor() {
    this.button = document.getElementById('back-to-top');
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => {
      this.button.style.display = 
        (document.documentElement.scrollTop > 200) ? 'flex' : 'none';
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

// Xử lý menu thả xuống
document.addEventListener("DOMContentLoaded", function () {
  new BackToTop();

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
