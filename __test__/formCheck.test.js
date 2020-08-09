const request = require('supertest')
const app = require('../src/server/index')

beforeAll(() => {
    process.env.NODE_ENV = 'test'
})

describe('Post Endpoints', () => {
    it('should receive status code 200', (done) => {
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