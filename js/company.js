function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const symbol = getUrlParameter("symbol");

const baseURL =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/";

const companyURL = baseURL + `company/profile/${symbol}`;

const companyData = document.getElementById("company-data");

async function getCompanyData() {
  try {
    const response = await fetch(companyURL);
    const data = await response.json();
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
    } = data.profile;

    console.log(data);
    const companyItem = document.createElement("div");
    companyItem.innerHTML = `
          <h2>${companyName}</h2>
          <p>Stock Price: ${price} ${currency}</p>
          <p>Range: ${range} ${currency}</p>
          <p>Changes: ${changes} (${changesPercentage} %)</p>
          <img src="${image}" alt="${companyName}" />
          <p>Website: <a href="${website}">${website}</a></p>
          <p>Address: ${address}, ${city}, ${state}, ${country}</p>
          <p>CEO: ${ceo}</p>
          <p>Description: ${description}</p>
        `;

    companyData.appendChild(companyItem);
  } catch (error) {
    console.log(error);
  }
}

getCompanyData();
