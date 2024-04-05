import { ColumnManager } from "./AddColumn.js";
import { UserInterface } from "./PopulateLoggedInUser.js";
import { TableManager } from "./SortingNFiltering.js";
import { ProductManagement } from "./AddProductBtn.js";

// <-------------- Select Column ----------------->
// on the click of Add Column Button the modal is opened with column headers options
const columnManager = new ColumnManager();

// Click on the select column button it adds the column in the data table
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".btnSelect2").addEventListener("click", function () {
    columnManager.selectColumns();
  });
});

// It Handles the Logout, Toggle Nav and Get the Username and Email
const userInterface = new UserInterface();

// This handles the Sorting, Filtering and Searching the Table Item
const tableManager = new TableManager();

// It handles the all CRUD operation of the Table and Populate the table
const productManagement = new ProductManagement();
productManagement.initializeVariables();
productManagement.populateTable();
ProductManagement.openAddProductBtn();

// window.onload = () => {
//   filterTable();
// };
