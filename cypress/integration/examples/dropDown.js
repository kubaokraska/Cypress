describe("My First Test", () => {
  it("Does not do much!", () => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    //check boxes
    cy.get("#checkbox-example.right-align label").each(($el) => {
      cy.wrap($el).find("input").check().should("be.checked");
    });
    cy.get("#radio-btn-example label").each(($el) => {
      cy.wrap($el).find(".radioButton").click();
    });
  
// static dropdown


cy.get("#dropdown-class-example").select('option2').should('have.value','option2')
cy.wait(4000)
cy.get('#autocomplete').type('India')
cy.get('#ui-id-1 li div').each(($el)=>{

  cy.wrap($el).invoke("text").then((dropDownText)=>{
    cy.log(dropDownText.toLowerCase());
if(dropDownText.toLowerCase().includes("british indian ocean territory"))
 { cy.wrap($el).click();
  cy.wrap($el).should('contain.text',"British Indian Ocean Territory")
 }
  })



})




});
});
