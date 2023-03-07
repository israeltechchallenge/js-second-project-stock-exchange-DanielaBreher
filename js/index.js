const marquee = new Marquee(document.querySelector(".marquee"));
const form = new SearchForm(document.querySelector("form"));
const results = new SearchResults(document.getElementById("results"));
form.onSearch((companies, searchValue) => {
  results.renderResults(companies, searchValue);
});
