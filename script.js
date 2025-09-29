/*
=======================================
📘 JavaScript & Web APIs Lab
All tasks in one file (script.js)
=======================================
*/

/*  
=======================================
TODO1: Welcome Board
---------------------------------------
When the page loads, display a welcome message 
inside the <p> element with id="t1-msg".

✅ Task:
- Select the element with id "t1-msg".
- Change its text to "Hello, World!".

💡 Hint:
document.getElementById("t1-msg").innerHTML = "Hello, World!";
*/
window.addEventListener("DOMContentLoaded", function () {
  const msg = document.getElementById("t1-msg");
  if (msg) {
    msg.textContent = "Hello, World!";
  }
});
/*  
=======================================
TODO2: Interaction Corner
---------------------------------------
There is a button with id="t2-btn".
When the button is clicked, change the text inside 
the <p> with id="t2-status" to:
    "You clicked the button!"

✅ Task:
- Get the button element.
- Add a click event listener.
- Inside the event, change the text of the status paragraph.

💡 Hint:
button.addEventListener("click", function () {
    // change text here
});
*/
  const btn2 = document.getElementById("t2-btn");
  const status = document.getElementById("t2-status");
  btn2.addEventListener("click", () => {
  status.textContent = "You clicked the button!";
  });
/*  
=======================================
TODO3: Inspiring Quote Board
---------------------------------------
Use the Quotable API to display a random quote.

🌍 API Link:
https://dummyjson.com/quotes/random

✅ Task:
- When the button with id="t3-loadQuote" is clicked:
    - Fetch a random quote from the API.
    - Display the quote text inside the <p> with id="t3-quote".
    - Display the author inside the <p> with id="t3-author".

💡 Hint:
The API returns JSON like:
{
  "content": "Do not watch the clock. Do what it does. Keep going.",
  "author": "Sam Levenson"
}

Use:
data.content   // the quote text
data.author    // the author
*/
const btn3 = document.getElementById("t3-loadQuote");
if (btn3) {
  btn3.addEventListener("click", async function () {
    try {
      const res = await fetch("https://dummyjson.com/quotes/random");
      const data = await res.json();

      const quote = document.getElementById("t3-quote");
      const author = document.getElementById("t3-author");

      if (quote) quote.innerHTML = `"${data.quote || data.content}"`;
      if (author) author.innerHTML = `— ${data.author}`;
    } catch (err) {
      console.error("Error fetching quote:", err);
    }
  });
}
    
/*  
=======================================
TODO4: Dammam Weather Now
---------------------------------------
Use the OpenWeatherMap API to display live weather data.

🌍 API Link:
https://api.openweathermap.org/data/2.5/weather?q=Dammam&appid=API_KEY=metric

⚠️ Replace YOUR_API_KEY with your actual API key from:
https://openweathermap.org/api

✅ Task:
- When the button with id="t4-loadWx" is clicked:
    - Fetch current weather data for Dammam.
    - Show temperature in the element with id="t4-temp".
    - Show humidity in the element with id="t4-hum".
    - Show wind speed in the element with id="t4-wind".

💡 Hint:
data.main.temp      → temperature (°C)
data.main.humidity  → humidity (%)
data.wind.speed     → wind speed (m/s)
*/
const btn4 = document.getElementById("t4-loadWx");
  const t4err = document.getElementById("t4-err");
  if (btn4) {
    btn4.addEventListener("click", async () => {
      const apiKey = "9c29da5738fd8cdd561179419142d7";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Dammam&units=metric&appid=${apiKey}`;
      const tempEl = document.getElementById("t4-temp");
      const humEl = document.getElementById("t4-hum");
      const windEl = document.getElementById("t4-wind");

      btn4.disabled = true;
      const originalText = btn4.textContent;
      btn4.textContent = "Checking…";
      if (t4err) t4err.textContent = "";

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
        const data = await res.json();
        if (tempEl) tempEl.textContent = `${data.main?.temp ?? "N/A"} °C`;
        if (humEl) humEl.textContent  = `${data.main?.humidity ?? "N/A"}%`;
        if (windEl) windEl.textContent = `${data.wind?.speed ?? "N/A"} m/s`;
      } catch (err) {
        console.error("Weather fetch error:", err);
        if (t4err) t4err.textContent = "Could not load weather. Check console and your API key.";
        if (tempEl) tempEl.textContent = "—";
        if (humEl) humEl.textContent = "—";
        if (windEl) windEl.textContent = "—";
      } finally {
        btn4.disabled = false;
        btn4.textContent = originalText;
      }
    });
  } else {
    console.warn("t4-loadWx not found");
  }
});
