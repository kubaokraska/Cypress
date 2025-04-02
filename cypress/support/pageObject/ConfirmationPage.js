class ConfirmationPage {
  selectCountry(country) {
    cy.submitFormDetails(country);
    
  }

  checkCheckBox() {
    // Zaznaczamy checkbox "checkbox2" (potrzebny do przejścia dalej)
    cy.get("input#checkbox2").check({ force: true });
  }

  submit() {
    // Klikamy przycisk "Submit"
    cy.get(".btn.btn-success.btn-lg").click();
  }

  getAlertSuccess() {
    // Sprawdzamy, czy pojawił się komunikat "Success!" i jego zawartość
   return cy.get(".alert.alert-success")
     
  }
}
export default ConfirmationPage;
