export function sortTable(columnIndex, asc) {
  const tableBody = document.querySelector("#dataTable tbody");
  const rows = Array.from(tableBody.querySelectorAll("tr"));
  console.log(columnIndex);

  rows.sort((a, b) => {
    let aValue = a.children[columnIndex].textContent.trim();
    let bValue = b.children[columnIndex].textContent.trim();
    if (columnIndex === 7 || columnIndex === 8) {
      aValue = aValue.replace("$", "");
      bValue = bValue.replace("$", "");
    }
    if (!isNaN(parseFloat(aValue))) {
      return asc
        ? parseFloat(aValue) - parseFloat(bValue)
        : parseFloat(bValue) - parseFloat(aValue);
    } else {
      return asc ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
  });

  tableBody.innerHTML = "";
  rows.forEach((row) => tableBody.appendChild(row));
}

export function toggleSortOrder(element) {
  let asc = element.classList.contains("asc");
  const columnIndex = element.cellIndex;

  const headers = document.querySelectorAll(".sortable");
  headers.forEach((header) => header.classList.remove("asc", "desc"));

  if (asc) {
    element.classList.remove("asc");
    element.classList.add("desc");
  } else {
    element.classList.remove("desc");
    element.classList.add("asc");
  }

  sortTable(columnIndex, asc);
}

export function searchQuery() {
  const headers = document.querySelectorAll(".sortable");
  headers.forEach((header) => {
    header.addEventListener("click", (event) => {
      if (
        event.target.tagName.toLowerCase() === "i" &&
        (event.target.classList.contains("fa-plus") ||
          event.target.classList.contains("fa-minus"))
      ) {
        const input = event.target.parentElement.querySelector(".search-input");
        const plusIcon = event.target.classList.contains("fa-plus")
          ? event.target
          : event.target.parentElement.querySelector(".fa-plus");
        const minusIcon = event.target.classList.contains("fa-minus")
          ? event.target
          : event.target.parentElement.querySelector(".fa-minus");
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
      } else {
        toggleSortOrder(header);
      }
    });
  });

  document.querySelectorAll(".search-input").forEach((input) => {
    input.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });
}

export function filterTable() {
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
      if (rowData.indexOf(searchText) === -1) {
        rowVisible = false;
      }
    });
    row.style.display = rowVisible ? "" : "none";
  });
  document.querySelectorAll(".search-input").forEach((input) => {
    input.addEventListener("input", filterTable);
  });
}
