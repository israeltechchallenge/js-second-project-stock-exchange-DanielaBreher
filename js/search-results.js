class SearchResults {
  constructor(searchListElement) {
    this.searchListElement = searchListElement;
  }

  renderResults(companies) {
    for (const company of companies) {
      this.renderSearchResultItem(company);
    }
  }

  renderSearchResultItem(companyData) {
    const {
      companyName,
      image: imageUrl,
      changesPercentage,
    } = companyData.profile;
    const symbol = companyData.symbol;

    const listElement = document.createElement("li");
    listElement.classList.add("search-result-item");
    const imageElement = document.createElement("img");
    const linkElement = document.createElement("a");
    const textElement = document.createElement("span");

    linkElement.textContent = companyName;
    linkElement.setAttribute("href", `company.html?symbol=${symbol}`);
    imageElement.setAttribute("src", `${imageUrl}`);
    const sign = Number(changesPercentage) > 0 ? "positive" : "negative";
    textElement.innerHTML = `(${symbol}) (<span class="${sign}">${Number(
      changesPercentage
    ).toFixed(2)}%</span>)`;

    listElement.append(imageElement, linkElement, textElement);
    this.searchListElement.appendChild(listElement);
  }
}
