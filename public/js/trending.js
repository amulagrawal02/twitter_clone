console.log("it working");
const api_key = "6fc0a46baebe4e13aa956724484292b0";
let data;
async function loadNews() {
  if ($(".trending").width() < 325) {
    $(".trending").empty();
  } else {
    data = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=${api_key}`
    );
    data = data.data.articles;
    //   console.log(data.data.articles);
    for (let i = 0; i < 3; i++) {
      const Html = await newsHtml(data[i]);
      $(".trending").append(`<li>${Html}</li>`);
    }
  }
}
loadNews();

console.log($(".trending").width());

function trimHeadline(headline) {
  if (headline.length > 50) {
    return headline.substr(0, 50) + "  ...";
  } else {
    return headline;
  }
}

async function newsHtml(newsData) {
  return ` 
  <div class = "headline">
    <div class="main-text">
    <span> ${newsData.source.name}</span>
        <span class = "fw-bold">${trimHeadline(newsData.title)}</span>
    </div>
    <div class="main-photo">
    <img src = ${newsData.urlToImage}>
    </div>
  </div>
  
    `;
}
