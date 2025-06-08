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
    let lastScrollTop = 0;

    function revealOnScroll() {
        const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
        const isScrollingDown = currentScrollTop > lastScrollTop;

        document.querySelectorAll(".reveal").forEach(el => {
            if (!el.classList.contains("active") && isScrollingDown) {
                const windowHeight = window.innerHeight;
                const elementTop = el.getBoundingClientRect().top;
                const revealPoint = 100;

                if (elementTop < windowHeight - revealPoint) {
                    el.classList.add("active");
                }
            }
        });

        lastScrollTop = currentScrollTop;
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

    // NEW: Banner Carousel
    class BannerCarousel {
        constructor(selector = '.banner', interval = 5000) {
            this.banner = document.querySelector(selector);
            this.images = this.banner.querySelectorAll('img');
            this.total = this.images.length;
            this.currentIndex = 0;
            this.interval = interval;
            this.intervalId = null;
        }

        showImage(index) {
            this.images.forEach(img => img.style.opacity = '0');
            this.images[index].style.opacity = '1';
        }

        nextImage() {
            this.currentIndex = (this.currentIndex + 1) % this.total;
            this.showImage(this.currentIndex);
        }

        start() {
            if (this.total > 0) {
                this.showImage(this.currentIndex);
                this.intervalId = setInterval(() => this.nextImage(), this.interval);
            }
        }

        stop() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
        }
    }

    const bannerCarousel = new BannerCarousel();
    bannerCarousel.start();

    window.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            bannerCarousel.stop();
        } else {
            bannerCarousel.start();
        }
    });
   $(document).ready(function() {
    // Xử lý click vào toàn bộ ô bác sĩ
    $('.doctor-card').on('click', function() {
        const doctorId = $(this).data('doctor');
        let info = {};

        // Dữ liệu giới thiệu
        const doctorData = {
            'a': {
                name: 'BS. Nguyễn Văn A',
                specialty: 'Chuyên gia Implant',
                bio: 'Bác sĩ Nguyễn Văn A có hơn 15 năm kinh nghiệm trong lĩnh vực cấy ghép Implant, từng học tập và làm việc tại các bệnh viện hàng đầu.'
            },
            'b': {
                name: 'BS. Trần Thị B',
                specialty: 'Niềng răng - Chỉnh nha',
                bio: 'Bác sĩ Trần Thị B chuyên sâu về chỉnh nha, với hàng trăm ca niềng răng thành công, tốt nghiệp từ Đại học Y Hà Nội.'
            },
            'c': {
                name: 'BS. Lê Văn C',
                specialty: 'Thẩm mỹ răng sứ',
                bio: 'Bác sĩ Lê Văn C nổi tiếng với kỹ thuật thẩm mỹ răng sứ, mang lại nụ cười hoàn hảo cho hàng ngàn khách hàng.'
            },
            'd': {
                name: 'BS. Phạm Thị D',
                specialty: 'Điều trị tủy',
                bio: 'Bác sĩ Phạm Thị D có chuyên môn cao trong điều trị tủy, với hơn 10 năm kinh nghiệm tại các phòng khám uy tín.'
            },
            'e': {
                name: 'BS. Hoàng Văn E',
                specialty: 'Phục hình răng',
                bio: 'Bác sĩ Hoàng Văn E chuyên về phục hình răng, đảm bảo phục hồi chức năng và thẩm mỹ tối ưu.'
            },
            'f': {
                name: 'BS. Nguyễn Thị F',
                specialty: 'Cấy ghép răng',
                bio: 'Bác sĩ Nguyễn Thị F có kỹ năng xuất sắc trong cấy ghép răng, với chứng chỉ quốc tế.'
            },
            'g': {
                name: 'BS. Trần Văn G',
                specialty: 'Chăm sóc răng trẻ em',
                bio: 'Bác sĩ Trần Văn G chuyên chăm sóc sức khỏe răng miệng cho trẻ em, với phương pháp nhẹ nhàng và an toàn.'
            }
        };

        info = doctorData[doctorId];

        // Cập nhật nội dung modal
        $('.info-avatar').attr('src', $(this).find('img').attr('src'));
        $('.info-name').text(info.name);
        $('.info-specialty').text(info.specialty);
        $('.info-bio').text(info.bio);

        // Hiển thị modal
        $('.doctor-info').fadeIn();
    });

    // Đóng modal khi click vào nút close
    $('.close-btn').on('click', function() {
        $('.doctor-info').fadeOut();
    });

    // Đóng modal khi click ngoài modal
    $(document).on('click', function(e) {
        if ($(e.target).is('.doctor-info')) {
            $('.doctor-info').fadeOut();
        }
    });
});
    window.addEventListener("load", function () {
    const content = document.querySelector('.promo-content');
    const promoCircle = document.querySelector('.promo-circle');

    // Hiện bong bóng sau khi load
    setTimeout(() => {
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
    }, 500);

    // Ẩn bong bóng sau 7 giây
    setTimeout(() => {
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
    }, 7500);

    // Khi click vào hình tròn, hiển thị lại nội dung
    promoCircle.addEventListener('click', () => {
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
        
        // Tự động ẩn sau vài giây (tuỳ bạn chỉnh)
        setTimeout(() => {
            content.style.opacity = '0';
            content.style.transform = 'translateY(20px)';
        }, 5000);
    });
});
    // Hiển thị thông báo giả lập
    const names = [
        "Nguyễn Văn A", "Trần Thị B", "Lê Văn C", "Phạm Thị D", 
        "Đỗ Minh E", "Vũ Thị F", "Hoàng Văn G", "Bùi Thị H"
    ];

    const services = [
        "Niềng răng", "Bọc răng sứ", "Dán sứ Veneer", "Trồng răng Implant",
        "Tẩy trắng răng", "Hàn/trám răng", "Nhổ răng", "Lấy cao răng",
        "Tư vấn miễn phí"
    ];

    function getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function showFakeNotification() {
        const name = getRandomElement(names);
        const service = getRandomElement(services);
        const message = `Khách hàng <strong>${name}</strong> vừa đặt lịch dịch vụ <strong>${service}</strong>!`;

        const notification = document.getElementById('fake-notification');
        const messageContainer = document.getElementById('fake-message');

        messageContainer.innerHTML = message;
        notification.style.display = 'block';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 6000);
    }

    // Hiển thị lần đầu sau 3s
    setTimeout(showFakeNotification, 3000);

    // Lặp lại mỗi 20s
    setInterval(showFakeNotification, 20000);

    // Chatbox Functionality
    const chatToggleBtn = document.querySelector('.chatbox-toggle');
    const chatBody = document.querySelector('.chatbox-body');
    const chatInput = document.querySelector('.chat-input');

    const responses = {
        "chào": "Chào bạn! Nha Khoa Smile rất hân hạnh được hỗ trợ.",
        "giá": "Bạn muốn hỏi giá dịch vụ nào ạ? Bạn có thể xem bảng giá trong menu.",
        "implant": "Dịch vụ cấy ghép Implant hiện đang được ưu đãi tới 20%.",
        "niềng": "Niềng răng tại phòng khám được thực hiện bởi bác sĩ chuyên sâu.",
        "cảm ơn": "Rất vui được hỗ trợ bạn!"
    };

    // Ẩn chat body ban đầu
    chatBody.style.display = 'none';
    chatToggleBtn.textContent = '+';

    // Toggle chat body khi click
    chatToggleBtn.addEventListener('click', () => {
        const isVisible = chatBody.style.display === 'block';
        chatBody.style.display = isVisible ? 'none' : 'block';
        chatToggleBtn.textContent = isVisible ? '+' : '−';
    });

    // Chat trả lời đơn giản
    chatInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && chatInput.value.trim() !== '') {
        const message = chatInput.value.trim();
        addMessage(message, 'user');

        const lower = message.toLowerCase();
        let reply = "Xin lỗi, mình chưa hiểu ý bạn. Bạn có thể hỏi về dịch vụ, giá, đặt lịch,...";

        for (let keyword in responses) {
            if (lower.includes(keyword)) {
            reply = responses[keyword];
            break;
            }
        }

        setTimeout(() => addMessage(reply, 'bot'), 500);
        chatInput.value = '';
        }
    });

    function addMessage(text, sender = 'user') {
        const msg = document.createElement('div');
        msg.className = 'chat-message ' + sender;
        msg.textContent = text;
        chatBody.insertBefore(msg, chatInput); // thêm trước input
        chatBody.scrollTop = chatBody.scrollHeight;
    }
});