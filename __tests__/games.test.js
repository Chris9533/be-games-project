const request = require("supertest")
const app = require("../app.js")
const db = require("../db/connection.js")
const seed = require("../db/seeds/seed")
const testData = require("../db/data/test-data/index")
require('jest-sorted');


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
            
            expect(review).toEqual(expect.objectContaining({
                review_id: 2,
                title: 'Jenga',
                category: 'dexterity',
                designer: 'Leslie Scott',
                owner: 'philippaclaire9',
                review_body: 'Fiddly fun for all the family',
                review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                created_at: '2021-01-18T10:01:41.251Z',
                votes: 5
              }))


          })
          
      });
      test('200: responds with a review object of the review requested with a comment_count key and a value of how many comments reference that review', () => {
        return request(app)
        .get("/api/reviews/2")
        .expect(200)
        .then((results) => {

          const review = results.body.review
          
          expect(review).toEqual({
              review_id: 2,
              title: 'Jenga',
              category: 'dexterity',
              designer: 'Leslie Scott',
              owner: 'philippaclaire9',
              review_body: 'Fiddly fun for all the family',
              review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
              created_at: '2021-01-18T10:01:41.251Z',
              votes: 5,
              comment_count: 3
            })


        })
          
      });
      test('404: responds with message saying review not found when no review with requested id', () => {
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

  describe('PATCH /api/reviews/review_id', () => {
      test('200: responds with a review with it\'s votes counter altered by the correct amount', () => {
          const inc_votes = { inc_votes: 50 }

          return request(app)
          .patch("/api/reviews/2")
          .send(inc_votes)
          .expect(200)
          .then((results) => {
            const review = results.body.review

            expect(review).toEqual({
                review_id: 2,
                title: 'Jenga',
                category: 'dexterity',
                designer: 'Leslie Scott',
                owner: 'philippaclaire9',
                review_body: 'Fiddly fun for all the family',
                review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                created_at: '2021-01-18T10:01:41.251Z',
                votes: 55
              })

          })

          
      });
      test('404: responds with message saying review not found when no review with requested id ', () => {
        const inc_votes = { inc_votes: -5 }

        return request(app)
        .patch("/api/reviews/87654")
        .send(inc_votes)
        .expect(404)
        .then(({body}) => {

            expect(body.msg).toBe("review not found")

        })
          
      });
      test('400: responds with message saying bad request when review_id is not a number', () => {
        const inc_votes = { inc_votes: -5 }

        return request(app)
        .patch("/api/reviews/three")
        .send(inc_votes)
        .expect(400)
        .then(({body}) => {

            expect(body.msg).toBe("bad request")
          
      });
    })
    test('400 responds with message saying bad request if the value of inc_votes is not a number', () => {
        const inc_votes = { inc_votes: "Three" }

        return request(app)
        .patch("/api/reviews/2")
        .send(inc_votes)
        .expect(400)
        .then(({body}) => {

            expect(body.msg).toBe("bad request")
          
      });
        
    });
    test('400 responds with message saying bad request if request body does not contain key of inc_votes ', () => {
        const inc_votes = { votes: 5 }

        return request(app)
        .patch("/api/reviews/2")
        .send(inc_votes)
        .expect(400)
        .then(({body}) => {

            expect(body.msg).toBe("bad request")
          
      });
        
    });

      
  });

  describe('GET /api/users', () => {
    test('200: responds with an array of objects with username, name and  avatar_url properties', () => {
        return request(app)
        .get("/api/users")
        .expect(200)
        .then((results) => {

          const users = results.body.users;

          expect(users.length).toBe(4);
          users.forEach((user) => {
              expect(user).toMatchObject({
                  username: expect.any(String),
                  name: expect.any(String),
                  avatar_url: expect.any(String)
              })

          })

        })
        
    });
      
  });

  describe.only('GET /api/reviews', () => {
    test('200: responds with an array of review objects including comment_count', () => {
        return request(app)
        .get("/api/reviews")
        .expect(200)
        .then((results) => {

          const reviews = results.body.reviews

          expect(reviews.length).toBe(13);
          reviews.forEach((review) => {
              expect(review).toMatchObject({
                review_id: expect.any(Number),
                title: expect.any(String),
                category: expect.any(String),
                designer: expect.any(String),
                owner: expect.any(String),
                review_body: expect.any(String),
                review_img_url: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                comment_count: expect.any(Number)
              })

          })

        })
      
    });
    test('200: responds with an array of review objects sorted by date in descending order', () => {
      return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((results) => {

        const reviews = results.body.reviews
        console.log(reviews)

        expect(reviews.length).toBe(13);
        expect(reviews).toBeSortedBy("created_at", {descending: true})
        expect(reviews[0]).toEqual({
          review_id: 7,
          title: 'Mollit elit qui incididunt veniam occaecat cupidatat',
          category: 'social deduction',
          designer: 'Avery Wunzboogerz',
          owner: 'mallionaire',
          review_body: 'Consectetur incididunt aliquip sunt officia. Magna ex nulla consectetur laboris incididunt ea non qui. Enim id eiusmod irure dolor ipsum in tempor consequat amet ullamco. Occaecat fugiat sint fugiat mollit consequat pariatur consequat non exercitation dolore. Labore occaecat in magna commodo anim enim eiusmod eu pariatur ad duis magna. Voluptate ad et dolore ullamco anim sunt do. Qui exercitation tempor in in minim ullamco fugiat ipsum. Duis irure voluptate cupidatat do id mollit veniam culpa. Velit deserunt exercitation amet laborum nostrud dolore in occaecat minim amet nostrud sunt in. Veniam ut aliqua incididunt commodo sint in anim duis id commodo voluptate sit quis.',
          review_img_url: 'https://images.pexels.com/photos/278888/pexels-photo-278888.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          created_at: '2021-01-25T11:16:54.963Z',
          votes: 9,
          comment_count: 0
        })

      })
    
  });
    
  });

  