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
    request.open("GET", "http://localhost:3000/api/furniture/"+ idProduct);
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

////////////////////////////////////// Page PRODUIT /////////////////////////////////////////

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
  oneFurniture.varnish.forEach((furniture) => {
    let varnishOption = document.createElement("option");
    document
      .getElementById("choixoption")
      .appendChild(varnishOption).innerHTML = furniture;
  });
}

// Récupération de l'objet dans le localstorage et conversion //
let cart = JSON.parse(localStorage.getItem("panier"));

// Affichage du nombre d'article dans le panier //
function showItems() {
  let cartItems = document.getElementById("indexPanier");
  cartItems.textContent = cart.length;
}

function showTheCart() {
  let cartContent = document.getElementById("produitPanier");
  cartContent.textContent = cart.length;
}

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

/*feedTheCart = () => { 
  // Récupérer la valeur de la sélection du vernis //  
  let optionChoice = document.getElementById("choixoption"); 
  let selectedValue = optionChoice.options[optionChoice.selectedIndex].value;
    if (selectedValue != "selectvarnish") {
        let buyFurniture = document.getElementById("boutonacheter");
        buyFurniture.addEventListener("click", async function () {
          const addFurniture = await getFurnitureProducts();
          cart.push(addFurniture);
          localStorage.setItem("panier", JSON.stringify(cart));
          console.log("Le produit a été ajouté au panier");
          alert("Commandez de suite votre meuble en cliquant sur le panier ou bien poursuivez votre shopping !");
          location.reload();
         }); 
    } else {
         alert("Merci de choisir une couleur de vernis");
      }

    };*/


// Récupérer la valeur de la sélection du vernis //
/*function chooseVarnish() {
  // On récupère l'élement html <select> //
let optionChoice = document.getElementById("choixoption"); 
let selectedValue = optionChoice.options[optionChoice.selectedIndex].value;
  if (selectedValue == "selectvarnish") {     
      var logo = document.getElementById("boutonacheter")[0]; 
      logo.addEventListener('click', function() {
        logo.style.display = 'none' ;
       }); */
      
      
      
//      console.log(selectedValue.value);
//      console.log(selectedValue.text);      
//        alert("Merci de choisir une couleur de vernis");
//    }     
//}


//document.querySelector('#boutonacheter').addEventListener('click', function() {
//  alert(document.querySelector('#choixoption').value);
//});


/*var elt = document.getElementById("choixoption");
//elt.addEventListener('change' , function() {
//  console.log(this.options[this.selectedIndex].text);
//  console.log(this.options[this.selectedIndex].value);
//  console.log(this.options[this.selectedIndex].selected);
//})*/


/////////////////////////////////////// Page PANIER /////////////////////////////////////////

