/////////////////////////////////////// Page PANIER /////////////////////////////////////////

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

// Retrait du formulaire si aucun article dans le panier //
deleteForm = () => {
  if (cart.length == 0) { 
    document.querySelector(".formulaire_commande").style.visibility = "hidden";
}
};
deleteForm();


generateCart = () => {
  if (cart.length > 0) {
    document.getElementById("panierVide").remove(); // Retrait du message par défaut html panier vide //

    // Création du tableau html //
    let orderTable = document.createElement("table");
    let orderTableArticle = document.createElement("tr");
    let orderTableImg = document.createElement("th");
    let orderTableName = document.createElement("th");
    let orderTableDesc = document.createElement("th");    
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
    orderTableArticle.appendChild(orderTableDelete);
    orderTableArticle.appendChild(orderTablePrice);
    

    // Création des titres //
    orderTableImg.textContent = "Meuble(s)";
    orderTableName.textContent = "Nom(s)";
    orderTableDesc.textContent = "Description(s)";    
    orderTableDelete.textContent = "Supprimer";
    orderTablePrice.textContent = "Prix";  
    
 // Boucle FOR pour affichage des articles dans le panier //     
    for (let i = 0; i<cart.length; i++) {
    
      // Création des lignes supplémentaires du tableau //
      let moreFurniture = document.createElement("tr");
      let moreFurnitureImg = document.createElement("img");
      let moreFurnitureName = document.createElement("td");
      let moreFurnitureDesc = document.createElement("td");      
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
      moreFurniture.appendChild(moreFurnitureDelete);
      moreFurnitureDelete.appendChild(moreFurnitureIcon);      
      moreFurniture.appendChild(moreFurniturePrice);
      

      // Contenu des lignes //
      moreFurnitureName.textContent = cart[i].name;
      moreFurnitureDesc.textContent = cart[i].description;     
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
    orderTableTotal.setAttribute("colspan", "4");

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

generateCart();

// Mise à jour du nouveau panier si suppression de l'article //
deleteFurniture = (i) => {
 cart.splice(i, 1);
  localStorage.clear();
  
  localStorage.setItem("panier", JSON.stringify(cart));
  //Mise à jour de la page //
  window.location.reload();
};  

//---------------------------FORMULAIRE------------------------------//

controlForm = () => {
  // outils de contrôle Regex des inputs //
  let regexNumber = /[0-9]/;
  let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let regexSymbols = /[§!@#$%^&*().?":{}|<>]/;
  let regexBlank = /^[\s]/;
  // Message fin de contrôle //
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
    regexBlank.test(inputLastName) == true ||
    inputLastName == ""
  ) {
    validForm = validForm + "\n" + "La syntaxe de votre nom n’est pas valide. Merci de bien vouloir la vérifier.";
  } else {
    console.log("Nom validé");
  }
  // Test du prénom //
  if (
    regexNumber.test(inputFirstName) == true ||
    regexSymbols.test(inputFirstName) == true ||
    regexBlank.test(inputFirstName) == true ||
    inputFirstName == ""
  ) {
    validForm = validForm + "\n" + "La syntaxe de votre prénom n’est pas valide. Merci de bien vouloir la vérifier.";
  } else {
    console.log("Prénom validé");
  }
  // Test de l'email //
  if (
    regexEmail.test(inputEmail) == false ||
    regexBlank.test(inputEmail) == true     
    ) {
    validForm = validForm + "\n" + "La syntaxe de votre email n’est pas valide. Merci de bien vouloir la vérifier.";
  } else {
    console.log("Email validé");
  }
  // Test de l'adresse //
  if (
    regexSymbols.test(inputAdress) == true ||
    regexBlank.test(inputAdress) == true ||
    inputAdress == ""
   ) {
    validForm = validForm + "\n" + "La syntaxe de votre adresse n’est pas valide. Merci de bien vouloir la vérifier.";
  } else {
    console.log("Adresse validée");
  }
  // Test de la ville //
  if (
    regexSymbols.test(inputCity) == true ||
    regexNumber.test(inputCity) == true ||
    regexBlank.test(inputCity) == true ||
    inputCity == ""
  ) {
    validForm = validForm + "\n" + "La syntaxe de votre ville n’est pas valide. Merci de bien vouloir la vérifier.";
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
datasOrder();


