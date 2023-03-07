class SearchResults {
  constructor(searchListElement) {
    this.searchListElement = searchListElement;
  }

  renderResults(companies, inputValue) {
    for (const company of companies) {
      this.renderSearchResultItem(company, inputValue);
    }
  }

  renderSearchResultItem(companyData, inputValue) {
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
    // aa
    // aA
    // 'bbbb'
    // 'Aa'
    // 'bcc company'
    // <mark>aa</mark>bcc company

    const markedName = markValue(companyName, inputValue);
    linkElement.innerHTML = markedName;

    linkElement.setAttribute("href", `company.html?symbol=${symbol}`);
    imageElement.setAttribute("src", `${imageUrl}`);
    const sign = Number(changesPercentage) > 0 ? "positive" : "negative";

    const markedSymbol = markValue(symbol, inputValue);

    textElement.innerHTML = `(${markedSymbol}) (<span class="${sign}">${Number(
      changesPercentage
    ).toFixed(2)}%</span>)`;

    listElement.append(imageElement, linkElement, textElement);
    this.searchListElement.appendChild(listElement);
  }
}

function markValue(text, inputValue) {
  const startIndex = text.toLowerCase().indexOf(inputValue.toLowerCase());
  if (startIndex === -1) {
    return text;
  }
  const part1 = text.slice(0, startIndex);
  const part2 = text.slice(startIndex, startIndex + inputValue.length);
  const part3 = text.slice(startIndex + inputValue.length);
  const markedText = part1 + "<mark>" + part2 + "</mark>" + part3;
  return markedText;
}
