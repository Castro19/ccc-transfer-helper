describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="spash-button"]').should("exist");
    cy.get('[data-testid="spash-title"]').should("exist");
    cy.get('[data-testid="spash-1"]').should("exist");
    cy.get('[data-testid="spash-2"]').should("exist");
    cy.get('[data-testid="spash-3"]').should("exist");
    cy.get('[data-testid="spash-4"]').should("exist");
  });
});
