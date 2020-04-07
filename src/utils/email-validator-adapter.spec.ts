
import { EmailValidatorAdapter } from './email-validator-adapter'

describe('EmailValidator Adapter', () => {
  test('should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    const isalid = sut.isValid('invalid_email@mail.com')

    expect(isalid).toBe(false)
  })
})
