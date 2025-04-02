import ProductPage from "./ProductPage";

class HomePage {
  goTo(url) {
    cy.visit(url);
  }

  login(username, password) {
    cy.get("#username").type(String(username)); // Konwersja na string
    cy.get("#password").type(String(password));

    // Zaznaczamy pole wyboru "user" (typ użytkownika)
    cy.get('input#usertype[value="user"]').check();
    cy.wait(400);

    // Klikamy przycisk "Okay" w modalnym okni
    cy.contains("button", "Okay").click();
    cy.get("select.form-control")
      .select("Teacher")
      .should("have.value", "teach");

  
    // Wybieramy opcję "Teacher" z listy rozwijanej i sprawdzamy, czy wartość to "teach"

    // Zaznaczamy checkbox "terms" (warunki)
    cy.get("#terms").check();
    // Klikamy przycisk logowania
    cy.get("#signInBtn").click();

    return new ProductPage();
  }
  windoValidation() {
    // Sprawdzamy tekst w modalnym oknie
    cy.get(".modal-content")
      .find("p")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.eq(
          "You will be limited to only fewer functionalities of the app. Proceed?"
        ); // Porównujemy tekst w modalu z oczekiwanym tekstem
      });
  }
}
export default HomePage;
