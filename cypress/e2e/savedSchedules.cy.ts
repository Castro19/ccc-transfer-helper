describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/savedSchedules/1");
    cy.get('[data-testid="saved-schedule-title"]').should("exist");
  });
});