generateCart = () => {
  if (cart.length > 0) {
    document.getElementById("panierVide").remove(); // Retrait du message par défaut html panier vide //

    // Création du tableau html //
    let orderTable = document.createElement("table");
    let orderTableArticle = document.createElement("tr");
    let orderTableImg = document.createElement("th");
    let orderTableName = document.createElement("th");
    let orderTableDesc = document.createElement("th");
    let orderTableVarnish = document.createElement("th");
    let orderTableDelete = document.createElement("th");
    let orderTablePrice = document.createElement("th");    
    let orderTablePayment = document.createElement("tr");
    let orderTableTotal = document.createElement("th");
    let orderTableTotalPrice = document.createElement("td");

    // Placement et noeuds //
    let paymentTable = document.getElementById("panier-recap");
    paymentTable.appendChild(orderTable);
    orderTable.appendChild(orderTableArticle);
    orderTableArticle.appendChild(orderTableImg);
    orderTableArticle.appendChild(orderTableName);
    orderTableArticle.appendChild(orderTableDesc);
    orderTableArticle.appendChild(orderTableVarnish);
    orderTableArticle.appendChild(orderTableDelete);
    orderTableArticle.appendChild(orderTablePrice);
    

    // Création des titres //
    orderTableImg.textContent = "Meuble(s)";
    orderTableName.textContent = "Nom(s)";
    orderTableDesc.textContent = "Description(s)";
    orderTableVarnish.textContent = "Vernis";
    orderTableDelete.textContent = "Supprimer";
    orderTablePrice.textContent = "Prix";  
    
 // Boucle FOR pour affichage des articles dans le panier //     
    for (let i = 0; i<cart.length; i++) {
    
      // Création des lignes du tableau //
      let moreFurniture = document.createElement("tr");
      let moreFurnitureImg = document.createElement("img");
      let moreFurnitureName = document.createElement("td");
      let moreFurnitureDesc = document.createElement("td");
      let moreFurnitureVarnish = document.createElement("td");
      let moreFurnitureDelete = document.createElement("td");
      let moreFurnitureIcon = document.createElement("i");
      let moreFurniturePrice = document.createElement("td");     
      

      // Attribution des attributs //
      moreFurniture.setAttribute("id", "article" + [i]);
      moreFurnitureImg.setAttribute("class", "photo_article");
      moreFurnitureImg.setAttribute("src", cart[i].imageUrl);
      moreFurnitureImg.setAttribute("alt", "Photo du meuble Orinoco commandé");
      moreFurnitureIcon.setAttribute("id", "remove" + [i]);
      moreFurnitureIcon.setAttribute("class", "fas fa-backspace");
      moreFurnitureIcon.setAttribute("title", "Supprimer ?");

      console.log(i);

// Suppression d'un produit au clic //
   moreFurnitureIcon.addEventListener("click", (event) => {this.deleteFurniture(i);})           

      // Agencement de la structure HTML //
      orderTable.appendChild(moreFurniture);
      moreFurniture.appendChild(moreFurnitureImg);
      moreFurniture.appendChild(moreFurnitureName);
      moreFurniture.appendChild(moreFurnitureDesc);
      moreFurniture.appendChild(moreFurnitureVarnish);
      moreFurniture.appendChild(moreFurnitureDelete);
      moreFurnitureDelete.appendChild(moreFurnitureIcon);      
      moreFurniture.appendChild(moreFurniturePrice);
      

      // Contenu des lignes //
      moreFurnitureName.textContent = cart[i].name;
      moreFurnitureDesc.textContent = cart[i].description;
      moreFurnitureVarnish.textContent = cart[i].varnish;
      moreFurniturePrice.textContent = cart[i].price / 100 + " €";
      console.log(cart[i].name);
    };


    // Dernière ligne du tableau //
    orderTable.appendChild(orderTablePayment);
    orderTablePayment.appendChild(orderTableTotal);
    orderTablePayment.setAttribute("id", "ligneSomme");
    orderTableTotal.textContent = "Total à payer";
    orderTablePayment.appendChild(orderTableTotalPrice);
    orderTableTotalPrice.setAttribute("id", "sommeTotal");
    orderTableTotalPrice.setAttribute("colspan", "1");
    orderTableTotal.setAttribute("id", "colonneTotal");
    orderTableTotal.setAttribute("colspan", "5");

    //Calcule du montant dû //
    let invoice = 0;
    cart.forEach((cart) => {
      invoice += cart.price / 100;
    });

    //Affichage du prix total //
    console.log(invoice);
    document.getElementById("sommeTotal").textContent = invoice + " €";
  }
};

// Mise à jour du nouveau panier si suppression de l'article //

deleteFurniture = (i) => {
 cart.splice(i, 1);
  localStorage.clear();
  
  localStorage.setItem("panier", JSON.stringify(cart));
  //Mise à jour de la page //
  window.location.reload();
};  

//---------------------------FORMULAIRE----------------//

