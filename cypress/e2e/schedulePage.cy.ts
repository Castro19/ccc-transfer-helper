describe("Schedule Page Title Functionality", () => {
  it("renders the Title Description on the screen", () => {
    cy.visit(
      "http://localhost:5173/schedule/2022/American%20River%20College/ARC/California%20Polytechnic%20University%2C%20San%20Luis%20Obispo/AEROSPACE%20ENGINEERING%2C%20B.S."
    );

    cy.get('[data-testid="schedule-header"]').should(
      "contain",
      "California Polytechnic University, San Luis Obispo: AEROSPACE ENGINEERING, B.S."
    );

    cy.get('[data-testid="schedule-ccc"]').should("exist");

    cy.get('[data-testid="schedule-ccc"]').should(
      "contain",
      "Transferring from American River College"
    );

    cy.get('[data-testid="schedule-year"]').should("exist");

    cy.get('[data-testid="schedule-year"]').should(
      "contain",
      "Starting year: 2022"
    );
  });
});
