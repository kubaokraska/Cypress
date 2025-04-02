describe("My Second Test Suite", function () {
    before(()=>{
        cy.fixture('example').then(function(data) {  // Użycie zwykłej funkcji NIE STRZAŁKA!
            this.data = data;
        }); 
    })

  // Test Case: My First Test Case
  it("My FirstTest case", function () {
   
    Cypress.config('defaultCommandTimeout',10000)
    cy.visit("https://rahulshettyacademy.com/loginpagePractise/");
    let phoneName = this.data.productname;
    let number = 0;

    // Wypełniamy formularz logowania
    cy.get("#username").type(this.data.username); // Wpisujemy nazwę użytkownika
    cy.get("#password").type(this.data.password); // Wpisujemy hasło

    // Zaznaczamy pole wyboru "user" (typ użytkownika)
    cy.get('input#usertype[value="user"]').check();
    cy.wait(500);

    // Sprawdzamy tekst w modalnym oknie
    cy.get(".modal-content")
      .find("p")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.eq(
          "You will be limited to only fewer functionalities of the app. Proceed?"
        ); // Porównujemy tekst w modalu z oczekiwanym tekstem
      });

    // Klikamy przycisk "Okay" w modalnym oknie
    cy.contains("button", "Okay").click();

    // Wybieramy opcję "Teacher" z listy rozwijanej i sprawdzamy, czy wartość to "teach"
    cy.get("select.form-control")
      .select("Teacher") // Wybiera opcję
      .should("have.value", "teach"); // Sprawdza, czy wartość to 'teach'

    // Zaznaczamy checkbox "terms" (warunki)
    cy.get("#terms").check();

    // Klikamy przycisk logowania
    cy.get("#signInBtn").click();

    // Sprawdzamy, czy tekst na stronie głównej jest poprawny (sprawdzamy, czy widnieje "Shop Name")
    cy.get("div div h1.my-4").should("have.text", "Shop Name");

    // Sprawdzamy, czy liczba kart produktów wynosi 4
    cy.get("app-card-list app-card").should("have.length", 4);

    // Klikamy na pierwszy produkt

    cy.get("app-card")
      .filter(`:contains("${phoneName}")`)
      .then(($el) => {
        cy.wrap($el).find("button").click();
      });

    cy.get("app-card")
      .filter(':contains("iphone")')
      .then(($el) => {
        cy.wrap($el).find("button").click();
      });

    cy.contains("Checkout").click();

    cy.get(".table.table-hover tbody tr")
      .find(".col-sm-1.col-md-1.text-center strong")
      .each(($el, index) => {
        // Czekamy, aż element będzie dostępny
        if (index % 2 === 1)
          cy.wrap($el)
            .invoke("text")
            .then((price) => {
              // Usuwamy wszystkie znaki, które nie są cyframi
              number = number + parseInt(price.replace(/[^\d]/g, ""));
            });
      })
      .then(() => {
        cy.log(number); // Wypisujemy wynik po zakończeniu pętli
        expect(number).to.be.lessThan(180000);
      });

        // Klikamy przycisk "Success" (który powinien być w interfejsie)
    cy.get(".btn.btn-success").click();

    // Wpisujemy tekst "Pol" w pole wyboru kraju (w celu filtrowania)
    cy.get("#country").type("Pol");

    // Czekamy chwilę, aby wyniki były widoczne
   

    // Wyszukujemy "Poland" z listy sugestii i klikamy na odpowiedni element
    cy.get("div[class='suggestions'] ul a").each(($el) => {
      if ($el.text() === "Poland") cy.wrap($el).click();
    });

    // Zaznaczamy checkbox "checkbox2" (potrzebny do przejścia dalej)
    cy.get("input#checkbox2").check({ force: true });

    // Klikamy przycisk "Submit"
    cy.get(".btn.btn-success.btn-lg").click();

    // Sprawdzamy, czy pojawił się komunikat "Success!" i jego zawartość
    cy.get(".alert.alert-success")
      .should("be.visible") // Sprawdź, czy alert jest widoczny
      .and("contain", "Success!") // Sprawdź, czy alert zawiera określony tekst
      .and(
        "contain",
        "Thank you! Your order will be delivered in next few weeks :-)." // Sprawdź pełną treść
      );

  });
});
