import { AddColumn, selectColumns } from "./AddColumn.js";
import {
  toggleNav,
  logoutUser,
  loggedInUserInfo,
} from "./PopulateLoggedInUser.js";
import {
  sortTable,
  toggleSortOrder,
  searchQuery,
  filterTable,
} from "./SortingNFiltering.js";
import {
  AddBtn,
  initializeVariables,
  createActionsDropdown,
} from "./AddProductBtn.js";

// Import Function
AddColumn();

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".btnSelect2").addEventListener("click", function () {
    selectColumns();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#toggleNav").addEventListener("click", function () {
    toggleNav();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#closeToggle").addEventListener("click", function () {
    toggleNav();
  });
});

logoutUser();
loggedInUserInfo();

sortTable();
searchQuery();
filterTable();

AddBtn();

initializeVariables();

const userMData = JSON.parse(localStorage.getItem("userMData"));
let mergedData = [...userMData, ...userData];
console.log("MergedData - Global : ", userMData);

createActionsDropdown(id);

window.onload = () => {
  filterTable();
};
