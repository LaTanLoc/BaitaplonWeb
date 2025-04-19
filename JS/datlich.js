document.addEventListener("DOMContentLoaded", function () {
  // Form submit
  const form = document.querySelector(".appointment-form form");
  form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Đặt lịch hẹn thành công! Chúng tôi sẽ liên lạc để xác nhận lịch hẹn trong 24h. \nCảm ơn bạn đã sử dụng dịch vụ của Nha Khoa Smile");
      form.reset();
  });

  // Dropdown menu
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

  // Back to top button
  const backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
      backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
          top: 0,
          behavior: "smooth"
      });
  });
});
