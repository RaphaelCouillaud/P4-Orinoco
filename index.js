/////////////////////////////////////// Page INDEX /////////////////////////////////////////
// Promesse envers l'API //

getFurnitureProducts = () => {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (
        this.readyState == XMLHttpRequest.DONE &&
        this.status >= 200 &&
        this.status < 400
      ) {
        resolve(JSON.parse(this.responseText));
        console.log("Connecté");
      } else {
      }
    };
    request.open("GET", "http://localhost:3000/api/furniture/");
    request.send();
  });
};



// Mise en place des éléments pour construire la page //
async function furnitureList() {
  const furnitureList = await getFurnitureProducts();

// Ajout de la liste des produits //
let productsList = document.getElementById("listemeubles");

// Ajout de la section dans le HTML //
  furnitureList.forEach((furniture) => {
  let productsBox = document.createElement("section");
  productsBox.setAttribute("class", "meubles");

  let productsImg = document.createElement("div");
  productsImg.setAttribute("class", "meublesphoto");

  let productsDetails = document.createElement("div");
  productsDetails.setAttribute("class", "meublesdetails");

  let productPic = document.createElement("img");
  productPic.setAttribute("src", furniture.imageUrl);
  productPic.setAttribute("alt", "Photo du meuble Orinoco");

  let productName = document.createElement("h2");
  productName.setAttribute("class", "meublesnom");
  productName.textContent = furniture.name;

  let productPrice = document.createElement("p");
  productPrice.setAttribute("class", "meublesprix");
  productPrice.textContent = furniture.price / 100 + " €";  

  let furnitureLink = document.createElement("a");
  furnitureLink.setAttribute("href", "produit.html?id=" + furniture._id);
  furnitureLink.setAttribute("class", "boutonchoisir");
  furnitureLink.textContent = "Choisir";
    
// Noeuds //   
   productsList.appendChild(productsBox);
   productsBox.appendChild(productsImg);
   productsImg.appendChild(productPic);
   productsBox.appendChild(productsDetails);
   productsDetails.appendChild(productName);
   productsDetails.appendChild(productPrice);
   productsDetails.appendChild(furnitureLink);    
    
 });
 }

furnitureList(); 


// Récupération de l'objet dans le localstorage et conversion //
let cart = JSON.parse(localStorage.getItem("panier"));

// Affichage du nombre d'articles dans le panier //
function showItems() {
  let cartItems = document.getElementById("indexPanier");
  if (cart != null) {
  	cartItems.textContent = cart.length;
  } else {
  	cartItems.textContent = 0;
  }
  };
showItems();