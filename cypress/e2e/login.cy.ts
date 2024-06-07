describe("Login Page Test", () => {
  it("Allows a user to login", () => {
    cy.visit("http://localhost:5173/register/login"); // Adjust the URL to your signup page's URL
    cy.get('[data-testid="login-email"]').should("exist");
    cy.get('[data-testid="login-password"]').should("exist");
  });
});
