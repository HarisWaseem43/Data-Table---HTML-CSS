import { AddColumn, selectColumns } from "./AddColumn.js";
import {
  toggleNav,
  logoutUser,
  loggedInUserInfo,
} from "./PopulateLoggedInUser.js";
import { sortTable, searchQuery, filterTable } from "./SortingNFiltering.js";
import {
  AddBtn,
  initializeVariables,
  createActionsDropdown,
} from "./AddProductBtn.js";

//  Calling FUnctions
// on the click of Add Column Button the modal is opened with column headers options
AddColumn();

// Click on the select column button it adds the column the data table
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".btnSelect2").addEventListener("click", function () {
    selectColumns();
  });
});

// For opening the hamburger menu
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#toggleNav").addEventListener("click", function () {
    toggleNav();
  });
});

// For clossing the hamburger menu
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#closeToggle").addEventListener("click", function () {
    toggleNav();
  });
});

// On the Click of Logout button user is logged out
logoutUser();

//Get the User Name and Email
loggedInUserInfo();

// Sort the table in ascending and descending order
sortTable();

//Set the values in the input field for searching
searchQuery();

// FIltered out the data which is searched
filterTable();

//Add Product Button
AddBtn();

// Set the value for add product
initializeVariables();

const userMData = JSON.parse(localStorage.getItem("userMData"));
let mergedData = [...userMData, ...userData];
console.log("MergedData - Global : ", userMData);

// Create Action Buttons with Modal
createActionsDropdown(id);

window.onload = () => {
  filterTable();
};
