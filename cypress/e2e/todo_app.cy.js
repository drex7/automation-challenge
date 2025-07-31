describe("Todo App UI Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should login with valid credentials", () => {
    cy.login("admin", "admin123");
    cy.get(".navbar").should("contain", "Welcome, admin");
  });

  it("should fail login with invalid credentials", () => {
    cy.login("wronguser", "wrongpass");
    cy.get(".alert-error").should("contain", "Invalid credentials");
  });

  it("should create a new item", () => {
    cy.login("admin", "admin123");
    cy.get("button").contains("Add Item").click();
    cy.get('input[placeholder="Title"]').type("Test Todo");
    cy.get('textarea[placeholder="Description"]').type("Test Description");
    cy.get('input[type="date"]').type("2025-08-15");
    cy.get("select").eq(0).select("In Progress");
    cy.get("select").eq(1).select("Medium");
    cy.get("button").contains("Create").click();
    cy.get("table").should("contain", "Test Todo");
    cy.get("table").should("contain", "Test Description");
    cy.get("table").should("contain", "8/15/2025");
    cy.get("table").should("contain", "In Progress");
    cy.get("table").should("contain", "Medium");
  });

  it("should edit an existing item", () => {
    cy.login("admin", "admin123");
    cy.get("table")
      .contains("Finish project")
      .parent("tr")
      .find("button")
      .contains("Edit")
      .click();
    cy.get('input[placeholder="Title"]').clear().type("Updated Project");
    cy.get('textarea[placeholder="Description"]')
      .clear()
      .type("Updated Description");
    cy.get('input[type="date"]').clear().type("2025-08-20");
    cy.get("select").eq(0).select("Completed");
    cy.get("select").eq(1).select("High");
    cy.get("button").contains("Update").click();
    cy.get("table").should("contain", "Updated Project");
    cy.get("table").should("contain", "Updated Description");
    cy.get("table").should("contain", "8/20/2025");
    cy.get("table").should("contain", "Completed");
    cy.get("table").should("contain", "High");
  });

  it("should delete an item", () => {
    cy.login("admin", "admin123");
    cy.get("table")
      .contains("Plan meeting")
      .parent("tr")
      .find("button")
      .contains("Delete")
      .click();
    cy.get("table").should("not.contain", "Plan meeting");
  });

  it("should take a visual snapshot after login", () => {
    cy.login("admin", "admin123");
    cy.percySnapshot("Dashboard after login");
  });
});
