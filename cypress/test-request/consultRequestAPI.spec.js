/**
 * This test has verified if it can query a book stored in the API
 */
const baseURL = "http://localhost:9090/books";

/**
 * ACT: Act :
 * Here the methods or functions that you want to test are called,
 */
const bookToConsult = {
  id: "42ed1598-3857-4711-bf0d-8e520218f257",
  name: "Don't Make Me Think: A Common Sense Approach to Web Usability",
  author: "Steve Krug",
};

describe("Verify if  elements can be consult of the API", () => {
  it("Allows verify if the reponds was 200 Ok", () => {
    cy.request("GET", `${baseURL}`).then((response) => {
      expect(response.status).to.eq(200);
      assert.isArray(response.body, "Books response is an array");
      assert.isObject(response.body[0], "This element is object");
    });
  });

  it("Check if the elements inside of the json file contains the keys: id, name and author", () => {
    cy.request("GET", `${baseURL}`).then((response) => {
      expect(response.body[0]).to.have.all.keys("id", "name", "author");
    });
  });

  it("Verifies that when only one book is consulted an error 405 is returned", () => {
    cy.request({
      method: "GET",
      url: `${baseURL}/${bookToConsult.id}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(405);
      expect(response.body.error).to.eq("Method Not Allowed");
    });
  });
});
