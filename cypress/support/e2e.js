import "./commands";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false; // Prevent Cypress from failing on uncaught exceptions
});
