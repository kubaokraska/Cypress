describe('My First Test', () => {
    it('Handles the confirm dialog', () => {
      cy.visit('https://rahulshettyacademy.com/AutomationPractice/');

      cy.get("#opentab").invoke('removeAttr','target').click();
     
      cy.origin('https://www.qaclickacademy.com/', () => {
      cy.get("#navbarSupportedContent").contains("a", "About us").click();

      cy.get("#about-page")
      .contains("h2", "Welcome to QAClick Academy").should('contain', "Welcome to QAClick Academy");  // Ignoruje białe znaki na końcu
    


      })
 
    
      


  });
})  
