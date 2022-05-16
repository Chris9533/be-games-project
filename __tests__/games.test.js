const request = require("supertest")
const app = require("../app.js")
const db = require("../db/connection.js")
const seed = require("../db/seeds/seed")
const testData = require("../db/data/test-data/index")
const { query } = require("../db/connection.js")

beforeEach(() => seed(testData))

afterAll(() => {
    db.end();
  });

  describe('GET /api/categories', () => {
      test('200: responds with an array of objects each with a slug and description key ', () => {
          return request(app)
          .get("/api/categories")
          .expect(200)
          .then((results) => {

            const categories = results.body.categories;

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

  describe('GET /api/reviews/:review_id', () => {
      test('200: responds with a review object of the review requested', () => {
          return request(app)
          .get("/api/reviews/2")
          .expect(200)
          .then((results) => {

            const review = results.body.review
            
         
            expect(review.length).toBe(1)
            
          

            expect(review[0]).toMatchObject({
                review_id: expect.any(Number),
                title: expect.any(String),
                review_body: expect.any(String),
                designer: expect.any(String),
                review_img_url: expect.stringMatching("https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png"),
                votes: expect.any(Number),
                category: expect.any(String),
                owner: expect.any(String),
                created_at: expect.any(String)
            })


          })
          
      });
      test('404: responds with message saying route not found when no review with requested id', () => {
          return request(app)
          .get("/api/reviews/28")
          .expect(404)
          .then(({body}) => {

          
          expect(body.msg).toBe("review not found")
        })
      });
      test('400: responds with a message saying bad request if review_id is of the wrong data type', () => {
          return request(app)
          .get("/api/reviews/six")
          .expect(400)
          .then(({body}) => {

            expect(body.msg).toBe("bad request")

          })
          
      });
      
  });