export function AddColumn() {
  document.getElementById("addColumn").addEventListener("click", function () {
    document.getElementById("addColumnModal").style.display = "block";
  });

  // Function to close the modal when "Cancel" button is clicked
  document
    .querySelector("#addColumnModal .modal-footer .btn-secondary")
    .addEventListener("click", function () {
      document.getElementById("addColumnModal").style.display = "none";
    });

  document.addEventListener("DOMContentLoaded", function () {
    var headers = document.querySelectorAll("#dataTable thead th");
    var form = document.getElementById("columnSelectionForm");

    headers.forEach(function (header, index) {
      // if (index > 0) {
      // Skip the first checkbox (for 'Select All')
      var headerText = header.textContent.trim().split("Filter")[0];
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
      // }
    });
  });
}

export function selectColumns() {
  var selectedColumns = [];
  var checkboxes = document.querySelectorAll(
    "#columnSelectionForm input:checked"
  );

  checkboxes.forEach(function (checkbox) {
    selectedColumns.push(parseInt(checkbox.value));
  });

  var tableRows = document.querySelectorAll("#dataTable tbody tr");
  var tableHeaderCells = document.querySelectorAll("#dataTable thead th");

  // Hide unselected columns and their headers
  tableHeaderCells.forEach(function (header, index) {
    if (!selectedColumns.includes(index + 1)) {
      header.style.display = "none";
      tableRows.forEach(function (row) {
        row.querySelectorAll("td")[index].style.display = "none";
      });
    } else {
      header.style.display = "";
      tableRows.forEach(function (row) {
        row.querySelectorAll("td")[index].style.display = "";
      });
    }
  });

  // Hide the table header if no columns are selected
  var tableHeader = document.querySelector("#dataTable thead");
  tableHeader.style.display = selectedColumns.length > 0 ? "" : "none";
}
