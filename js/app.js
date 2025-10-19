const API_KEY = "2671fe7822854d74be2b6a8c2d035721";

const searchInput = document.querySelector("#search-input");
const dateInput = document.querySelector("#date-input");
const searchBtn = document.querySelector("#search-btn");
const cardWrapper = document.querySelector("#card-wrapper");

const getNews = async () => {
    let searchInputValue = searchInput.value.trim(); // Qiymatni tozalash
    if (!searchInputValue) {
        searchInputValue = "tesla"; // Bo'sh bo'lsa, standart qiymat
    }
    let dateInputValue = dateInput.value;
    if (!dateInputValue) {
        dateInputValue = "2025-09-19"; // Bo'sh bo'lsa, standart sana
    }
    let API_URL = `https://newsapi.org/v2/everything?q=${searchInputValue}&from=${dateInputValue}`;

    try {
        const response = await axios.get(API_URL, {
            headers: {
                "x-api-key": API_KEY,
            },
        });

        const data = response.data.articles || []; // Agar articles undefined bo'lsa, bo'sh massiv

        cardWrapper.innerHTML = ""; // Oldingi kartalarni tozalash

        data.forEach((item) => {
            cardWrapper.innerHTML += `
            <div class="card mt-5" style="width: 18rem">
                <img src="${item.urlToImage}" class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">
                        ${item.description}
                    </p>
                    <a href="${item.url}" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
            `;
        });
    } catch (error) {
        console.error("API so'rovida xato:", error);
        cardWrapper.innerHTML = "<p>Xato yuz berdi. Iltimos, keyinroq urinib ko'ring.</p>";
    }
};

// Tugma hodisasini tashqariga ko'chirish va funksionallik qo'shish
searchBtn.addEventListener("click", () => {
    getNews();
});

// Sahifa yuklanganda avtomatik chaqirish
getNews();