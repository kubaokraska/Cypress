describe('My First Test', () => {
    it('Does not do much!', () => {

        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
        cy.get("input[placeholder='Search for Vegetables and Fruits']").as("lol").type('ci');
        cy.get("@lol").clear().type('ca');
        cy.wait(2000);

        cy.get(".products").find(".product").should("have.length",4).each(($el, index, $list) => { 

                if($el.find(".product-name").text().includes("Carrot"))
                cy.wrap($el).find("button").click();

    }).then( ($list) => {
expect($list).to.have.length(4);
    } )
  
    cy.get(".brand").then( ($logo)=>
    {

cy.log($logo.text());

    })







  }
)
}
  )







