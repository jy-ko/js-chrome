// Unsplash background images
fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=abstract"
)
  .then((res) => res.json())
  .then(
    (data) => (document.body.style.backgroundImage = `url(${data.urls.full})`)
  )
  .catch((err) => {
    console.log("Something went wrong!");
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1548159417-f283998827c1?crop=entropy&amp;cs=tinysrgb&amp;fm=jpg&amp;ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjQ4MzUxODI&amp;ixlib=rb-1.2.1&amp;q=80&quot;)`;
  });

// Crypto
fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
  .then((res) => {
    if (!res.ok) {
      throw Error("Something went wrong");
    }
    return res.json();
  })
  .then((data) => {
    document.getElementById("crypto-top").innerHTML = `
            <img class="crypto-icon" src=${data.image.small} />
            <span class="crypto-code">${data.name}</span>
        `;
    document.getElementById("crypto").innerHTML += `
    <p>Current price in USD: $${data.market_data.current_price.usd}</p>
    `;
  })
  .catch((err) => console.error(err));

// Forex
const BASE_URL = "https://open.er-api.com/v6/latest/";
const BASE_CURRENCY_INPUT = document.getElementById("forex--base");
const QUOTE_CURRENCY_INPUT = document.getElementById("forex--quote");

BASE_CURRENCY_INPUT.addEventListener("change", getExchangeRate);
QUOTE_CURRENCY_INPUT.addEventListener("change", getExchangeRate);

function getExchangeRate() {
  const base = BASE_CURRENCY_INPUT.value;
  const quote = QUOTE_CURRENCY_INPUT.value;
  if (base && quote) {
    fetch(`${BASE_URL}${base}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("Something went wrong");
        }
        return res.json();
      })
      .then((data) => {
        document.getElementById("forex").innerHTML += `
        <p>${base}/${quote}: ${data.rates[quote]}</p>
`;    
      localStorage.setItem('base', base);
      localStorage.setItem('quote', quote);

      })
      .catch((error) => console.log(error));
  }
}

//   Time
function getCurrentTime() {
  const date = new Date();
  document.getElementById("time").textContent = date.toLocaleTimeString(
    "en-us",
    { timeStyle: "short" }
  );
}

setInterval(getCurrentTime, 1000);
