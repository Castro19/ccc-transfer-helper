describe("Home Page Dropdown Functionality", () => {
  // beforeEach(() => {
  //   cy.visit("http://localhost:5173/home");
  // });

  it("renders the dropdowns on the screen", () => {
    cy.visit("http://localhost:5173/home");
    cy.get('[data-testid="home-card-content"]').should("exist");
  });

  it("Checks the  dropdown functionality", () => {
    cy.visit("http://localhost:5173/home");
    // YEAR dropdown
    cy.get("#Year").click();
    cy.get('[data-testid="home-dropdown-Year-item-1"]').click(); // assuming the item "2022" is at index 1
    cy.get("#Year").should("contain", "2022");

    // CCC Dropdown
    cy.get("#Community-College").click();
    cy.get('[data-testid="home-dropdown-Community-College-item-1"]')
      .should("exist")
      .click(); // Added should("exist") for debugging

    cy.get("#Community-College").should(
      "contain",
      "American River College (ARC)"
    );

    // University Dropdown
    cy.get("#University").click();
    cy.get('[data-testid="home-dropdown-University-item-0"]')
      .should("exist")
      .click();

    cy.get("#University").should(
      "contain",
      "California Polytechnic University, San Luis Obispo (CPSLO)"
    );

    // Major Dropdown
    cy.get("#Major").click();
    cy.get('[data-testid="home-dropdown-Major-item-0"]')
      .should("exist")
      .click();

    cy.get("#Major").should("contain", "AEROSPACE ENGINEERING, B.S.");

    // Click the Get Schedule Button
    cy.get('[data-testid="button-get-schedule"]').should("exist").click();

    cy.get('[data-testid="schedule-header"]').should("exist");

    // Schedule Page
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
