import { HttpResponse, HttpRequest } from '../protocols/http'
import { InvalidParamError, MissingParamError } from '../erros'
import { Controller, EmailValidator } from '../protocols'
import { badRequest, serverError } from '../helpers/http-helpers'
import { AddAccount } from '../../domain/useCases/add-account'

export class SingUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      const { name, email, password, passwordConfirmation } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
      }
      if (password !== passwordConfirmation) return badRequest(new InvalidParamError('passwordConfirmation'))
      if (!isValid) return badRequest(new InvalidParamError('email'))

      this.addAccount.add({
        name,
        email,
        password
      })
    } catch (error) {
      return serverError()
    }
  }
}
