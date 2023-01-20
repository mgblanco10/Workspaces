require('dotenv').config()

const { connect, disconnect } = require('mongoose')
const { User } = require('../../../models')
const { DuplicityError } = require('errors')
const registerUser = require('.')

const { env: { MONGO_URL_TEST}} = process


describe('registerUser', () => {
    beforeAll(() => connect(MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on new user', () => {  
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = '123123123'

        return registerUser(name, email, password)
            .then(res => {
                expect(res).toBeUndefined()

                return User.find({ email })
            })
            .then(users => {
                expect(users).toHaveLength(1)

                const [user] = users

                expect(user.name).toEqual(name)
                expect(user.email).toEqual(email)
                expect(user.password).toEqual(password)
            })
    })

    it('fails on existing user', () => {  // unhappy path
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = '123123123'

        return User.create({ name, email, password })
            .then(() => registerUser(name, email, password))
            .catch(error => {
                expect(error).toBeInstanceOf(DuplicityError)
                expect(error.message).toEqual('user already exists')
            })
    })

    afterAll(() => disconnect())
})