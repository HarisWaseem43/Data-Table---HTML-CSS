export class TableManager {
  constructor() {
    // Initialize the table manager by setting up sortable headers and search inputs
    this.setupSortableHeaders();
    this.setupSearchInputs();
  }

  // Method to sort the table based on the clicked header
  sortTable(columnIndex, asc) {
    const tableBody = document.querySelector("#dataTable tbody");
    const rows = Array.from(tableBody.querySelectorAll("tr"));

    rows.sort((a, b) => {
      let aValue = a.children[columnIndex].textContent.trim();
      let bValue = b.children[columnIndex].textContent.trim();
      // Adjust sorting for specific columns (e.g., currency columns)
      if (columnIndex === 7 || columnIndex === 8 || columnIndex === 11) {
        aValue = aValue.replace("$", "");
        bValue = bValue.replace("$", "");
      }
      if (!isNaN(parseFloat(aValue))) {
        return asc
          ? parseFloat(aValue) - parseFloat(bValue)
          : parseFloat(bValue) - parseFloat(aValue);
      } else {
        return asc
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
    });

    // Rebuild the table body with sorted rows
    tableBody.innerHTML = "";
    rows.forEach((row) => tableBody.appendChild(row));
  }

  // Method to toggle the sort order (ascending/descending) of the clicked header
  toggleSortOrder(element) {
    let asc = element.classList.contains("asc");
    const columnIndex = element.cellIndex;

    // Toggle the sort order and apply sorting
    const headers = document.querySelectorAll(".sortable");
    headers.forEach((header) => header.classList.remove("asc", "desc"));

    if (asc) {
      element.classList.remove("asc");
      element.classList.add("desc");
    } else {
      element.classList.remove("desc");
      element.classList.add("asc");
    }

    this.sortTable(columnIndex, asc);
  }

  // searchQuery() {
  //   const headers = document.querySelectorAll(".sortable");
  //   headers.forEach((header) => {
  //     header.addEventListener("click", (event) => {
  //       if (
  //         event.target.tagName.toLowerCase() === "i" &&
  //         (event.target.classList.contains("fa-plus") ||
  //           event.target.classList.contains("fa-minus"))
  //       ) {
  //         const input =
  //           event.target.parentElement.querySelector(".search-input");
  //         const plusIcon = event.target.classList.contains("fa-plus")
  //           ? event.target
  //           : event.target.parentElement.querySelector(".fa-plus");
  //         const minusIcon = event.target.classList.contains("fa-minus")
  //           ? event.target
  //           : event.target.parentElement.querySelector(".fa-minus");
  //         if (input) {
  //           if (input.style.display === "none") {
  //             input.style.display = "";
  //             plusIcon.style.display = "none";
  //             minusIcon.style.display = "";
  //             input.focus();
  //           } else {
  //             input.style.display = "none";
  //             plusIcon.style.display = "";
  //             minusIcon.style.display = "none";
  //           }
  //         }
  //       } else {
  //         this.toggleSortOrder(header);
  //       }
  //     });
  //   });

  //   document.querySelectorAll(".search-input").forEach((input) => {
  //     input.addEventListener("click", (event) => {
  //       event.stopPropagation();
  //     });
  //   });
  // }

  // Method to handle search query and filter table rows accordingly
  filterTable() {
    const searchInputs = document.querySelectorAll(".search-input");
    const tableRows = document.querySelectorAll("#dataTable tbody tr");

    tableRows.forEach((row) => {
      let rowVisible = true;
      searchInputs.forEach((input) => {
        const columnIndex = input.dataset.column;
        const searchText = input.value.toLowerCase();
        const rowData = row
          .querySelector(`td.${columnIndex}`)
          .textContent.toLowerCase();
        // Check if the row matches the search criteria
        if (rowData.indexOf(searchText) === -1) {
          rowVisible = false;
        }
      });
      row.style.display = rowVisible ? "" : "none";
    });
    document.querySelectorAll(".search-input").forEach((input) => {
      input.addEventListener("input", () => this.filterTable());
    });
  }

  // Method to set up event listeners for sortable headers
  setupSortableHeaders() {
    const headers = document.querySelectorAll(".sortable");
    headers.forEach((header) => {
      header.addEventListener("click", (event) => {
        // Check if the click is on the search icons or header cells
        if (
          event.target.tagName.toLowerCase() === "i" &&
          (event.target.classList.contains("fa-plus") ||
            event.target.classList.contains("fa-minus"))
        ) {
          this.toggleSearchInput(event.target);
        } else {
          this.toggleSortOrder(header);
        }
      });
    });
  }

  // Method to toggle display of search inputs on header click
  toggleSearchInput(icon) {
    const input = icon.parentElement.querySelector(".search-input");
    const plusIcon = icon.classList.contains("fa-plus")
      ? icon
      : icon.parentElement.querySelector(".fa-plus");
    const minusIcon = icon.classList.contains("fa-minus")
      ? icon
      : icon.parentElement.querySelector(".fa-minus");

    // Toggle the visibility of search input and adjust icon display
    if (input) {
      if (input.style.display === "none") {
        input.style.display = "";
        plusIcon.style.display = "none";
        minusIcon.style.display = "";
        input.focus();
      } else {
        input.style.display = "none";
        plusIcon.style.display = "";
        minusIcon.style.display = "none";
      }
    }
  }

  // Method to set up event listeners for search inputs
  setupSearchInputs() {
    const searchInputs = document.querySelectorAll(".search-input");
    searchInputs.forEach((input) => {
      input.addEventListener("input", () => this.filterTable());
      input.addEventListener("click", (event) => event.stopPropagation());
    });
  }
}
// Automatically filter table on window load
window.onload = () => {
  filterTable();
};
