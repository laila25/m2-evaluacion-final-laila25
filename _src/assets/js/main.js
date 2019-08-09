"use strict";

const textSearch = document.querySelector(".js-input");
const btnSearch = document.querySelector(".js-search-btn");
const list = document.querySelector(".js-list");
const listFavourites = document.querySelector(".js-list-favourites");

let info = [];
let itemList = [];
let favourites = [];
let favouritesId = [];
let btnRemove = [];

function getAndPaintData(ev) {
  ev.preventDefault();
  getDataFromServer();
}

function getDataFromServer() {
  fetch(`http://api.tvmaze.com/search/shows?q=${textSearch.value}`)
    .then(response => response.json())
    .then(data => {
      info = data;
      paintData(info);
    });
}

function paintData() {
  list.innerHTML = "";
  for (let listIndex = 0; listIndex < info.length; listIndex++) {
    let imgSrc;
    if (info[listIndex].show.image === null) {
      imgSrc = `https://via.placeholder.com/210x295/ffffff/666666/?text=${
        info[listIndex].show.name
      }`;
    } else {
      imgSrc = info[listIndex].show.image.medium;
    }
    list.innerHTML += `<li class="itemList js-itemList ${addFavouriteClass(
      listIndex
    )}" data-index="${listIndex}" ><img src="${imgSrc}" alt="${
      info[listIndex].show.name
    }">
      <p>${info[listIndex].show.name}</p>
</li>`;
  }
  itemList = document.querySelectorAll(".js-itemList");
  for (const item of itemList) {
    item.addEventListener("click", addToFavourite);
  }
}

function addToFavourite(ev) {
  const itemSelected = ev.currentTarget;
  favourites.push(info[itemSelected.dataset.index]);
  favouritesId.push(info[itemSelected.dataset.index].show.id);
  paintFavourites();
  paintData();
  handleFormData(favourites);
}

function paintFavourites() {
  listFavourites.innerHTML = "";
  debugger;
  for (
    let favouriteIndex = 0;
    favouriteIndex < favourites.length;
    favouriteIndex++
  ) {
    listFavourites.innerHTML += `<li><img class="imglist" src="${
      favourites[favouriteIndex].show.image.medium
    }" alt="">
        <p>${favourites[favouriteIndex].show.name}</p>
        <button class="btn-remove js-btnRemove" data-btnindex="${favouriteIndex}">X</button>
  </li>`;
  }
  btnRemove = document.querySelectorAll(".js-btnRemove");
  console.log(btnRemove);

  for (const btnRemoveItem of btnRemove) {
    btnRemoveItem.addEventListener("click", removeFromFavourites);
  }
}

const addFavouriteClass = listIndex => {
  if (favouritesId.includes(info[listIndex].show.id)) {
    return "favourite";
  } else {
    return "";
  }
};

function handleFormData(data) {
  localStorage.setItem("userData", JSON.stringify(data));
}

function removeFromFavourites(ev) {
  const itemRemove = ev.currentTarget;
  favourites.splice(parseInt(itemRemove.dataset.btnindex), 1);
  favouritesId.splice(parseInt(itemRemove.dataset.btnindex), 1);
  paintFavourites();
  handleFormData(favourites);
}

function getLocalStorage() {
  const getData = JSON.parse(localStorage.getItem("userData"));
  if (getData) {
    for (const getDataItem of getData) {
      favourites.push(getDataItem);
      favouritesId.push(getDataItem.show.id);
      paintFavourites();
    }
  }
}

getLocalStorage();

btnSearch.addEventListener("click", getAndPaintData);
