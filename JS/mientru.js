document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".accordion-toggle");

  toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const content = toggle.nextElementSibling;

      // Nếu đang mở thì đóng lại
      const isOpen = toggle.classList.contains("active");

      // Đóng tất cả
      toggles.forEach(other => {
        other.classList.remove("active");
        const otherContent = other.nextElementSibling;
        if (otherContent && otherContent.classList.contains("accordion-content")) {
          otherContent.classList.remove("open");
        }
      });

      // Mở lại nếu chưa mở
      if (!isOpen) {
        toggle.classList.add("active");
        content.classList.add("open");
      }
    });
  });
});
