// Initialize userMData and userData from localStorage
let userMData = JSON.parse(localStorage.getItem("userMData"));
let userData = JSON.parse(localStorage.getItem("userData"));
console.log("userMData", userMData);
console.log("userData", userData);
let mergedData = [...userMData, ...userData];

export class ProductManagement {
  constructor() {
    this.userMData = JSON.parse(localStorage.getItem("userMData")) || [];
    this.userData = JSON.parse(localStorage.getItem("userData")) || [];
  }

  // Initialize variables and event listeners
  initializeVariables() {
    let id = document.getElementById("id");
    let name = document.getElementById("pName");
    let title = document.getElementById("pTitle");
    let description = document.getElementById("pDescription");
    let vendor = document.getElementById("pVendor");
    let stock = document.getElementById("pStock");
    let buying = document.getElementById("pBuying");
    let sale = document.getElementById("pSale");
    let quantity = document.getElementById("pQuantity");
    let type = document.getElementById("pType");
    let shipment = document.getElementById("pShipment");
    let refill = document.getElementById("pRefill");
    let locationAdd = document.getElementById("pLocation");
    let registerBtn = document.querySelector("#register-btn");
    let registerForm = document.querySelector("#register-form");

    // Save button click event
    registerBtn.onclick = () => {
      this.registrationData({
        id: id.value,
        name: name.value,
        title: title.value,
        description: description.value,
        vendor: vendor.value,
        stock: stock.value,
        buying: buying.value,
        sale: sale.value,
        quantity: quantity.value,
        type: type.value,
        shipment: shipment.value,
        refill: refill.value,
        locationAdd: locationAdd.value,
      });
      registerForm.reset("");
    };
  }
  // Handle registration data
  registrationData(data) {
    const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!currentUser) {
      console.log("Error");
      return;
    }
    // Push new data to userData array and update localStorage
    this.userData.push({
      email: currentUser.email,
      ...data,
    });
    localStorage.setItem("userData", JSON.stringify(this.userData));
  }

  // Populate the table with data
  populateTable() {
    const tableBody = document.querySelector("#dataTable tbody");
    const mergedData = [...this.userMData, ...this.userData];

    mergedData.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML += `
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
        <td class="location">${item.locationAdd || item.location}</td>
        <td class="actionbtn Actions_Fixed">
        </td>
      `;
      tableBody.appendChild(row);
      const actionCell = row.querySelector(".Actions_Fixed");
      actionCell.appendChild(this.createActionsDropdown(item.id));
    });
  }

  // Create dropdown for actions on each row
  createActionsDropdown(id) {
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");

    // Create dropdown button
    const button = document.createElement("button");
    button.classList.add("dropbtn");
    button.innerHTML = '<i class="fas fa-ellipsis-v"></i>';
    dropdown.appendChild(button);

    // Create dropdown content
    const dropdownContent = document.createElement("div");
    dropdownContent.classList.add("dropdown-content");

    // View product button
    const viewProductBtn = document.createElement("button");
    viewProductBtn.innerHTML = '<i class="fa fa-user-plus"></i> View Product';
    viewProductBtn.addEventListener("click", () => {
      const modalElement = document.getElementById("viewProductModal");
      const test = mergedData.find((row) => {
        return row.id === id;
      });
      // console.log("Test ", test);
      // Update modal content with product details
      modalElement.querySelector("#modal-id").innerText = test.id;
      modalElement.querySelector("#modal-name").innerText = test.name;
      modalElement.querySelector("#modal-title").innerText = test.title;
      modalElement.querySelector("#modal-description").innerText =
        test.description;
      modalElement.querySelector("#modal-vendor").innerText = test.vendor;
      modalElement.querySelector("#modal-stock").innerText = test.stock;
      modalElement.querySelector("#modal-buying").innerText = test.buying;
      modalElement.querySelector("#modal-sale").innerText = test.sale;
      modalElement.querySelector("#modal-quantity").innerText = test.quantity;
      modalElement.querySelector("#modal-type").innerText = test.type;
      modalElement.querySelector("#modal-shipment").innerText = test.shipment;
      modalElement.querySelector("#modal-refill").innerText = test.refill;
      modalElement.querySelector("#modal-location").innerText =
        test.location || test.locationAdd;
      modalElement.showModal();
    });
    // Close view product modal
    const closeViewElement = document.getElementById("closeViewProduct");
    closeViewElement.addEventListener("click", () => {
      const modalElement = document.getElementById("viewProductModal");
      modalElement.close();
    });

    dropdownContent.appendChild(viewProductBtn);

    // Delete product button
    const deleteProductBtn = document.createElement("button");
    deleteProductBtn.innerHTML =
      '<i class="fa fa-cart-plus"></i> Delete Products';
    deleteProductBtn.addEventListener("click", () => {
      const modalElement = document.getElementById("deleteProductModal");

      const deleteConfirmBtn = modalElement.querySelector(".D_Btn1");
      deleteConfirmBtn.addEventListener("click", () => {
        // Remove product from data and update localStorage
        const rowIndex = mergedData.findIndex((row) => row.id === id);

        const tableBody = document.querySelector("#dataTable tbody");
        tableBody.removeChild(tableBody.children[rowIndex]);

        userData = userData.filter((item) => item.id !== id);

        userMData = userMData.filter((item) => item.id !== id);

        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("userMData", JSON.stringify(userMData));

        modalElement.close();
      });

      modalElement.showModal();
    });
    // Close delete product modal
    const closeDeleteElement = document.getElementById("closeDeleteProduct");
    closeDeleteElement.addEventListener("click", () => {
      const modalElement = document.getElementById("deleteProductModal");
      modalElement.close();
    });

    dropdownContent.appendChild(deleteProductBtn);

    // Edit product button
    const editProductBtn = document.createElement("button");
    editProductBtn.dataset.openModal = true;
    editProductBtn.classList.add("editProductBtn");
    editProductBtn.innerHTML = '<i class="fas fa-edit"></i> Edit Products';
    editProductBtn.addEventListener("click", () => {
      const modalElement = document.getElementById("editProductModal");
      const test = mergedData.find((row) => {
        return row.id === id;
      });
      // Update modal input fields with product details
      modalElement.querySelector("#modal-id").value = test.id;
      modalElement.querySelector("#modal-name").value = test.name;
      modalElement.querySelector("#modal-title").value = test.title;
      modalElement.querySelector("#modal-description").value = test.description;
      modalElement.querySelector("#modal-vendor").value = test.vendor;
      modalElement.querySelector("#modal-stock").value = test.stock;
      modalElement.querySelector("#modal-buying").value = test.buying;
      modalElement.querySelector("#modal-sale").value = test.sale;
      modalElement.querySelector("#modal-quantity").value = test.quantity;
      modalElement.querySelector("#modal-type").value = test.type;
      modalElement.querySelector("#modal-shipment").value = test.shipment;
      modalElement.querySelector("#modal-refill").value = test.refill;
      modalElement.querySelector("#modal-location").value =
        test.location || test.locationAdd;
      modalElement.showModal();
    });

    // Event listener to open edit modal when clicking on edit button
    document
      .querySelector(".table")
      .addEventListener("click", function (event) {
        if (event.target.classList.contains("editProductBtn")) {
          const editBtn = event.target;
          const tr = editBtn.closest("tr");
          const td = tr.querySelectorAll("td");

          const modalElement = document.getElementById("editProductModal");
          // Populate modal input fields with product details
          modalElement.querySelector("#modal-id").value = td[1].innerHTML;
          modalElement.querySelector("#modal-name").value = td[2].innerHTML;
          modalElement.querySelector("#modal-title").value = td[3].innerHTML;
          modalElement.querySelector("#modal-description").value =
            td[4].innerHTML;
          modalElement.querySelector("#modal-vendor").value = td[5].innerHTML;
          modalElement.querySelector("#modal-stock").value = td[6].innerHTML;
          modalElement.querySelector("#modal-buying").value = td[7].innerHTML;
          modalElement.querySelector("#modal-sale").value = td[8].innerHTML;
          modalElement.querySelector("#modal-quantity").value = td[9].innerHTML;
          modalElement.querySelector("#modal-type").value = td[10].innerHTML;
          modalElement.querySelector("#modal-shipment").value =
            td[11].innerHTML;
          modalElement.querySelector("#modal-refill").value = td[12].innerHTML;
          modalElement.querySelector("#modal-location").value =
            td[13].innerHTML;

          // Save edited product
          const saveBtn = document.getElementById("edit-producttBtn");
          saveBtn.addEventListener("click", () => {
            const editedData = {
              id: modalElement.querySelector("#modal-id").value,
              name: modalElement.querySelector("#modal-name").value,
              title: modalElement.querySelector("#modal-title").value,
              description:
                modalElement.querySelector("#modal-description").value,
              vendor: modalElement.querySelector("#modal-vendor").value,
              stock: modalElement.querySelector("#modal-stock").value,
              buying: modalElement.querySelector("#modal-buying").value,
              sale: modalElement.querySelector("#modal-sale").value,
              quantity: modalElement.querySelector("#modal-quantity").value,
              type: modalElement.querySelector("#modal-type").value,
              shipment: modalElement.querySelector("#modal-shipment").value,
              refill: modalElement.querySelector("#modal-refill").value,
              location: modalElement.querySelector("#modal-location").value,
            };

            // Update data and localStorage
            const index = mergedData.findIndex(
              (item) => item.id === editedData.id
            );

            if (index !== -1) {
              mergedData[index] = editedData;
            }

            localStorage.setItem("userData", JSON.stringify(userData));
            localStorage.setItem("userMData", JSON.stringify(mergedData));

            // Update table cell values with edited data
            td[1].innerHTML = editedData.id;
            td[2].innerHTML = editedData.name;
            td[3].innerHTML = editedData.title;
            td[4].innerHTML = editedData.description;
            td[5].innerHTML = editedData.vendor;
            td[6].innerHTML = editedData.stock;
            td[7].innerHTML = editedData.buying;
            td[8].innerHTML = editedData.sale;
            td[9].innerHTML = editedData.quantity;
            td[10].innerHTML = editedData.type;
            td[11].innerHTML = editedData.shipment;
            td[12].innerHTML = editedData.refill;
            td[13].innerHTML = editedData.location;

            modalElement.close();
          });

          modalElement.showModal();
        }
      });
    // Close edit product modal
    const closeElement = document.getElementById("closeEditProduct");
    closeElement.addEventListener("click", () => {
      const modalElement = document.getElementById("editProductModal");
      modalElement.close();
    });

    dropdownContent.appendChild(editProductBtn);

    dropdown.appendChild(dropdownContent);

    return dropdown;
  }

  // Open add product modal
  static openAddProductBtn() {
    const openAddProductBtn = document.querySelector(".addProductBtn");
    const closeBtn = document.querySelector("[data-close-modal]");
    const modal = document.querySelector("[data-modal]");

    openAddProductBtn.addEventListener("click", () => {
      modal.showModal();
    });

    closeBtn.addEventListener("click", () => {
      modal.close();
    });
  }
}

// window.onload = () => {
//   const productManagement = new ProductManagement();
//   productManagement.initializeVariables();
//   productManagement.populateTable();
//   ProductManagement.openAddProductBtn();
// };
