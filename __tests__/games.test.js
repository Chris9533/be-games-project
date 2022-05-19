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
          .then((results) => {
              expect(results.body.msg).toBe("route not found")

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
          .then((results) => {

          
          expect(results.body.msg).toBe("review not found")
        })
      });
      test('400: responds with a message saying bad request if review_id is of the wrong data type', () => {
          return request(app)
          .get("/api/reviews/six")
          .expect(400)
          .then((results) => {

            expect(results.body.msg).toBe("bad request")

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
        .then((results) => {

            expect(results.body.msg).toBe("review not found")

        })
          
      });
      test('400: responds with message saying bad request when review_id is not a number', () => {
        const inc_votes = { inc_votes: -5 }

        return request(app)
        .patch("/api/reviews/three")
        .send(inc_votes)
        .expect(400)
        .then((results) => {

            expect(results.body.msg).toBe("bad request")
          
      });
    })
    test('400 responds with message saying bad request if the value of inc_votes is not a number', () => {
        const inc_votes = { inc_votes: "Three" }

        return request(app)
        .patch("/api/reviews/2")
        .send(inc_votes)
        .expect(400)
        .then((results) => {

            expect(results.body.msg).toBe("bad request")
          
      });
        
    });
    test('400 responds with message saying bad request if request body does not contain key of inc_votes ', () => {
        const inc_votes = { votes: 5 }

        return request(app)
        .patch("/api/reviews/2")
        .send(inc_votes)
        .expect(400)
        .then((results) => {

            expect(results.body.msg).toBe("bad request")
          
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

  describe('GET /api/reviews', () => {
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
                owner: expect.any(String),
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
     

        expect(reviews.length).toBe(13);
        expect(reviews).toBeSortedBy("created_at", {descending: true})
        expect(reviews[0]).toEqual({
          review_id: 7,
          title: 'Mollit elit qui incididunt veniam occaecat cupidatat',
          category: 'social deduction',
          owner: 'mallionaire',
          review_img_url: 'https://images.pexels.com/photos/278888/pexels-photo-278888.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          created_at: '2021-01-25T11:16:54.963Z',
          votes: 9,
          comment_count: 0
        })

      })
    
  });
    
  });

describe('GET /api/reviews/:review_id/comments', () => {
  test('200: responds with an array of comments for the given review_id', () => {
    return request(app)
        .get("/api/reviews/2/comments")
        .expect(200)
        .then((results) => {

          const comments = results.body.comments

          expect(comments.length).toBe(3);
          comments.forEach((comment) => {
              expect(comment).toMatchObject({
                review_id: expect.any(Number),
                created_at: expect.any(String),
                votes: expect.any(Number),
                body: expect.any(String),
                author: expect.any(String),
                comment_id: expect.any(Number)

              })

          })

        })
  });
  test('200: responds with an empty array if the review exists but there is no comments to show', () => {
    return request(app)
    .get("/api/reviews/1/comments")
    .expect(200)
    .then((results) => {

      const comments = results.body.comments

      expect(comments).toEqual([]);

    })
    
  });
  test('404: responds with not found if number is valid  but doesn\'t match an Id in path', () => {
    return request(app)
    .get("/api/reviews/99/comments")
    .expect(404)
    .then((results) => {

      expect(results.body.msg).toBe("review not found")

    })
    
  });
  test('400: responds with bad request if not a number passed as the id', () => {
    return request(app)
    .get("/api/reviews/one/comments")
    .expect(400)
    .then((results) => {

      expect(results.body.msg).toBe("bad request")

    })
    
  });
  
  
});
describe('POST /api/reviews/review_id/comments ', () => {
  test('201: responds with the newly created comment', () => {
    const data = { username: "mallionaire", body: "it was great" }
  
    return request(app)
    .post("/api/reviews/2/comments")
    .send(data)
    .expect(201)
    .then((results) => {
      const comment = results.body.comment
  
      expect(comment).toEqual({
        body: 'it was great',
        votes: 0,
        author: 'mallionaire',
        review_id: 2,
        created_at: expect.any(String),
        comment_id: 7
      })
  
    })
  
    
  });
  test('400 responds with a message saying bad request if body does not contain both mandatory keys', () => {
    const data = { username: "mallionaire" }
  
    return request(app)
    .post("/api/reviews/2/comments")
    .send(data)
    .expect(400)
    .then((results) => {

      expect(results.body.msg).toBe("bad request")

    })
  });
  test('404 responds with a message saying not found if review_id in path does not exist', () => {
    const data = { username: "mallionaire", body: "it was great" }
  
    return request(app)
    .post("/api/reviews/95/comments")
    .send(data)
    .expect(404)
    .then((results) => {

      expect(results.body.msg).toBe("not found")

    })
  });
  test('404 responds with message saying not found if username does not exist on the database', () => {
    const data = { username: "Gandhi", body: "it was great" }
  
    return request(app)
    .post("/api/reviews/2/comments")
    .send(data)
    .expect(404)
    .then((results) => {

      expect(results.body.msg).toBe("not found")

    })
  });
  test('400: responds with bad request if not a number passed as the id', () => {
    const data = { username: "Gandhi", body: "it was great" }
    return request(app)
    .post("/api/reviews/two/comments")
    .send(data)
    .expect(400)
    .then((results) => {

      expect(results.body.msg).toBe("bad request")

    })
    
  });
  
});  