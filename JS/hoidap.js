document.addEventListener("DOMContentLoaded", function () {
    const qnaForm = document.getElementById("qna-form");
    const qnaList = document.getElementById("qna-list");

    let questions = JSON.parse(localStorage.getItem("qnaData")) || [];

    renderAllQuestions();

    qnaForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("qna-name").value.trim();
        const service = document.getElementById("qna-service").value;
        const questionText = document.getElementById("qna-question").value.trim();

        if (!name || !service || !questionText) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        const timestamp = Date.now();
        const newQuestion = {
            id: timestamp,
            name,
            service,
            question: questionText,
            answer: "",
            timestamp,
            answered: false
        };

        questions.push(newQuestion);
        localStorage.setItem("qnaData", JSON.stringify(questions));
        displayQuestion(newQuestion);

        qnaForm.reset();
    });

    function renderAllQuestions() {
        qnaList.innerHTML = "";
        questions.forEach(displayQuestion);
    }

    function displayQuestion(q) {
        const qnaItem = document.createElement("div");
        qnaItem.classList.add("qna-item");
        qnaItem.setAttribute("data-id", q.id);

        const serviceText = mapServiceToText(q.service);
        const relativeTime = getRelativeTime(q.timestamp);

        qnaItem.innerHTML = `
            <div class="content">
                <span class="meta">${relativeTime}</span>
                <span class="name">${q.name}</span>
                <div class="question">${q.question} (${serviceText})</div>
            </div>
        `;

        if (!q.answered) {
            const replyLink = document.createElement("a");
            replyLink.classList.add("reply-link");
            replyLink.textContent = "Trả lời";
            replyLink.href = "#";

            const replyForm = document.createElement("div");
            replyForm.classList.add("reply-form");
            replyForm.style.display = "none";
            replyForm.innerHTML = `
                <textarea placeholder="Nhập câu trả lời..."></textarea>
                <button class="reply-btn">Trả lời</button>
            `;

            replyLink.addEventListener("click", function (e) {
                e.preventDefault();
                replyForm.style.display = replyForm.style.display === "block" ? "none" : "block";
            });

            replyForm.querySelector(".reply-btn").addEventListener("click", function () {
                const answerText = replyForm.querySelector("textarea").value.trim();
                if (!answerText) {
                    alert("Vui lòng nhập nội dung trả lời.");
                    return;
                }

                q.answer = answerText;
                q.answered = true;

                localStorage.setItem("qnaData", JSON.stringify(questions));
                renderAllQuestions();
            });

            qnaItem.appendChild(replyLink);
            qnaItem.appendChild(replyForm);
        } else {
            displayAnswer(qnaItem, q);
        }

        qnaList.appendChild(qnaItem);
    }

    function displayAnswer(container, q) {
        const answerDiv = document.createElement("div");
        answerDiv.classList.add("answer");
        answerDiv.innerHTML = `
            <span class="name">Nha Khoa Smile</span>
            <div class="text">${q.answer}</div>
        `;
        container.appendChild(answerDiv);
    }

    function mapServiceToText(serviceKey) {
        const serviceMap = {
            "boc-rang-su": "Bọc răng sứ",
            "nieng-rang": "Niềng răng",
            "dan-su-veneer": "Dán sứ Veneer",
            "trong-rang-su": "Trồng răng Implant",
            "han-tram-rang": "Hàn/trám răng",
            "tay-trang": "Tẩy trắng răng",
            "nha-chu": "Điều trị nha chu",
            "nho-rang": "Nhổ răng",
            "lay-cao-rang": "Lấy cao răng",
            "tuvan": "Tư vấn miễn phí"
        };
        return serviceMap[serviceKey] || "Không xác định";
    }

    function getRelativeTime(timestamp) {
        const now = Date.now();
        const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
        if (diffInMinutes < 1) return "Vừa xong";
        if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} giờ trước`;
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays} ngày trước`;
    }
});
