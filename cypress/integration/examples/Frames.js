require("cypress-iframe");

describe("My First Test", () => {
  it("Handles the confirm dialog", () => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    cy.frameLoaded("#courses-iframe"); // najważniejsza część
    cy.iframe().find("a[href$='mentorship']").eq(0).click();
    cy.wait(2000);

    let counter = 0;
    cy.iframe().find(".pricing-title.text-white.ls-1").should("have.length", 2);
  });
});
