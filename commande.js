/////////////////////////////////////// Page COMMANDE /////////////////////////////////////////

// Récupération de l'objet dans le localstorage et conversion //
let cart = JSON.parse(localStorage.getItem("panier"));

// Vérification et initialisation du panier //
if (localStorage.getItem("panier")) {
  console.log(cart);
} else {
  console.log("Le panier va être initalisé");
  let createCart = [];
  localStorage.setItem("panier", JSON.stringify(createCart));
}

// Récupération des informations pour affichage sur la page de commande //
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

confirmationOrder();



