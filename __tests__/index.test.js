const data = require("../db/data/test-data/index")


describe('Exports test', () => {
    test('index.js should export an object with the relevant keys', () => {

        expect(Object.keys(data)).toEqual([ 'categoryData', 'commentData', 'reviewData', 'userData' ])
        expect(typeof data).toBe("object")
        
    });
    
});