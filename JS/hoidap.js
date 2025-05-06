document.addEventListener("DOMContentLoaded", function () {
    const qnaForm = document.getElementById("qna-form");
    const qnaList = document.getElementById("qna-list");
    const pagination = document.getElementById("pagination");
    const clearDataBtn = document.getElementById("clear-data-btn");

    // Load existing questions from localStorage or initialize empty array
    let faqs = JSON.parse(localStorage.getItem("faqs")) || [];
    let currentPage = 1;
    const itemsPerPage = 50;

    // Save FAQs to localStorage
    function saveFaqs() {
        localStorage.setItem("faqs", JSON.stringify(faqs));
    }

    // Clear all FAQs from localStorage
    function clearFaqs() {
        faqs = [];
        localStorage.removeItem("faqs");
        currentPage = 1;
        renderFaqs();
    }

    // Add event listener for clear data button with password prompt
    clearDataBtn.addEventListener("click", function () {
        const password = prompt("Nhập mật khẩu để xóa dữ liệu:");
        if (password === "123456") {
            if (confirm("Bạn có chắc chắn muốn xóa toàn bộ dữ liệu?")) {
                clearFaqs();
            }
        } else {
            alert("Mật khẩu không đúng!");
        }
    });
    if (name && question) {
        faqs.unshift({ name, question, answer: "" }); // Thêm ở đầu mảng
    
        if (faqs.length > 50) {
            faqs = faqs.slice(0, 50); // Giới hạn 50 câu
        }
    
        saveFaqs();
        qnaForm.reset(); // ✅ Clear form ngay sau khi lưu
        currentPage = 1; // ✅ Quay về trang đầu để xem câu mới nhất
        renderFaqs();
    }
    
    // Render FAQs for the current page
    function renderFaqs() {
        qnaList.innerHTML = "<h3>Các Câu Hỏi và Trả Lời</h3>";
        clearDataBtn.textContent = `Xóa Dữ Liệu (${faqs.length}/50)`; // ✅ cập nhật số câu
        qnaList.appendChild(clearDataBtn);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedFaqs = faqs.slice(startIndex, endIndex); // Reverse to show newest first

        paginatedFaqs.forEach((faq, index) => {
            const div = document.createElement("div");
            div.className = "qna-item";

            const q = document.createElement("div");
            q.className = "question";
            q.textContent = `${faq.name}: ${faq.question}`;
            div.appendChild(q);

            const a = document.createElement("div");
            a.className = "answer";
            a.textContent = faq.answer ? `Trả lời: ${faq.answer}` : "Chưa có trả lời";
            div.appendChild(a);

            if (!faq.answer) {
                const btn = document.createElement("button");
                btn.textContent = "Trả lời";
                btn.onclick = () => {
                    const password = prompt("Nhập mật khẩu để trả lời:");
                    if (password === "123456") {
                        const answer = prompt("Nhập câu trả lời:");
                        if (answer) {
                            faq.answer = answer;
                            saveFaqs();
                            renderFaqs();
                        }
                    } else {
                        alert("Mật khẩu không đúng!");
                    }
                };
                div.appendChild(btn);
            }

            qnaList.appendChild(div);
        });

        // Render pagination controls
        renderPagination();
    }

    // Handle form submission
    qnaForm.addEventListener("submit", function (e) {
        e.preventDefault();
    
        const name = document.getElementById("qna-name").value.trim();
        const question = document.getElementById("qna-question").value.trim();
    
        if (name && question) {
            faqs.unshift({ name, question, answer: "" }); // Thêm ở đầu mảng
    
            // 🔥 Giới hạn tối đa 50 câu
            if (faqs.length > 50) {
                faqs = faqs.slice(0, 50); // Cắt chỉ giữ lại 50 câu mới nhất
            }
    
            saveFaqs();
            const totalPages = Math.ceil(faqs.length / itemsPerPage);
            if (faqs.length % itemsPerPage === 1 && currentPage === totalPages - 1) {
                currentPage = totalPages;
            }
            renderFaqs();
            qnaForm.reset();
        }
        form.reset();
    });    

    // Initial render
    renderFaqs();
});