const stockHistoryURL =
  baseURL + `historical-price-full/${symbol}?serietype=line`;

async function getHistoricalData() {
  const response = await fetch(stockHistoryURL);
  const { historical } = await response.json();
  console.log({ historical });
  const labels = [];
  const values = [];
  for (i = 0; i < historical.length; i++) {
    labels.push(historical[i].date);
    values.push(historical[i].close);
  }
  console.log({ labels, values });

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
