
// if faut retirer l'orderId
const url = new URLSearchParams(window.location.search);
const oredrId = url.get("id");

let orderIdHtml = document.querySelector("#orderId")
orderId.innerHTML+= `<p>${oredrId}</p>`

// orderId: "e4dd7620-37e9-11ed-b5e1-f52b54b999d8"