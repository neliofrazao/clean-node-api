
import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

describe('EmailValidator Adapter', () => {
  test('should return true if validator returns true', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(true)
    const sut = new EmailValidatorAdapter()
    const isalid = sut.isValid('valid_email@mail.com')

    expect(isalid).toBe(true)
  })

  test('should return false if validator returns false', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const sut = new EmailValidatorAdapter()
    const isalid = sut.isValid('invalid_email@mail.com')

    expect(isalid).toBe(false)
  })

  test('should call validator with correct email', () => {
    const isEmailSpay = jest.spyOn(validator, 'isEmail').mockReturnValueOnce(true)
    const sut = new EmailValidatorAdapter()
    sut.isValid('any_email@mail.com')

    expect(isEmailSpay).toHaveBeenCalledWith('any_email@mail.com')
  })
})