describe("Custom test", () => {

  it("should open the Grafikart website", function() {

    cy.visit("https://www.grafikart.fr");
    cy.title().should("contain", "Grafikart");
  });

  it("should search the makefile tutorial", () => {

    cy.fixture("data.json").then(data => {

      cy.get("input[name='q']").type(data.search);
      cy.get("#topbar-search").submit();
      cy.get("a[href='/tutoriels/makefile-953']")
    });
  });

  it("should find Makefile tutorial", () => {

    const highlightCss = {
      borderColor: "red",
      borderStyle: "solid",
      borderWidth: "1px"
    };

    cy.get("a:contains('Makefile')").then($el => $el.css(highlightCss));
    cy.wait(1000);
  });
});
