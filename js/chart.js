const stockHistoryURL =
  baseURL + `historical-price-full/${symbol}?serietype=line`;

async function getHistoricalData() {
  const response = await fetch(stockHistoryURL);
  console.log(response);
  const data = await response.json();
  console.log(data);
  length = data.historical.length;
  console.log(length);

  labels = [];
  values = [];
  for (i = 0; i < length; i++) {
    labels.push(data.historical[i].date);
    values.push(data.historical[i].close);
  }

  new Chart(document.getElementById("bar-chart"), {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Close",
          data: values,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Stock Price Historical Data",
      },
    },
  });
}

getHistoricalData();
