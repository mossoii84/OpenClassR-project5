// Afficher les Donné dans la cart
async function getProductInCart() {
  const listCart = JSON.parse(localStorage.getItem("productArrayList"));

  if (listCart != null) {
    for (key in listCart) {
      if (listCart[key].id != undefined) {
        const rep = await fetch(
          "http://localhost:3000/api/products/" + listCart[key].id
        );
        const resRep = await rep.json();

        let panierList = document.querySelector("#cart__items");
        panierList.innerHTML += `
  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
  <div class="cart__item__img">
  <img src="${resRep.imageUrl}" alt="${resRep.altTxt}">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${resRep.name}</h2>
      <p>${listCart[key].color}</p>
      <p>${resRep.price * listCart[key].quantity}</p>
    </div>
  <div class="cart__item__content__settings">
  <div class="cart__item__content__settings__quantity">
    <p>Qté : </p>
    <input type="number" class="itemQuantity" name="itemQuantity" min="0" max="100" 
    value="${listCart[key].quantity}">
  </div>
  <div class="cart__item__content__settings__delete">
  <p class="deleteItem">Supprimer</p>
  </div>
  </div>
  </div>
  </article>`;

        // -----------------------------------------
        //------------------QUANTITY ---------------
        // -----------------------------------------

        //------------------quantity everyone product in my cart---------------
        let totalPriceForProducts = document.querySelectorAll(
          ".cart__item__content__description > p:last-child"
        );
        let quantityItem = document.querySelectorAll(".itemQuantity");
        for (let i = 0; i < quantityItem.length; i++) {
          quantityItem[i].addEventListener("click", function () {
            //if before has been deleted product
            if (quantityItem.length === listCart.length) {
              listCart[i].quantity = quantityItem[i].value;
              localStorage.setItem(
                "productArrayList",
                JSON.stringify(listCart)
              );

              //------------------totalPrice for 1 products in my cart---------------
              totalPriceForProducts[i].innerHTML =
                listCart[i].quantity * resRep.price;

              //------------------ totalQuantity for all products in my Cart/Panier -------
              getTotalQuantityAllProduct();
              ////////////

              //------------------totalPrice for All products in my cart---------------
              getTotalPriceAllProducts();
            } else {
              location.reload();
            }
          });
        }

        //------------------ totalQuantity for all products in my Cart/Panier -------
        let totalQuantityAllProduct = document.querySelector("#totalQuantity");
        function getTotalQuantityAllProduct() {
          let totalProduct = 0;
          if (listCart != null) {
            for (let prod of listCart) {
              totalProduct += parseInt(prod.quantity);
            }
          }
          totalQuantityAllProduct.innerHTML = totalProduct;
        }
        getTotalQuantityAllProduct();

        //------------------ totalPrice for all products in my Cart/Panier -------
        let totalPriceAllProduct = document.querySelector("#totalPrice");
        function getTotalPriceAllProducts() {
          let sum = 0;
          for (let elem of totalPriceForProducts) {
            sum += parseInt(elem.innerHTML);
          }
          totalPriceAllProduct.innerHTML = sum;
        }
        getTotalPriceAllProducts();

        //--------------- if>100 -------------
        if (listCart[key].quantity > 100 || quantityItem.innerHTML > 100) {
          alert("les Qté dois etre moins 100");
        }
      }
    }
  }

  // -----------------------------------------
  //------------------Button remove ---------------
  // -----------------------------------------
  //------------------  Button - supprimer -------------
  const buttons = document.querySelectorAll(".deleteItem");
  const prd = document.querySelectorAll(".cart__item");

  buttons.forEach((btn, i) => {
    btn.addEventListener("click", function () {
      prd[i].remove();
      listCart.splice(i, 1);
      localStorage.setItem("productArrayList", JSON.stringify(listCart));
      location.reload();

    });
  });

  const removeProductIfZero = document.querySelectorAll(".itemQuantity");
  removeProductIfZero.forEach((n, i) => {
    n.addEventListener("click", function () {
      if (removeProductIfZero[i].value == "0") {
        prd[i].remove();
        listCart.splice(i, 1);
        localStorage.setItem("productArrayList", JSON.stringify(listCart));
      }
    });
  });

  //----------------------------------------------
  //-------------- REGEX test ---------------------
  //---------------------------------------------
  //firstName
  let inputFirstName = document.querySelector("#firstName");
  let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
  // lastName
  let inputLastName = document.querySelector("#lastName");
  let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
  //city
  let inputCity = document.querySelector("#city");
  let cityErrorMsg = document.querySelector("#cityErrorMsg");
  //address
  let inputAddress = document.querySelector("#address");
  let addressErrorMsg = document.querySelector("#addressErrorMsg");
  //email
  let inputEmail = document.querySelector("#email");
  let emailErrorMsg = document.querySelector("#emailErrorMsg");

  //pattern Regex
  let patRegexName = /^[a-zA-Z-éç]{2,15}$/; // lettre  et min 3 symboles
  let patRegexAddress = /^[a-zA-Z0-9-éç ]{2,20}$/; // lettre et chiffre et min 3 symboles
  let patRegexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; //email validation

  //------- verifivation input fields--------
  //-----------------------------------------
  //test required min 3 symboles and no chiffres in fields
  // FirstName
  //minMax/required
  document.querySelector("#order").onclick = function (e) {
    e.preventDefault(); // for stop restart page
    if (patRegexName.test(inputFirstName.value)) {
      inputFirstName.classList.remove("is-invalid");
      inputFirstName.classList.add("is-valid");
      firstNameErrorMsg.innerHTML = "";
    } else {
      inputFirstName.classList.add("is-invalid");
      inputFirstName.classList.remove("is-valid");
      firstNameErrorMsg.innerHTML = "Min 2 symboles et juste des lettres";
    }

    // LastName
    //minMax/required
    if (patRegexName.test(inputLastName.value)) {
      inputLastName.classList.remove("is-invalid");
      inputLastName.classList.add("is-valid");
      lastNameErrorMsg.innerHTML = "";
    } else {
      inputLastName.classList.add("is-invalid");
      inputLastName.classList.remove("is-valid");
      lastNameErrorMsg.innerHTML = "Min 2 symboles et juste des lettres";
    }

    // // City
    // //minMax/required
    if (patRegexAddress.test(inputCity.value)) {
      inputCity.classList.remove("is-invalid");
      inputCity.classList.add("is-valid");
      cityErrorMsg.innerHTML = "";
    } // test juste des lettres
    else {
      inputCity.classList.add("is-invalid");
      inputCity.classList.remove("is-valid");
      cityErrorMsg.innerHTML =
        "Min 2 symboles et juste des lettres et chiffres";
    }

    // //address
    // //minMax/required
    if (patRegexAddress.test(inputAddress.value)) {
      inputAddress.classList.remove("is-invalid");
      inputAddress.classList.add("is-valid");
      addressErrorMsg.innerHTML = "";
    } else {
      inputAddress.classList.add("is-invalid");
      inputAddress.classList.remove("is-valid");
      addressErrorMsg.innerHTML =
        "Min 2 symboles et juste des lettres et chiffres";
    }

    // ////////////////////////////////////
    // //email validation
    if (patRegexEmail.test(inputEmail.value)) {
      inputEmail.classList.remove("is-invalid");
      inputEmail.classList.add("is-valid");
      emailErrorMsg.innerHTML = "";
    } else {
      inputEmail.classList.remove("is-valid");
      inputEmail.classList.add("is-invalid");
      emailErrorMsg.innerHTML = "Email invalid";
    }

    /*************************************** */
    /* ------- Post methode ---------------- */
    /*************************************** */
    let contact = {
      firstName: inputFirstName.value,
      lastName: inputLastName.value,
      address: inputAddress.value,
      city: inputCity.value,
      email: inputEmail.value,
    };

    //if LS empty
    let products = new Array();
    if (listCart == null || listCart.length == 0) {
      alert("You need product in cart");
    } else {
      for (let i = 0; i < listCart.length; i++) {
        products[i] = listCart[i].id;
      }
    }

    if (products.length > 0) {
      let clientOrder = {
        contact: contact,
        products: products,
      };

      if (
        patRegexName.test(inputFirstName.value) &&
        patRegexName.test(inputLastName.value) && 
        patRegexAddress.test(inputCity.value) &&
        patRegexAddress.test(inputAddress.value) && 
        patRegexEmail.test(inputEmail.value) 
      ) {
        async function postClientForm() {
          const responsePost = await fetch(
            "http://localhost:3000/api/products/order",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json; charset=UTF-8",
              },
              body: JSON.stringify(clientOrder),
            }
          );
          let postRes = await responsePost.json(); // стандартная запись для reponse, для конвертакции в json

          //remove all LS
          localStorage.removeItem("productArrayList");
          window.location.href = `./confirmation.html?id=${postRes.orderId}`;
        }
        postClientForm();
      }
    }
  };
  //----------------------------------------------
  //-------------- finish REGEX test ---------------------
  //---------------------------------------------
}

getProductInCart();
