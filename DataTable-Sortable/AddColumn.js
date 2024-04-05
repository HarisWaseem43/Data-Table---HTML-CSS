export class ColumnManager {
  constructor() {
    // Initialize selected columns array and set up the initial state
    this.selectedColumns = [];
    this.init();
  }

  init() {
    // Event listener for "Add Column" button to show the modal
    document.getElementById("addColumn").addEventListener("click", () => {
      document.getElementById("addColumnModal").style.display = "block";
    });

    // Event listener for closing the modal
    document
      .querySelector("#addColumnModal .modal-footer .btn-secondary")
      .addEventListener("click", () => {
        document.getElementById("addColumnModal").style.display = "none";
      });

    // Functionality to generate checkboxes for desired columns in the modal
    document.addEventListener("DOMContentLoaded", () => {
      var headers = document.querySelectorAll("#dataTable thead th");
      var form = document.getElementById("columnSelectionForm");

      headers.forEach((header, index) => {
        var headerText = header.textContent.trim().split("Filter")[0];
        const includeHeader = ["Shipment", "Refill Limit", "Location"];
        if (includeHeader.includes(headerText)) {
          var checkbox = document.createElement("input");
          checkbox.setAttribute("type", "checkbox");
          checkbox.setAttribute("value", index + 1);
          checkbox.setAttribute("id", "column" + (index + 1));

          var label = document.createElement("label");
          label.setAttribute("for", "column" + (index + 1));
          label.textContent = headerText;

          var div = document.createElement("div");
          div.classList.add("form-check");
          div.appendChild(checkbox);
          div.appendChild(label);

          form.appendChild(div);
        }
      });
    });
  }

  // Method to handle column selection
  selectColumns() {
    this.selectedColumns = [];
    var checkboxes = document.querySelectorAll(
      "#columnSelectionForm input:checked"
    );

    checkboxes.forEach((checkbox) => {
      this.selectedColumns.push(parseInt(checkbox.value));
    });

    var tableRows = document.querySelectorAll("#dataTable tbody tr");
    var tableHeaderCells = document.querySelectorAll("#dataTable thead th");

    // Show/hide selected columns in the table
    tableHeaderCells.forEach((header, index) => {
      var headerText = header.textContent.trim().split("Filter")[0];
      if (
        !this.selectedColumns.includes(index + 1) &&
        ["Actions"].includes(headerText)
      ) {
        // Always show the "Actions" column
        header.style.display = "";
        tableRows.forEach((row) => {
          row.querySelectorAll("td")[index].style.display = "";
        });
      } else if (
        !this.selectedColumns.includes(index + 1) &&
        ["Shipment", "Refill Limit", "Location"].includes(headerText)
      ) {
        // Hide the header and associated cells if not selected
        header.style.display = "none";
        tableRows.forEach((row) => {
          row.querySelectorAll("td")[index].style.display = "none";
        });
      } else {
        // Show the header and associated cells if selected
        header.style.display = "";
        tableRows.forEach((row) => {
          row.querySelectorAll("td")[index].style.display = "";
        });
      }
    });

    // Show/hide the table header based on selected columns
    var tableHeader = document.querySelector("#dataTable thead");
    tableHeader.style.display = this.selectedColumns.length > 0 ? "" : "none";
  }
}
