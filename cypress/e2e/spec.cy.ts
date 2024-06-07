describe("Home Page Dropdown Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/home");
  });

  it("renders the home page title on the screen", () => {
    cy.get('[data-testid="home-title"]')
      .should("exist")
      .should("have.text", "Input your Transfer Details");
  });
});
