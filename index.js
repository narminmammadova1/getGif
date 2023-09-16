const searchInput = document.getElementById("searchInput");
const gifContainer = document.getElementById("gifContainer");
const apiKey = "IUyqcq9JfnOFV5W1uI0plzV0jEf9IHPQ";
const url = `https://api.giphy.com/v1/stickers/trending?api_key=${apiKey}`;
const searchButton = document.getElementById("searchButton");
// async function getData() {
//   try {
//     const response = await fetch(url, {
//       method: "GET",
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.log("error", error);
//   }
// }

async function searchGifs() {
  try {
    showLoadingIndicator();

    const searchTerm = searchInput.value;
    const url = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}`;

    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    gifContainer.innerHTML = "";

    const gifElements = data.data.map((gif) => {
      const img = document.createElement("img");
      img.src = gif.images.fixed_height.url;
      return img;
    });

    gifElements.forEach((element) => {
      gifContainer.appendChild(element);
    });
    searchInput.value = "";
    hideLoadingIndicator();
  } catch (error) {
    console.log("error", error);
  }
}

searchButton.addEventListener("click", searchGifs);
// ........................................................
const loadingIndicator = document.getElementById("loadingIndicator");

function showLoadingIndicator() {
  loadingIndicator.style.display = "block";
}

function hideLoadingIndicator() {
  loadingIndicator.style.display = "none";
}
searchInput.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
      searchGifs();
    }
  });
searchGifs()
