describe("My First Test", () => {
    it("Handles the confirm dialog", () => {
      cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
  
      // Pobieranie linku
      cy.get("#opentab").then((el) => {
          const url = el.prop("href");  // Otrzymujemy pełny URL
          cy.visit(url);  
          // Używamy pełnego URL w cy.origin()
          cy.origin(url, () => {
              // Po przejściu na stronę klikamy w 'About us'
              cy.get("#navbarSupportedContent").contains("a", "About us").click();
  
              // Poczekajmy na przejście na stronę, upewniając się, że jesteśmy na odpowiedniej
              cy.url().should('include', 'about.html');  // Czekamy na odpowiednią stronę
              
              // Sprawdzamy zawartość h2 na nowej stronie
              cy.get("#about-page")
                .contains("h2", "Welcome to QAClick Academy")
                .should('contain', "Welcome to QAClick Academy");
          });
      });
    });
  });
  