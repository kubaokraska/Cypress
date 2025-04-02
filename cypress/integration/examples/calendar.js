describe("My First Test", () => {
  it("Does not do much!", () => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    cy.get(".date-field-container")
      .find(".react-date-picker__inputGroup")
      .click();

    cy.get(".react-calendar__navigation__label__labeltext").click();

    function selectYear() {
       
      cy.get("div[class='react-calendar__navigation']")
        .find("button span")
        .invoke("text")
        .then((year) => {
          const yearValue = Number(year)
          if (yearValue == 1995) 
            return;

          if (yearValue - 1995 > 11) {
            cy.get("div[class='react-calendar__navigation']")
              .find("button")
              .eq(0)
              .click();
            cy.wait(500); // Dodaj krótką pauzę, aby uniknąć problemów z ładowaniem UI
            selectYear(); // Rekurencyjne wywołanie
          }

          if (yearValue > 1995) {
            cy.get("div[class='react-calendar__navigation']")
              .find("button")
              .eq(1)
              .click();
            cy.wait(500); // Dodaj krótką pauzę, aby uniknąć problemów z ładowaniem UI
            selectYear(); // Rekurencyjne wywołanie
          } 

          if (yearValue < 1995) {
            cy.get("div[class='react-calendar__navigation']")
              .find("button")
              .eq(3)
              .click();
            cy.wait(500); // Dodaj krótką pauzę, aby uniknąć problemów z ładowaniem UI
            selectYear();
          }
        });
    }
    selectYear();

    cy.get("div[class='react-calendar__year-view__months']").contains("button","luty").click();
    cy.get("div[class='react-calendar__month-view__days']").contains("button","9").click();

    cy.get(".react-date-picker__inputGroup").within(() => {
        cy.get(".react-date-picker__inputGroup__day")
          .should("have.value", "9");
        
        cy.get(".react-date-picker__inputGroup__month")
          .should("have.value", "2");
        
        cy.get(".react-date-picker__inputGroup__year")
          .should("have.value", "1995");
      });
      

    // Uruchamiamy funkcję
  });
});
