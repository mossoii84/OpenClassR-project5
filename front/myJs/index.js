async function getAll() {
  try {
    const response = await fetch("http://localhost:3000/api/products");
    const result = await response.json();

    let html = document.querySelector(".items");
    for (key in result) {
      html.innerHTML += 
    `<a href="./product.html?id=${result[key]._id}">
     <article>
      <img src="${result[key].imageUrl}" alt="${result[key].name}">
       <h3 class="productName">${result[key].name}</h3>
       <p class="productDescription">${result[key].description}</p>
     </article>
    </a>`;
    }
  } catch (error) {
    console.log(error);
  }
}
getAll();
