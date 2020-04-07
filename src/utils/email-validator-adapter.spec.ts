
import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

describe('EmailValidator Adapter', () => {
  test('should return true if validator returns true 123', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(true)
    const sut = new EmailValidatorAdapter()
    const isalid = sut.isValid('invalid_email@mail.com')

    expect(isalid).toBe(true)
  })

  test('should return false if validator returns false 223', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const sut = new EmailValidatorAdapter()
    const isalid = sut.isValid('invalid_email@mail.com')

    expect(isalid).toBe(false)
  })
})
