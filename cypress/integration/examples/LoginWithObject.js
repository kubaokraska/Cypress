import HomePage from "../../support/pageObject/HomePage";

describe("My Second Test Suite", function () {
  // Przed rozpoczęciem testów (before hook) – załadowanie danych testowych
  before(() => {
    cy.fixture("example").then(function (data) {
      // Użycie zwykłej funkcji zamiast funkcji strzałkowej, aby móc korzystać z `this`
      this.data = data; // Przechowujemy dane testowe z pliku `example.json`
      this.homePage = new HomePage(); // Tworzymy obiekt klasy `HomePage`
    });
  });

  // Test Case: Weryfikacja pełnego procesu zakupowego
  it("My First Test Case", function () {
    // Ustawienie domyślnego timeoutu dla poleceń Cypress na 10 sekund
    Cypress.config("defaultCommandTimeout", 10000);

    // Pobranie nazwy produktu z pliku `example.json`
    let phoneName = this.data.productname;

    // Przejście do strony logowania
    this.homePage.goTo(Cypress.env('url')+"/loginpagePractise/");

    // Logowanie do aplikacji i przechwycenie strony produktowej (`productPage`)
    const productPage = this.homePage.login(
      "rahulshettyacademy",
      this.data.password
    );

    // Weryfikacja, czy strona produktowa została poprawnie załadowana
    productPage.pageValidation();

    // Sprawdzenie, czy na stronie znajdują się dokładnie 4 karty produktów
    productPage.getCardLength().should("have.length", 4);

    // Dodanie produktów do koszyka (z danych testowych oraz ręcznie)
    productPage.addToCart(phoneName);
    productPage.addToCart("iphone");

    // Przejście do strony koszyka (`cartPage`)
    const cartPage = productPage.checkOut();

    // Weryfikacja sumy kosztów produktów w koszyku
    cartPage.verifyCartCost().then((number) => {
      cy.log(number); // Wyświetlenie sumy w logach
      expect(number).to.be.lessThan(180000); // Sprawdzenie, czy wartość nie przekracza 180000
    });

    // Przejście do strony potwierdzenia (`confirmationPage`)
    const confirmationPage = cartPage.checkOut();

    // Wybór kraju dostawy
    confirmationPage.selectCountry("Poland");

    // Zaznaczenie zgody na warunki
    confirmationPage.checkCheckBox();

    // Zatwierdzenie zamówienia
    confirmationPage.submit();

    // Weryfikacja wyświetlenia poprawnego komunikatu potwierdzającego zamówienie
    confirmationPage
      .getAlertSuccess()
      .should("be.visible") // Sprawdzenie, czy alert jest widoczny
      .and("contain", "Success!") // Sprawdzenie, czy komunikat zawiera słowo "Success!"
      .and(
        "contain",
        "Thank you! Your order will be delivered in next few weeks :-)." // Pełna weryfikacja komunikatu
      );
  });
});
