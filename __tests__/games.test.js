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
    test('200: responds with an array of review objects sorted by date in descending order by default', () => {
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
  test('200: responds with an array of review objects sorted by other valid collums', () => {
    return request(app)
    .get("/api/reviews?sort_by=votes")
    .expect(200)
    .then((results) => {

      const reviews = results.body.reviews
     
   

      expect(reviews.length).toBe(13);
      expect(reviews).toBeSortedBy("votes", {descending: true})
      expect(reviews[0]).toEqual({
        review_id: 12,
        title: "Scythe; you're gonna need a bigger table!",
        owner: 'mallionaire',
        review_img_url: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
        category: 'social deduction',
        created_at: '2021-01-22T10:37:04.839Z',
        votes: 100,
        comment_count: 0
      })
      
    })
  
});
test('200: As well as sorting user should be able to choose the order in which the data is returned', () => {
  return request(app)
  .get("/api/reviews?sort_by=votes&order=ASC")
  .expect(200)
  .then((results) => {

    const reviews = results.body.reviews
   

    expect(reviews.length).toBe(13);
    expect(reviews).toBeSortedBy("votes")
    expect(reviews[0]).toEqual({
      review_id: 1,
      title: 'Agricola',
      owner: 'mallionaire',
      review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
      category: 'euro game',
      created_at: '2021-01-18T10:00:20.514Z',
      votes: 1,
      comment_count: 0
    })
    
  })

});
test('200: returns an array of objects filtered by a valid category', () => {
  return request(app)
  .get("/api/reviews?category=social deduction")
  .expect(200)
  .then((results) => {

    const reviews = results.body.reviews
    

    expect(reviews.length).toBe(11);
    reviews.forEach((review) => {
      expect(review).toMatchObject({
        review_id: expect.any(Number),
        title: expect.any(String),
        category: "social deduction",
        owner: expect.any(String),
        review_img_url: expect.any(String),
        created_at: expect.any(String),
        votes: expect.any(Number),
        comment_count: expect.any(Number)
      })

  })
    
  })

});
test('200: sort_by order and category querys can all be put in one request and return an array of objects', () => {
  return request(app)
  .get("/api/reviews?sort_by=votes&order=ASC&category=social deduction")
  .expect(200)
  .then((results) => {

    const reviews = results.body.reviews

    expect(reviews.length).toBe(11);
    expect(reviews).toBeSortedBy("votes")
    expect(reviews[0]).toEqual({
      review_id: 3,
      title: 'Ultimate Werewolf',
      owner: 'bainesface',
      review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
      category: 'social deduction',
      created_at: '2021-01-18T10:01:41.251Z',
      votes: 5,
      comment_count: 3
    })
    
  })

});
test('200: responds with an empty array if the category exists but no reviews are associated with it', () => {
  return request(app)
  .get("/api/reviews?category=children's games")
  .expect(200)
  .then((results) => {

    const reviews = results.body.reviews
    

    expect(reviews).toEqual([]);
    
  })

});
test('400: responds with bad request if sort_by is not valid', () => {
  return request(app)
  .get("/api/reviews?sort_by=apples")
  .expect(400)
  .then((results) => {

    expect(results.body.msg).toBe("bad request")

  })
  
});
test('400: responds with bad request if order is not valid', () => {
  return request(app)
  .get("/api/reviews?sort_by=votes&order=any")
  .expect(400)
  .then((results) => {

    expect(results.body.msg).toBe("bad request")

  })
  
});
test('404: responds with not found if category doesn\'t exist', () => {
  return request(app)
  .get("/api/reviews?sort_by=votes&order=ASC&category=unknown")
  .expect(404)
  .then((results) => {

    expect(results.body.msg).toBe("not found")

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

describe('DELETE /api/comments/:comment_id', () => {
  test('204: responds with correct status code and an empty body', () => {
    return request(app)
    .delete("/api/comments/1")
    .expect(204)
    .then((results) => {
      expect(results.body).toEqual({})

    })
    
  });
  test('404: responds with message saying comment not found if comment_id doesn\'t exist', () => {
    return request(app)
    .delete("/api/comments/967")
    .expect(404)
    .then((results) => {
      expect(results.body.msg).toBe("comment not found")

    })
    
  });
  test('400: responds with message saying bad request if comment_id is not a number', () => {
    return request(app)
    .delete("/api/comments/two")
    .expect(400)
    .then((results) => {
      expect(results.body.msg).toBe("bad request")

    })
    
  });
});

describe('GET /api', () => {
  test('200: responds with a JSON describing all available endpoints on the api', () => {
    return request(app)
    .get("/api")
    .expect(200)
    .then((results) => {
      const endpoints = results.body

      expect(endpoints).toEqual(expect.objectContaining({
        "GET /api": {
          "description": "serves up a json representation of all the available endpoints of the api"
        },
        "GET /api/categories": {
          "description": "serves an array of all categories",
          "queries": [],
          "exampleResponse": {
            "categories": [
              {
                "description": "Players attempt to uncover each other's hidden role",
                "slug": "Social deduction"
              }
            ]
          }
        },
        "GET /api/reviews": {
          "description": "serves an array of all reviews",
          "queries": ["category", "sort_by", "order"],
          "exampleResponse": {
            "reviews": [
              {
                "title": "One Night Ultimate Werewolf",
                "designer": "Akihisa Okui",
                "owner": "happyamy2016",
                "review_img_url": "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                "category": "hidden-roles",
                "created_at": 1610964101251,
                "votes": 5
              }
            ]
          }
        },
        "GET /api/reviews/:review_id": {
          "description": "serves an object of the requested review",
          "queries": [],
          "exampleResponse": {
            "review": 
              {
                "title": "One Night Ultimate Werewolf",
                "designer": "Akihisa Okui",
                "owner": "happyamy2016",
                "review_img_url": "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                "category": "hidden-roles",
                "created_at": 1610964101251,
                "votes": 5
              }
          }
        },
        "GET /api/reviews/:review_id/comments": {
          "description": "serves an array of comments that matches the review_id",
          "queries": [],
          "exampleResponse": {
            "comments": [
              {
                "body": "I loved this game too!",
                "votes": 16,
                "author": "bainesface",
                "review_id": 2,
                "created_at": "new Date(1511354613389)",
                "comment_id": 1
              }
            ]
          }
        },
        "GET /api/users": {
          "description": "serves an array of users",
          "queries": [],
          "exampleResponse": {
            "users": [
              {
                "username": "mallionaire",
                "name": "haz",
                "avatar_url":
                  "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
              }
            ]
          }
        },
        "POST /api/reviews/:review_id/comments": {
          "description": "adds a new comment to the database and responds with the newly created comment",
          "queries": [],
          "exampleResponse": {
            "comment": 
              {
                "body": "It was great",
                "votes": 0,
                "author": "bainesface",
                "review_id": 2,
                "created_at": "new Date(1511354613389)",
                "comment_id": 17
              }
            
          }
        },
        "PATCH /api/reviews/:review_id": {
          "description": "alters the votes in the requested reviews by what the user has requested and then responds with the updated review",
          "queries": [],
          "exampleResponse": {
            "comment": {
              "review_id": 2,
              "title": "Jenga",
              "category": "dexterity",
              "designer": "Leslie Scott",
              "owner": "philippaclaire9",
              "review_body": "Fiddly fun for all the family",
              "review_img_url": "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
              "created_at": "2021-01-18T10:01:41.251Z",
              "votes": 55
            }
          }
        },
        "DELETE /api/comments/:comment_id": {
          "description": "deletes the comment specified by the user and rsponds with an empty object",
          "queries": [],
          "exampleResponse": {
      
            "response" : {}
           
          }
        }
      }))


    })
    
  });
  
});

describe('GET /api/users/:username', () => {
  test('200: responds with an object of the user requested', () => {
    return request(app)
    .get("/api/users/philippaclaire9")
    .expect(200)
    .then((results) => {

      const user = results.body.user;

      expect(user).toEqual({
        username: 'philippaclaire9',
        name: 'philippa',
        avatar_url: 'https://avatars2.githubusercontent.com/u/24604688?s=460&v=4'
      });
      

    })
  });
  test('404: responds with message saying not found if username doesn\'t exist', () => {
    return request(app)
    .get("/api/users/darthVader")
    .expect(404)
    .then((results) => {
      expect(results.body.msg).toBe("user not found")

    })
    
  });
  
});