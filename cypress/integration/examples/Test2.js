describe("My First Test", () => {
  it("Does not do much!", () => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    cy.get("input[placeholder='Search for Vegetables and Fruits']")
      .as("lol")
      .type("ci");
    cy.get("@lol").clear().type("ca");
    cy.wait(1000);

    cy.get(".products")
      .find(".product")
      .each(($el, index, $list) => {
        cy.wrap($el)
          .find(".product-name")
          .invoke("text")
          .then((text) => {
            if (
              text.toLowerCase().includes("carrot") ||
              text.toLowerCase().includes("capsicum")
            )
              cy.wrap($el).contains("ADD TO CART").click();
          });
      });

    cy.get(".cart-icon > img").click();
    cy.get(".action-block > button").contains("PROCEED TO CHECKOUT").click();

    cy.get("#productCartTables tbody tr").each(($el) => {
      cy.wrap($el)
        .find(".product-name")
        .invoke("text")
        .then((product) => {
          if (product.toLowerCase().includes("carrot"))
            expect(product.toLowerCase()).to.include("carrot");

          if (product.toLowerCase().includes("capsicum"))
            expect(product.toLowerCase()).to.include("capsicum");
        });

      cy.wrap($el)
        .find(".quantity")
        .invoke("text")
        .then((quantity) => {
          expect(Number(quantity.trim())).to.eq(1);
        });
    });
    cy.get(
      '[style="text-align: right; width: 100%; margin-top: 20px; margin-right: 10px;"]'
    )
      .contains("Place Order")
      .click();
  });
});
