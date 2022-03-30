/**
 * This test verifies the correct update of a book in the API
 */

const baseURL = "http://localhost:9090/books";

let bookToUpdate = {};

//Correspond the book that it want to save
const bookToSave = {
  id: "120",
  name: "The Pragmatic Programmer",
  author: "Andy Hunt and Dave Thomas",
};
/**
 * ACT: Act :
 * Here the methods or functions that you want to test are called,
 */

const getBooks = () => {
  let position = 0;
  cy.request("GET", `${baseURL}`)
    .its("body")
    .then((result) => {
      position = Math.floor(Math.random() * result.length);
      bookToUpdate = result[position];
      cy.log("Book to put", bookToUpdate);
    });
};

describe("Verify if it can put a element to the API", () => {
  beforeEach(() => {
    getBooks();
    bookToUpdate.name = "This is a test";
    bookToUpdate.author = "Hello, I am";
  });
  it("Allows verify if the reponds was 200 Ok and the element is update", () => {
    cy.request("PUT", `${baseURL}/${bookToUpdate.id}`, bookToUpdate).then(
      (response) => {
        expect(response.status).to.eq(200);
        assert.isObject(response.body, "This element is object");
        expect(bookToUpdate.id).to.eq(response.body.id);
        expect(bookToUpdate.name).to.eq(response.body.name);
        expect(bookToUpdate.author).to.eq(response.body.author);
        cy.log(bookToUpdate);
      }
    );
  });

  it("Allows verify what happens when you want update a element that not exist. In this case the save element", () => {
    cy.request("PUT", `${baseURL}/${bookToSave.id}`, bookToSave).then(
      (response) => {
        expect(response.status).to.eq(200);
        cy.log(bookToSave);
      }
    );
  });
});
