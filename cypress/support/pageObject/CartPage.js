import ConfirmationPage from "./ConfirmationPage";

class CartPage{

    verifyCartCost() {
        let number = 0; // Używamy `let`, bo `const` nie pozwala na zmianę wartości
        
        return cy.get(".table.table-hover tbody tr")
            .find(".col-sm-1.col-md-1.text-center strong")
            .each(($el, index) => {
                if (index % 2 === 1) {
                    cy.wrap($el)
                        .invoke("text")
                        .then((price) => {
                            number += parseInt(price.replace(/[^\d]/g, ""));
                        });
                }
            })
            .then(() => {
                cy.log(`Final number: ${number}`); // Wyświetlenie wartości w konsoli
                return cy.wrap(number); // 👈 Cypress obsłuży to jako wartość asynchroniczną
            });
    }
    
checkOut(){
    
        // Klikamy przycisk "Checkout" (który powinien być w interfejsie)
        cy.get(".btn.btn-success").click();

        return new ConfirmationPage ();
}

}export default CartPage