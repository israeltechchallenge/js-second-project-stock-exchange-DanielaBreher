const spinner = document.getElementById("spinner");

function debounce(func, interval) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, interval || 200);
  };
}

class SearchForm {
  constructor(formElement) {
    this.formElement = formElement;
    this.input = this.formElement.querySelector("#user-input");
    this.setListener();
  }

  setListener() {
    this.input.addEventListener(
      "input",
      debounce((event) => {
        event.preventDefault();
        document.getElementById("results").innerHTML = "";
        spinner.classList.remove("transparent");
        this.getSearchData();
      }, 1000)
    );
  }

  getSearchData = async () => {
    try {
      const URLlimit =
        baseURL + `search?query=${this.input.value}&limit=10&exchange=NASDAQ`;
      const response = await fetch(URLlimit);
      const searchResults = await response.json(); //arr with search matches

      if (searchResults.length === 0) {
        spinner.classList.add("transparent");
        searchList.innerText = "No results found";
        return;
      }

      const promises = [];
      for (const company of searchResults) {
        const { symbol } = company;
        promises.push(this.getMoreSearchData(symbol));
      }
      try {
        const companies = await Promise.all(promises);
        if (this.onSearchFinish) {
          this.onSearchFinish(companies, this.input.value);
        }
      } catch (e) {
        // do something about the error
      } finally {
        spinner.classList.add("transparent");
      }
    } catch (error) {
      console.log(error);
    }
  };

  async getMoreSearchData(symbol) {
    try {
      const response = await fetch(baseURL + `company/profile/${symbol}`);
      const companyData = await response.json();

      return companyData;
    } catch (error) {
      console.log(error);
    }
  }

  onSearch(fn) {
    this.onSearchFinish = fn;
  }
}
