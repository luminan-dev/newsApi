const API_KEY = "2671fe7822854d74be2b6a8c2d035721";
const API_URL = `https://newsapi.org/v2/everything`;

const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn')
const fromInput = document.querySelector('#from')
const sort = document.querySelector('#sortBy')
const newsWrapper = document.querySelector('#news-wrapper')

const renderNews = (data) => {
    newsWrapper.innerHTML = ""
    if (!data.length) {
        newsWrapper.innerHTML`<h2>Ma'lumot topilmadi</h2>`
        return;
    }

    data.forEach(news => {
        newsWrapper.innerHTML += `
        <div>
        <img class='card' src= ${news.urlToImage} alt=${news.title}>
        <h2>${news.title}</h2>
        <p>${news.description}</p>
        <a href=${news.url}>Read more</a> 
        </div>
        `
    });
}

const getNews = async () => {
    const query = searchInput.value.trim() || 'tesla';
    const from = fromInput.value.trim() || '2024-09-10';
    const sortBy = sort.value;

    try {
        const response = await axios.get(API_URL, {
            params: {
                q: query,
                from: from,
                sortBy: sortBy,
                apiKey: API_KEY,
                pageSize: 10,
            }
        });
        renderNews(response.data.articles);
    } catch (error) {
        console.log(error);
        newsWrapper.innerHTML = `<h2 class='text-center mt-5' style="color: red">Xatolik yuz berdi!</h2>`
    }
};
searchBtn.addEventListener("click", getNews);
getNews();