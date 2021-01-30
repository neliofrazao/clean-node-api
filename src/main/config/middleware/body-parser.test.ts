import request from 'supertest'
import app from '../app'

describe('Body Parser Middleware', () => {
  test('should parser bosy as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'body_parser' })
      .expect({ name: 'body_parser' })
  })
})
