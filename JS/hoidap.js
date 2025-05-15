document.addEventListener("DOMContentLoaded", function () {
    const qnaForm = document.getElementById("qna-form");
    const qnaList = document.getElementById("qna-list");
    const pagination = document.getElementById("pagination");
    const clearDataBtn = document.getElementById("clear-data-btn");

    let faqs = JSON.parse(localStorage.getItem("faqs")) || [];
    let currentPage = 1;
    const itemsPerPage = 20;

    function saveFaqs() {
        localStorage.setItem("faqs", JSON.stringify(faqs));
    }

    function clearFaqs() {
        faqs = [];
        localStorage.removeItem("faqs");
        currentPage = 1;
        renderFaqs();
    }

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

    function renderFaqs() {
        qnaList.innerHTML = "<h3>Các Câu Hỏi và Trả Lời</h3>";
        clearDataBtn.textContent = `Xóa Dữ Liệu (${faqs.length}/20)`;
        qnaList.appendChild(clearDataBtn);

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedFaqs = faqs.slice(startIndex, endIndex);

        paginatedFaqs.forEach((faq) => {
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

        renderPagination();
    }

    function renderPagination() {
        pagination.innerHTML = "";
        const totalPages = Math.ceil(faqs.length / itemsPerPage);
       // if (totalPages <= 1) return;

        const prevBtn = document.createElement("button");
        prevBtn.textContent = "Trang trước";
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener("click", function () {
            if (currentPage > 1) {
                currentPage--;
                renderFaqs();
            }
        });
        pagination.appendChild(prevBtn);

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            btn.className = i === currentPage ? "active-page" : "";
            btn.addEventListener("click", function () {
                currentPage = i;
                renderFaqs();
            });
            pagination.appendChild(btn);
        }

        const nextBtn = document.createElement("button");
        nextBtn.textContent = "Trang sau";
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener("click", function () {
            if (currentPage < totalPages) {
                currentPage++;
                renderFaqs();
            }
        });
        pagination.appendChild(nextBtn);
    }

    qnaForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("qna-name").value.trim();
        const question = document.getElementById("qna-question").value.trim();

        if (name && question) {
            faqs.unshift({ name, question, answer: "" });

            if (faqs.length >20) {
                faqs = faqs.slice(0,20);
            }

            saveFaqs();
            currentPage = 1; // Quay về trang đầu
            renderFaqs();
            qnaForm.reset();
        }
    });

    renderFaqs();
});
