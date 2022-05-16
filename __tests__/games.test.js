const request = require("supertest")
const app = require("../app.js")
const db = require("../db/connection.js")
const seed = require("../db/seeds/seed")
const testData = require("../db/data/test-data/index")

beforeEach(() => seed(testData))

afterAll(() => {
    db.end();
  });

  describe('GET /api/categories', () => {
      test('200: responds with an array of objects each with a slug and description key ', () => {
          return request(app)
          .get("/api/categories")
          .expect(200)
          .then(({body}) => {

            const categories = body;

            expect(categories.length).toBe(4);
            categories.forEach((category) => {
                expect(category).toMatchObject({
                    slug: expect.any(String),
                    description: expect.any(String)
                })

            })

          })
          
      });
      test('404: responds with a message saying route not found', () => {
          return request(app)
          .get("/api/apples")
          .expect(404)
          .then(({body}) => {
              expect(body.msg).toBe("route not found")

          })
          
      });
      
  });