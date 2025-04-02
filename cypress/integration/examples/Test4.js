describe('My First Test', () => {
    it('Handles the confirm dialog', () => {
      cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
  
      // Klikamy na przycisk, który wywołuje okno potwierdzenia
      cy.get('[value="Confirm"]').click();
  
      // Nasłuchujemy na zdarzenie window:confirm
      cy.on('window:confirm', (str) => {
        // Logujemy tekst z okna potwierdzenia
        cy.log(str); // W tym przypadku może to być np. "Are you sure you want to proceed?"
        
        // Możemy także zatwierdzić (OK) lub anulować (Cancel) okno potwierdzenia.
        // Jeśli chcemy zatwierdzić, to zwracamy 'true'.
        // Jeśli chcemy anulować, to zwracamy 'false'.
        return true; // Zatwierdzamy okno (OK)
      });

    });
  });
  