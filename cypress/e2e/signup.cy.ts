describe("Signup Page Test", () => {
  it("Allows a user to sign up", () => {
    cy.visit("http://localhost:5173/register/signup"); // Adjust the URL to your signup page's URL
    cy.get('[data-testid="firstname-input"]').should("exist");
    cy.get('[data-testid="lastname-input"]').should("exist");
    cy.get('[data-testid="email-input"]').should("exist");
    cy.get('[data-testid="password-input"]').should("exist");
    cy.get('[data-testid="confirm-password-input"]').should("exist");
    // cy.get('[data-testid="submit-button"]').should('exist'); // Uncomment to check for the button's existence
  });
});
