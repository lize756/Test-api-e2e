/**
 * This test verifies the deletion of a book from the API
 */

/**
 * ARR: Arrange: Organized here are the items I need to run the tests
 */
const baseURL = "http://localhost:9090/books";

let bookToDelete = {};

/**
 * ACT: Act :
 * Here the methods or functions that you want to test are called
 */

const getBooks = () => {
  let position = 0;
  cy.request("GET", `${baseURL}`)
    .its("body")
    .then((result) => {
      position = Math.floor(Math.random() * result.length);
      bookToDelete = result[position];
      console.log(bookToDelete);
      cy.log("Book to delete", bookToDelete);
    });
};

describe("Verify if it can remove a element to the API", () => {
  beforeEach(() => {
    getBooks();
  });
  it("Allows verify if the reponds was 200 Ok and the element is remove", () => {
    cy.request("DELETE", `${baseURL}/${bookToDelete.id}`).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(bookToDelete);
    });
  });

  it("Allows verify what happens when you tried to delete a non-existing object", () => {
    cy.request({
      method: "DELETE",
      url: `${baseURL}` + "/" + 131313131313,
      failOnStatusCode: false,
    }).then((response) => {
      expect(404).to.eq(response.status);
      assert.notEqual(response.status, "200");
      expect(response.body.error).to.eq("NOT FOUND");
    });
  });
});
