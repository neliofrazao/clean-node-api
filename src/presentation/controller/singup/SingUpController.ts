import { AddAccount, Controller, EmailValidator, HttpResponse, HttpRequest } from './singup-protocols'
import { InvalidParamError, MissingParamError } from '../../erros'
import { badRequest, serverError, ok } from '../../helpers/http-helpers'

export class SingUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      const { name, email, password, passwordConfirmation } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
      }
      if (password !== passwordConfirmation) return badRequest(new InvalidParamError('passwordConfirmation'))
      if (!isValid) return badRequest(new InvalidParamError('email'))

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (error) {
      return serverError()
    }
  }
}
