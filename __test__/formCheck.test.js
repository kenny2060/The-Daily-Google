const request = require('supertest')
const app = require('../src/server/index')

beforeAll(()=> {
    process.env.NODE_ENV = 'test'
})

describe('Post Endpoints', () => {
    it('should create a new post', (done) => {
        request(app)
            .post('/userNews')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err)
                done()
            })
    })
})




// import { formHandler } from '../src/client/js/formHandler'

// describe("Validation", () => {
//     test("Check for vaild user input ", async () => {
//         const data = await ('http://localhost:8081/userNews', { userInput: 'Trump' })
//         expect(data.status).toBe(200)
//         // expect(formHandler).toBeDefined()
//     })
// })