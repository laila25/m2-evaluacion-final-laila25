"use strict";

const textSearch = document.querySelector(".text");
const btnSearch = document.querySelector(".search-btn");
const list = document.querySelector(".list");

let info = [];

function getDataFromServer(ev) {
  ev.preventDefault();
  fetch(`http://api.tvmaze.com/search/shows?q=${textSearch.value}`)
    .then(response => response.json())
    .then(data => {
      info = data;
      paintData(info);
    });
}
function paintData() {
  list.innerHTML = "";
  for (let i = 0; i < info.length; i++) {
    let imgSrc;
    if (info[i].show.image === null) {
      imgSrc = `https://via.placeholder.com/210x295/ffffff/666666/?text=${
        info[i].show.name
      }`;
    } else {
      imgSrc = info[i].show.image.medium;
    }
    list.innerHTML += `<li class="itemList" ><img src="${imgSrc}" alt="${
      info[i].show.name
    }">
      <p>${info[i].show.name}</p>
</li>`;
  }
}

btnSearch.addEventListener("click", getDataFromServer);
