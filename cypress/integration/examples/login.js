describe("My Second Test Suite", function () {
  // Test Case: My First Test Case
  it("My FirstTest case", function () {
    // Odwiedzamy stronę logowania
    cy.visit(Cypress.env('url')+"/loginpagePractise/");

    // Wypełniamy formularz logowania
    cy.get("#username").type("rahulshettyacademy"); // Wpisujemy nazwę użytkownika
    cy.get("#password").type("learning"); // Wpisujemy hasło

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
    cy.get(".btn.btn-info").eq(0).click();
    // Klikamy na drugi produkt
    cy.get(".btn.btn-info").eq(1).click();

    // Sprawdzamy, czy liczba elementów w koszyku wynosi 2
    cy.get(".nav-link.btn.btn-primary").should("contain.text", "2");

    // Klikamy na przycisk przejścia do koszyka
    cy.get(".nav-link.btn.btn-primary").click();

    // Klikamy na przycisk "Usuń" w koszyku
    cy.get(".btn.btn-danger").eq(0).click();

    // Sprawdzamy, czy przycisk "Usuń" nie ma żadnych rodzeństw (czy jest jedynym przyciskiem w tym miejscu)
    cy.get("button.btn.btn-danger")
      .should("exist") // Sprawdza, czy przycisk "Usuń" istnieje
      .then(($el) => {
        // Sprawdza, czy nie ma rodzeństwa przycisku
        expect($el.siblings()).to.have.length(0); // Jeśli długość rodzeństwa wynosi 0, oznacza to, że nie ma innych elementów obok
      });

    // Klikamy przycisk "Success" (który powinien być w interfejsie)
    cy.get(".btn.btn-success").click();

    // Wpisujemy tekst "Pol" w pole wyboru kraju (w celu filtrowania)
    cy.get("#country").type("Pol");

    // Czekamy chwilę, aby wyniki były widoczne
    cy.wait(3000);

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
