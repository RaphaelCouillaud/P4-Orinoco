////////////////////////////////////// Page PRODUIT /////////////////////////////////////////
// Promesse envers l'API avec ID du produit sélectionné//

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
    request.open("GET", "http://localhost:3000/api/furniture/"+ idProduct);
    request.send();
  });
};



let idProduct = "";
async function furnitureSelection() {
  idProduct = location.search.substring(4);
  const oneFurniture = await getFurnitureProducts();

  // Lien avec la page produit HTML //
  let oneProduct = document.getElementById("selectionproduit");

  // Ajout de la section dans le HTML //
  let selectionBox = document.createElement("section");
  selectionBox.setAttribute("class", "selectionmeuble");

  let selectionImg = document.createElement("div");
  selectionImg.setAttribute("class", "selectionphoto");

  let selectionDetail = document.createElement("div");
  selectionDetail.setAttribute("class", "selectiondetail");

  let selectionPic = document.createElement("img");
  selectionPic.setAttribute("src", oneFurniture.imageUrl);
  selectionPic.setAttribute("alt", "Photo du meuble Orinoco " + oneFurniture.name);

  let selectionName = document.createElement("h2");
  selectionName.setAttribute("class", "selectionnom");
  selectionName.textContent = oneFurniture.name;

  let selectionDescription = document.createElement("p");
  selectionDescription.setAttribute("class", "selectiondescription");
  selectionDescription.textContent = oneFurniture.description;  

  let selectionPrice = document.createElement("p");
  selectionPrice.setAttribute("class", "selectionprix");
  selectionPrice.textContent = oneFurniture.price / 100 + " €";

  let selectionVarnish = document.getElementById("selectionoption");


  let selectionBuy = document.getElementById("boutonacheter");

  // Noeuds //
  oneProduct.appendChild(selectionBox);
  selectionBox.appendChild(selectionImg);
  selectionImg.appendChild(selectionPic);
  selectionBox.appendChild(selectionDetail);
  selectionDetail.appendChild(selectionName);
  selectionDetail.appendChild(selectionDescription);  
  selectionDetail.appendChild(selectionPrice);  
  selectionDetail.appendChild(selectionVarnish);
  selectionDetail.appendChild(selectionBuy);

// Création de l'option vernis // 
  oneFurniture.varnish.forEach((varnish) => {
    let varnishOption = document.createElement("option");
    document.getElementById("choixoption")
      .appendChild(varnishOption).innerHTML = varnish;      
  });
}
furnitureSelection(); 

// Sélection de l'option vernis //
let selectedVarnish = document.getElementById("choixoption").addEventListener("click", function (e) {
        selectedVarnish = e.target.value;
        console.log("Sélection du vernis : " + e.target.value);
});

// Récupération de l'objet dans le localstorage et conversion //
let cart = JSON.parse(localStorage.getItem("panier"));


function showItems() {
  let cartItems = document.getElementById("indexPanier");
  if (cart != null) {
    cartItems.textContent = cart.length;
  } else {
    cartItems.textContent = 0;
  }
  };
showItems();

// Vérification et initialisation du panier //
if (localStorage.getItem("panier")) {	
  console.log(cart);
} else {
  console.log("Le panier va être initalisé");
  let createCart = [];
  localStorage.setItem("panier", JSON.stringify(createCart));
}

// Ajout de l'article dans le panier //
feedTheCart = () => {
  let buyFurniture = document.getElementById("boutonacheter");
  buyFurniture.addEventListener("click", async function () {    
    const addFurniture = await getFurnitureProducts();
    cart.push(addFurniture);      
    localStorage.setItem("panier", JSON.stringify(cart));    
    console.log("Le produit a été ajouté au panier");
    alert("Commandez de suite votre meuble en cliquant sur le panier ou bien poursuivez votre shopping !");
    location.reload();
  });
};
feedTheCart(); 




