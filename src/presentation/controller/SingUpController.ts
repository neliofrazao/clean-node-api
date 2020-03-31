import { HttpResponse, HttpRequest } from '../protocols/http'
import { InvalidParamError, MissingParamError } from '../erros'
import { Controller, EmailValidator } from '../protocols'
import { badRequest, serverError } from '../helpers/http-helpers'

export class SingUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      const { email, password, passwordConfirmation } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
