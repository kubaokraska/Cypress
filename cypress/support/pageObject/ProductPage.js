import CartPage from "./CartPage";

class ProductPage {
  addToCart(phoneName) {
    cy.get("app-card")
      .filter(`:contains("${phoneName}")`)
      .then(($el) => {
        cy.wrap($el).find("button").click();
      });
  }

  checkOut() {
    cy.contains("Checkout").click();
    return new CartPage();
  }
pageValidation(){


// Sprawdzamy, czy tekst na stronie głównej jest poprawny (sprawdzamy, czy widnieje "Shop Name")
cy.get("div div h1.my-4").should("have.text", "Shop Name");
}

getCardLength(){
   // Sprawdzamy, czy liczba kart produktów wynosi 4
   return cy.get("app-card-list app-card")
}



}export default ProductPage 
