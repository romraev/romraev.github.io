const cartList = JSON.parse(localStorage.getItem("cartList"));
const cartTable = document.querySelector(".cart-table");
const totals = document.querySelectorAll(".sub-total");
const popUpCart = document.querySelector(".header__right__details__cart");
const enptyMess = document.createElement("div");
enptyMess.classList.add("cart_empty");
enptyMess.textContent = "The cart is empty";

function addToCart(obj, addButton) {
  const addedProd = document.createElement("article");
  addedProd.classList.add("header__right__details__cart__thing");
  addedProd.id = obj.id;
  addedProd.innerHTML = `
          <a href="../pages/product.html"
          ><img
            class="header__right__details__cart__thing__img"
            src="${obj.img}"
            alt="header__right__details__cart__thing1"
        /></a>
        <div class="header__right__details__cart__thing__props">
          <h2 class="header__right__details__cart__thing__props__header">
            ${obj.header}
          </h2>
          <img
            src="../img/rating.png"
            alt="rating"
            class="header__right__details__cart__thing__props__rating"
          />
          <h3 class="header__right__details__cart__thing__props__price">
            <span id="qi-${obj.id}">${obj.quantity}</span> x ${obj.price}
          </h3>
        </div>
        <a href="" class="delete_from_cart-${obj.id}">
          <img
            src="../img/delete.jpg"
            alt="delete"
            class="header__right__details__cart__thing__delete"
          />
        </a>
          `;
  popUpCart.insertAdjacentElement("afterbegin", addedProd);

  enptyMess.remove();

  const removeBtn = document.querySelector(`.delete_from_cart-${obj.id}`);
  removeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const { id } = e.target;
    cartList.splice(
      cartList.findIndex((obj) => obj.id == id),
      1
    );

    localStorage.setItem("cartList", JSON.stringify(cartList));
    addedProd.remove();

    recalcTotals();

    if (cartList.length == 0) {
      popUpCart.insertAdjacentElement("afterbegin", enptyMess);
      totalPrice.textContent = "$0.00";
    }
  });
}

function recalcTotals() {
    const totalPrice = `$${cartList.reduce(
        (acc, el) => el.price * el.quantity + acc,
        0
      )}`;
    totals.forEach((el) => (el.textContent = totalPrice));
}

function displayCart(obj) {
  const addedProd = document.createElement("article");
  addedProd.classList.add("cart-row-item");
  addedProd.id = obj.id;
  addedProd.innerHTML = `
    <div class="cart-row-item__product">
    <a href="">
      <img src="${obj.img}" alt="" />
    </a>
    <div class="cart-row-item__product__info">
      <a href=""><h3>${obj.header}</h3></a>
      <img class="cart-rating" src="../img/rating.png" alt="" />
      <h4>
        <span class="cart-bold">Color: </span>Red <br />
        <span class="cart-bold">Size: </span>Xll
      </h4>
    </div>
  </div>
  <div class="cart-row-item__price">
    <h4 class="cart-bold">$${obj.price}</h4>
  </div>
  <div class="cart-row-item__quantity">
    <input
      class="quant-input"
      id="qi-${obj.id}"
      type="number"
      name="num-input"
      value="${obj.quantity}"
      min="01"
    />
  </div>
  <div class="cart-row-item__shipping">
    <h4 class="cart-bold">FREE</h4>
  </div>
  <div class="cart-row-item__subtotal" id="st-${obj.id}">
    <h4 class="cart-bold">$${obj.quantity * obj.price}</h4>
  </div>
  <div class="cart-row-item__action">
    <a href="" class="delete_button_cart-${
      obj.id
    }"><img src="../img/delete.jpg" alt="" /></a>
  </div>
            `;
  cartTable.insertAdjacentElement("beforeend", addedProd);
  enptyMess.remove();
  const prodSubTotal = cartTable.querySelector(`#st-${obj.id}`);
  const quantInput = cartTable.querySelector(`#qi-${obj.id}`);
  recalcTotals()

  quantInput.addEventListener("input", (ev) => {
    const quant = Number.parseInt(ev.target.value);
    obj.quantity = quant;
    prodSubTotal.textContent = `$${obj.quantity * obj.price}`;
    recalcTotals()
  });

  const removeBtn = document.querySelector(`.delete_button_cart-${obj.id}`);
  removeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const { id } = e.target;
    cartList.splice(
      cartList.findIndex((obj) => obj.id == id),
      1
    );
    localStorage.setItem("cartList", JSON.stringify(cartList));
    addedProd.remove();
    recalcTotals()
    if (cartList.length == 0) {
      cartTable.insertAdjacentElement("beforeend", enptyMess);
      totalPrice.textContent = "$0.00";
    }
  });
}

if (cartList.length == 0) {
  cartTable.insertAdjacentElement("beforeend", enptyMess);
  totals.forEach((el) => (el.textContent = "$0.00"));
} else {
  cartList.forEach((el) => {
    displayCart(el)
    addToCart(el)
});
}