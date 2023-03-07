class Marquee {
  constructor(container) {
    this.container = container;
    this.dataUrl = baseURL + "stock/list";
    container.innerHTML = `<div class="marquee-text">
    <p></p>
    <p aria-hidden="true"></p>
  </div>

  <div aria-hidden="true" class="marquee-text">
    <p></p>
    <p></p>
  </div>`;
    this.init();
  }

  async init() {
    const data = (await this.getMarqueeData()).slice(0, 30);
    this.displayMarqueeData(data);
  }

  async getMarqueeData() {
    const response = await fetch(this.dataUrl);
    const data = await response.json();
    return data;
  }

  displayMarqueeData(data) {
    const marqueeElements = document.querySelectorAll(".marquee-text p");

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
}