// Mise en place des outils de contrôle des inputs du formulaire //
controlForm = () => {
  // Controle Regex //
  let regexNumber = /[0-9]/;
  let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let regexSymbols = /[§!@#$%^&*().?":{}|<>]/;

  // Message fin de controle //
  let validForm = "";

  // Récupération des inputs //
  let inputLastName = document.getElementById("nom").value;
  let inputFirstName = document.getElementById("prenom").value;
  let inputEmail = document.getElementById("email").value;
  let inputAdress = document.getElementById("adresse").value;
  let inputCity = document.getElementById("ville").value;

  // Tests des différents inputs du formulaire //
  // Test du nom //
  if (
    regexNumber.test(inputLastName) == true ||
    regexSymbols.test(inputLastName) == true ||
    inputLastName == ""
  ) {
    validForm = "La syntaxe de votre nom n’est pas valide. Merci de bien vouloir la vérifier.";
  } else {
    console.log("Nom validé");
  }
  // Test du prénom //
  if (
    regexNumber.test(inputFirstName) == true ||
    regexSymbols.test(inputFirstName) == true ||
    inputFirstName == ""
  ) {
    validForm = validForm + "\n" + "La syntaxe de votre prénom n’est pas valide. Merci de bien vouloir la vérifier.";
  } else {
    console.log("Prénom validé");
  }
  // Test de l'email //
  if (regexEmail.test(inputEmail) == false) {
    validForm = validForm + "\n" + "La syntaxe de votre email n’est pas valide. Merci de bien vouloir la vérifier.";
  } else {
    console.log("Email validé");
  }
  // Test de l'adresse //
  if (regexSymbols.test(inputAdress) == true || inputAdress == "") {
    validForm = validForm + "\n" + "La syntaxe de votre adresse n’est pas valide. Merci de bien vouloir la vérifier.";
  } else {
    console.log("Adresse validée");
  }
  // Test de la ville //
  if (
    (regexSymbols.test(inputCity) == true ||
      regexNumber.test(inputCity) == true) ||
    inputCity == ""
  ) {
    validForm = validForm + "\n" + "La syntaxe de votre adresse n’est pas valide. Merci de bien vouloir la vérifier.";
  } else {
    console.log("Ville validée");
  }
  // Si un des champs n'est pas conforme => message d'alerte //
  if (validForm != "") {
    alert("Attention certaines données ne peuvent être validées :" + "\n" + validForm);
  }
  // Si le formulaire est validé => construction de l'objet "contact" //
  else {
    contact = {
      lastName: inputLastName,
      firstName: inputFirstName,
      address: inputAdress,
      city: inputCity,
      email: inputEmail,
    };
    return contact;
  }
};

// Vérification du panier //
controlCart = () => {
  // Vérifier qu'il y ait au moins un article dans le panier //
  let checkCart = JSON.parse(localStorage.getItem("panier"));
  // Si le panier est vide ou null //
  if  (checkCart.length < 1 || checkCart == null) {
    alert("Votre panier est vide");
    return false;
  } else {
    console.log("Le panier n'est pas vide");
    return true;
  }
};

/* Envoi à l'API 
Tableau et objet demandé par l'API pour la commande / l'objet “contact” envoyé 
au serveur + Le tableau de produits envoyé au serveur doit être un tableau de strings intitulé
products qui contiendra les id des produits à commander
Requête JSON contenant un objet de contact et un tableau de produits */
let contact;
let products = [];
let url = "http://localhost:3000/api/furniture/order";

const datasForm = (postForm, url) => {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest();
    request.onload = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
        sessionStorage.setItem("order", this.responseText);
        window.location = "./commande.html";
        resolve(JSON.parse(this.responseText));
        console.log(postForm);
      } else {
      }
    };
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(postForm);
    console.log(postForm);
  });
};

datasOrder = () => {
  let cartToOrder = document.getElementById("form_1");
  cartToOrder.addEventListener("submit", (event) => {
    event.preventDefault()
    // Si le panier contient quelque chose et que le formulaire est valide => Construction du tableau products envoyé à l'API //
    if (controlCart() == true && controlForm() != null) {
      console.log("L'envoi peut etre fait");
      cart.forEach((article) => {
        products.push(article._id);
      });
      console.log("Ce tableau sera envoyé à l'API : " + products);

      // Création de l'objet à envoyer //
      let commande = {
        contact,
        products,
      };

      let postForm = JSON.stringify(commande);
      datasForm(postForm, url);
      console.log(commande);

      // Retour à 0 des tableaux/objet/localStorage //
      contact = {};
      products = [];
      localStorage.clear();
    } else {
      console.log("ERROR");
    }
  });
};
// Récupération des informations pour affichage sur la page de confirmation //
confirmationOrder = () => {
  if (sessionStorage.getItem("order") != null) {
    let order = JSON.parse(sessionStorage.getItem("order"));
    // Indications nom et prénom du client //
    document.getElementById("firstName").innerHTML = order.contact.firstName;
    document.getElementById("lastName").innerHTML = order.contact.lastName;
    // Calculer le montant total de la commande //
    let priceOrder = 0;
    let showTotal = order.products;
    showTotal.forEach((element) => {
      priceOrder += element.price / 100;
    });
    // Indications prix et référence de commande //
    document.getElementById("priceOrder").innerHTML = priceOrder;
    document.getElementById("orderId").innerHTML = order.orderId;
    console.log(order);
    sessionStorage.removeItem("order");
  }  
};



