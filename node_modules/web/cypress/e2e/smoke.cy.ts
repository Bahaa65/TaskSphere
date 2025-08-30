describe('TaskSphere smoke', () => {
  it('loads home and navigates', () => {
    cy.visit('/');
    cy.contains('TaskSphere');
    cy.contains('Kanban').click();
    cy.contains('Kanban');
  });
});


