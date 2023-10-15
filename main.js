let title = document.getElementById("title");
let price = document.getElementById("price");
let taxs = document.getElementById("taxs");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let tbody = document.querySelector("tbody");
let deleteAll = document.querySelector("#delall");
let products = [];
let mood = "create";
let index;

// get from localstorage
if (window.localStorage.getItem("products")) {
  products = JSON.parse(window.localStorage.getItem("products"));
  addElements();
}

showAndHideDeleteAll();

//get total
function getTotal() {
  if (price.value != "") {
    let finalPrice = +price.value + +taxs.value - +discount.value;
    total.value = `total : ${finalPrice}`;
    total.style.background = "darkgreen";
  } else {
    total.value = `total : `;
    total.style.background = "darkred";
  }
}

//create
create.onclick = () => {
  if (title.value == "" || price.value == "" || category.value == "") {
    alert("please fill fields");
  } else {
    createProducts();
    title.value = "";
    price.value = "";
    taxs.value = "";
    discount.value = "";
    total.value = "total :";
    total.style.background = "darkred";
    count.value = "";
    category.value = "";

    showAndHideDeleteAll();
  }
};

function createProducts() {
  let product = {
    title: title.value,
    price: price.value,
    taxs: taxs.value,
    discount: discount.value,
    total: total.value,
    count: count.value || 1,
    category: category.value,
  };
  if (mood === "create") {
    products.push(product);
  } else if (mood === "update") {
    products[index] = product;
    create.textContent = "create";
  }
  storeInLocal();
  addElements();
}

//store in localstorage
function storeInLocal() {
  window.localStorage.setItem("products", JSON.stringify(products));
}

//add to the page
function addElements() {
  tbody.innerHTML = "";
  for (let i = 0; i < products.length; i++) {
    tbody.innerHTML += `
     <tr  class="${i + 1}">
              <td>${i + 1}</td>
              <td>${products[i].title}</td>
              <td>${products[i].price}</td>
              <td>${products[i].taxs}</td>
              <td>${products[i].discount}</td>
              <td>${products[i].total.slice(7)}</td>
              <td>${products[i].count}</td>
              <td>${products[i].category}</td>
              <td><span onclick="updateData(${
                i + 1
              })" class="update">update</span></td>
              <td><span onclick="deleteData(${
                i + 1
              })" class="delete">delete</span></td>
              <td><span onclick="delRow(${
                i + 1
              })" class="del">delete all</span></td>
              </tr>
              `;
  }
}

//update

function updateData(i) {
  mood = "update";
  index = i - 1;
  title.value = products[i - 1].title;
  price.value = products[i - 1].price;
  taxs.value = products[i - 1].taxs;
  discount.value = products[i - 1].discount;
  total.value = products[i - 1].total;
  getTotal();
  count.value = products[i - 1].count;
  category.value = products[i - 1].category;
  create.textContent = "update";
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

//delete
function deleteData(i) {
  if (products[i - 1].count <= 1) {
    products.pop();
  } else {
    products[i - 1].count -= 1;
  }
  storeInLocal();
  addElements();
  showAndHideDeleteAll();
}

function delRow(i) {
  products.splice(i - 1, 1);
  storeInLocal();
  addElements();
  showAndHideDeleteAll();
}

function showAndHideDeleteAll() {
  if (tbody.children.length > 0) {
    deleteAll.style.display = "block";
    deleteAll.textContent = `delete all products (${products.length})`;
  } else {
    deleteAll.style.display = "none";
  }
}
deleteAll.onclick = () => {
  window.localStorage.removeItem("products");
  tbody.innerHTML = "";
  showAndHideDeleteAll();
};
