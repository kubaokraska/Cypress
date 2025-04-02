// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('submitFormDetails',(country)=>{

    // Wpisujemy tekst "Poland" w pole wyboru kraju (w celu filtrowania)
    cy.get("#country").type(country);
   
    // Wyszukujemy "Poland" z listy sugestii i klikamy na odpowiedni element
    cy.get("div[class='suggestions'] ul a").each(($el) => {
      if ($el.text() === country) cy.wrap($el).click();
    });
})