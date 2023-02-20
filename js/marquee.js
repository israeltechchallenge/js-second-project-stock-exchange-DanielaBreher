const marqueeURL = baseURL + "stock/list";
const marqueeElements = document.querySelectorAll(".marquee-text p");

function displayMarqueeData(data) {
  marqueeElements.forEach((element) => {
    element.innerHTML = "";
  });
  for (const company of data) {
    const symbol = company.symbol;
    const price = company.price;
    const html = `<span class="marquee-item">${symbol} ${price}</span>`;
    //const el = document.createElement("span");
    //el.textContent = symbol;
    marqueeElements.forEach((element) => {
      element.innerHTML += html;
      //element.appendChild(el);
    });
  }
}

async function getMarqueeData() {
  const response = await fetch(marqueeURL);
  const data = await response.json();
  return data;
}

async function init() {
  const data = (await getMarqueeData()).slice(0, 30);
  displayMarqueeData(data);
}

init();
