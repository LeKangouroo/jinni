describe("Custom test", () => {

  it("should open the google page", () => {

    cy.visit("https://google.fr");
    cy.title().should("contain", "Google");
  });

  it("should find Grafikart website", () => {

    cy.get("input[name='q']").type("Grafikart");
    cy.get("form[name='f']").submit();
    cy.get("a[href='https://www.grafikart.fr/']")
  });

  it("should open videos tab", () => {

    cy.get("a:contains('Vidéos')").click();
    cy.get(".hdtb-mitem.hdtb-msel.hdtb-imb:contains('Vidéos')");
  });

  it("should find Makefile tutorial", () => {

    const highlightCss = {
      borderColor: "red",
      borderStyle: "solid",
      borderWidth: "1px"
    };

    cy.get("a:contains('Tutoriel Linux : Makefile - YouTube')").then($el => $el.css(highlightCss));
    cy.wait(1000);
  });

  it("should search with fixture data", () => {

    cy.fixture("data.json").then(data => {
      
      cy.get("#lst-ib").clear().type(data.search);
      cy.get("form[name='f']").submit();
    });
  });
});