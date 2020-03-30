import { SingUpController } from './SingUpController'

describe('SingUp Controller', () => {
  test('should return 400 if no names is provided ', () => {
    const sut = new SingUpController()
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })
})
