import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AddAccountModel } from './../../../../domain/useCases/add-account'
import { AccountModel } from './../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMOngoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const results = await accountCollection.insertOne(accountData)
    const account = results.ops[0]
    const { _id, ...accountWithoutId } = account

    return Object.assign({}, accountWithoutId, { id: _id })
  }
}
