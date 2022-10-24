async function getProductById(){     
        const url = new URLSearchParams(window.location.search);
        const idUrl = url.get("id");// result id=45b7cacb65d43b2b5c1ff70f3393ad1 
       
     
        const response = await fetch("http://localhost:3000/api/products/"+idUrl);
        const result = await response.json();

        if(response.status != 404){
        document.querySelector(".item__img").innerHTML+=
        `<img src="${result.imageUrl}" alt="${result.name}">`
        
        document.querySelector("title").innerHTML+= `${result.name}`//title page
        document.querySelector("#title").innerHTML+= `${result.name}`
        document.querySelector("#price").innerHTML+= `${result.price}`
        document.querySelector("#description").innerHTML+= `${result.description}`

        for(color in result.colors){
        document.querySelector("#colors").innerHTML+= 
            `
                <option value="${result.colors[color]}">${result.colors[color]}</option>
            `
        }
        } 
        // if id page  endefined
        else{
            document.querySelector(".item__img").innerHTML+=
            `<h2 style="color:red"> This page existe plus</h2>`
        }






// --------------------add In Card ---------------------
// ----------------------------------------------------
// ----------------------------------------------------
const bntaddToCart = document.querySelector("#addToCart")
bntaddToCart.addEventListener("click", function(){

let productsInLS = JSON.parse(localStorage.getItem("productArrayList"));
// field values 
let color = document.querySelector("#colors").value; // for INPUT
let quantity = document.querySelector("#quantity").value;


let product = {
  id: idUrl,
  color: color,
  quantity: quantity,
};

// Validation color and quantity field
if (color === "" || quantity == 0) {
  alert("SVP, choisissez une couleur or choisissez le nombre d'article(s)");
} else if (quantity > 100) {
  alert(" Max vous pouvez ajouter 100 d'article(s)");
} else {
  if (productsInLS != null) {
    let searchInCart = productsInLS.filter(
      (data) => data.id === idUrl && data.color === color
    );

    if (searchInCart.length > 0) {
      let sumQuantity = +searchInCart[0].quantity + parseInt(quantity);
      //////// pour passe pas le quantity >100 !!!!!!!!!
      if(sumQuantity >100){
        alert("100+")
      }else{
        let productSum = {
          id: idUrl,
          color: color,
          quantity: sumQuantity,
        };

        // Very IMPORTANT !!! here we find our object ID in the JS array
        let index = productsInLS.findIndex((data) => data == searchInCart[0]);
        //for remove to array need have Id
        productsInLS.splice(index, 1);
        productsInLS.push(productSum);
        localStorage.setItem("productArrayList", JSON.stringify(productsInLS));
      }
    }

    // if the id or color of the  product that is added do not repeat
    else {
      productsInLS.push(product);
      localStorage.setItem("productArrayList", JSON.stringify(productsInLS));
    }
  }
  //if the LS is empty
  else {
    productsInLS = [];
    productsInLS.push(product);
    localStorage.setItem("productArrayList", JSON.stringify(productsInLS));
  }
}
})

}

getProductById()





