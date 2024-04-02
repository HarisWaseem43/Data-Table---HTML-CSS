const data = [
  {
    id: "01",
    name: "Frames",
    title: "Wall Frames",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, hic!",
    vendor: "Micheal",
    stock: 10,
    buying: "$10.00",
    sale: "$15.00",
    quantity: 20,
    type: "Type A",
    shipment: "$5.00",
    refill: 50,
    location: "14 St, Methon Town",
  },
  {
    id: "02",
    name: "Boots",
    title: "Chuka Boots",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima officiis illo, vero saepe earum atque?",
    vendor: "John",
    stock: 20,
    buying: "$15.00",
    sale: "$$25.00",
    quantity: 22,
    type: "Type B",
    shipment: "$7.00",
    refill: 560,
    location: "131 St, New York",
  },
  {
    id: "03",
    name: "Sweater",
    title: "Wool Sweater",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis similique assumenda ut doloribus. Facilis nulla necessitatibus perferendis quisquam quae. Nobis.",
    vendor: "Fichel",
    stock: 10,
    buying: "$10.00",
    sale: "$15.00",
    quantity: 20,
    type: "Type A",
    shipment: "$5.00",
    refill: 50,
    location: "12 St, Australia",
  },
  {
    id: "04",
    name: "Art",
    title: "Wood Art",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit consequuntur quidem quaerat molestias inventore eos eu reprehenderit!",
    vendor: "Alex",
    stock: 4,
    buying: "$100.00",
    sale: "$150.00",
    quantity: 4,
    type: "Type C",
    shipment: "$19.00",
    refill: 60,
    location: "#34, 31 St, Overseas Block, Paris",
  },
  {
    id: "05",
    name: "Lamps",
    title: "Hanging Lamps",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat in animi minus numquam e nobis est rerum tenetur harum molestias.",
    vendor: "Winnie",
    stock: 10,
    buying: "$30.00",
    sale: "$55.00",
    quantity: 10,
    type: "Type A",
    shipment: "$10.00",
    refill: 20,
    location: "124 St, Newton Block",
  },
  {
    id: "06",
    name: "Racks",
    title: "Sticky Racks",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat in animi minus numquam earum nobis est rerum tenetur harum molestias.",
    vendor: "Winnie",
    stock: 20,
    buying: "$20.00",
    sale: "$25.00",
    quantity: 1,
    type: "Type B",
    shipment: "$14.00",
    refill: 10,
    location: "12 St, Newton Block",
  },
  {
    id: "07",
    name: "Shirts",
    title: "T-Shirts",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat in.",
    vendor: "Alex",
    stock: 5,
    buying: "$10.00",
    sale: "$15.00",
    quantity: 5,
    type: "Type B",
    shipment: "$7.00",
    refill: 10,
    location: "11 St, New York",
  },
  {
    id: "08",
    name: "Watch",
    title: "Smart Watch",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat in animi minus numquam.",
    vendor: "Fichel",
    stock: 7,
    buying: "$15.00",
    sale: "$20.00",
    quantity: 12,
    type: "Type C",
    shipment: "$10.00",
    refill: 20,
    location: "88 St, Birmingham",
  },
  {
    id: "09",
    name: "Pendent",
    title: "Name Pendent",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, hic!",
    vendor: "David",
    stock: 10,
    buying: "$20.00",
    sale: "$25.00",
    quantity: 40,
    type: "Type A",
    shipment: "$7.00",
    refill: 30,
    location: "41 St, Manchester",
  },
  {
    id: "10",
    name: "Ring",
    title: "Star Ring",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, hic!",
    vendor: "Lauren",
    stock: 10,
    buying: "$10.00",
    sale: "$15.00",
    quantity: 20,
    type: "Type A",
    shipment: "$5.00",
    refill: 50,
    location: "22 St, Hueston",
  },
];

function populateTable() {
  const tableBody = document.querySelector("#dataTable tbody");

  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                <td class="fixed_Select input"><input type="checkbox" /></td>
                <td class="id">${item.id}</td>
                <td class="name">${item.name}</td>
                <td class="title">${item.title}</td>
                <td class="description">${item.description}</td>
                <td class="vendor">${item.vendor}</td>
                <td class="stock">${item.stock}</td>
                <td class="buying">${item.buying}</td>
                <td class="sale">${item.sale}</td>
                <td class="quantity">${item.quantity}</td>
                <td class="type">${item.type}</td>
                <td class="shipment">${item.shipment}</td>
                <td class="refill">${item.refill}</td>
                <td class="location">${item.location}</td>
                <td class="actionbtn Actions_Fixed">
                    <div class="dropdown">
                        <button class="dropbtn">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                        <div class="dropdown-content">
                            <button><i class="fa fa-user-plus"></i> Add Vendor</button>
                            <button><i class="fa fa-cart-plus"></i> Add Products</button>
                            <button><i class="fas fa-edit"></i> Edit Products</button>
                        </div>
                    </div>
                </td>
            `;
    tableBody.appendChild(row);
  });
}

function sortTable(columnIndex, asc) {
  const tableBody = document.querySelector("#dataTable tbody");
  const rows = Array.from(tableBody.querySelectorAll("tr"));

  rows.sort((a, b) => {
    const aValue = a.children[columnIndex].textContent.trim();
    const bValue = b.children[columnIndex].textContent.trim();

    if (!isNaN(parseFloat(aValue)) && !isNaN(parseFloat(bValue))) {
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

function toggleSortOrder(element) {
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

const headers = document.querySelectorAll(".sortable");
headers.forEach((header) => {
  header.addEventListener("click", () => toggleSortOrder(header));
  header.innerHTML += `<i class="fas fa-sort style="margin-bottom: 5rem;"></i>`;
});

window.onload = populateTable;
