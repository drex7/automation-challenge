Cypress.Commands.add("login", (username, password) => {
  cy.visit("/");
  cy.getBySel("login-button").click();
  cy.getBySel("username").type(username);
  cy.getBySel("password").type(password);
  cy.getBySel("login-submit").click();
});


Cypress.Commands.add("getBySel", (dataCyValue) => {
  return cy.get(`[data-cy="${dataCyValue}"]`);
});