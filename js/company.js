const baseURL =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/";
const companyContainer = document.getElementById("company-data");

function getUrlParameter(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

async function getCompanyData(companyURL) {
  try {
    const response = await fetch(companyURL);
    const companyData = await response.json();
    const {
      companyName,
      address,
      city,
      state,
      country,
      image,
      website,
      price,
      description,
      range,
      changes,
      changesPercentage,
      currency,
      ceo,
    } = companyData.profile;

    console.log(companyData);

    const isChangePositive = Number(changesPercentage) > 0;

    const companyItem = document.createElement("div");
    companyItem.innerHTML = `
          <h2>${companyName}</h2>
          <p>Stock Price: ${price} ${currency}</p>
          <p>Range: ${range} ${currency}</p>
          <p>Changes: <span class=${
            isChangePositive ? "positive" : "negative"
          }>${changes} (${changesPercentage}%) </span></p>
          <img src="${image}" alt="${companyName}" />
          <p>Website: <a href="${website}">${website}</a></p>
          <p>Address: ${address}, ${city}, ${state}, ${country}</p>
          <p>CEO: ${ceo}</p>
          <p>Description: ${description}</p>
        `;

    companyContainer.appendChild(companyItem);
  } catch (error) {
    console.log(error);
  }
}
const symbol = getUrlParameter("symbol");
const companyURL = baseURL + `company/profile/${symbol}`;

getCompanyData(companyURL);
