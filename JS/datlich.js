document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementsByClassName("form-group submit");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Đặt lịch khám thành công! Chúng tôi sẽ liên lạc để xác nhận lịch hẹn trong 24h. \nCảm ơn bạn đã sử dụng dịch vụ của Nha Khoa Smile.");
      form.reset();
    });
  });