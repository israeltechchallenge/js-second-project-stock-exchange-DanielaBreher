const input = document.getElementById("user-input");
const searchButton = document.getElementById("search-button");
const searchList = document.getElementById("search-list");
const spinner = document.getElementById("spinner");

const baseURL =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/";

function getSearchURL(input) {
  const URLlimit = `search?query=${input.value}&limit=10&exchange=NASDAQ`;
  return baseURL + URLlimit;
}

// click - > get data from input > search for matches -> get more data about the matches > show company list

searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  searchList.innerHTML = "";
  spinner.classList.remove("visually-hidden");
  getSearchData();
});

async function getSearchData() {
  try {
    const response = await fetch(getSearchURL(input));
    const searchResults = await response.json(); //arr with search matches
    console.log(searchResults);

    const promises = [];
    for (const company of searchResults) {
      const { symbol } = company;
      promises.push(getMoreSearchData(symbol));
      //await getMoreSearchData(symbol);
    }
    //spinner.classList.add("visually-hidden");

    try {
      // finished once all the promises in the given array
      // are fulfilled
      //await Promise.all(promises);

      await Promise.race(promises);
    } catch (e) {
      // do something about the error
    } finally {
      spinner.classList.add("visually-hidden");
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 *
 */
async function getMoreSearchData(symbol) {
  try {
    const response = await fetch(baseURL + `company/profile/${symbol}`);
    const companyData = await response.json();
    console.log(companyData);

    renderSearchResultItem(companyData);
  } catch (error) {
    console.log(error);
  }
}

function renderSearchResultItem(companyData) {
  const {
    companyName,
    image: imageUrl,
    changesPercentage,
  } = companyData.profile;
  const symbol = companyData.symbol;

  const listElement = document.createElement("li");
  const imageElement = document.createElement("img");
  const linkElement = document.createElement("a");
  const textElement = document.createElement("p");

  linkElement.textContent = companyName;
  linkElement.setAttribute("href", `company.html?symbol=${symbol}`);
  imageElement.setAttribute("src", `${imageUrl}`);
  //textElement.textContent = `${symbol} (${changesPercentage} %)`;

  listElement.append(imageElement, linkElement, textElement);
  searchList.appendChild(listElement);
}
