require('dotenv').config()
const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const {Location, User} = require('../../../models')
const { NotFoundError } = require('errors')
const retrieveLocation = require('.')
const { MONGO_URL_TEST } = process.env

describe('retrieveLocations', () => {
    beforeAll(() => connect(MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Location.deleteMany()]))

    it('retrieveLocations', () => {  // happy path
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = '123123123'

        const location1 = new Location({
            name:'diagonal',
            address:'Carrer de Santjoanistes',
            image: 'jpg'
        })
        const location2 = new Location({
            name:'pobleNou',
            address:'Carrer de Llacuna',
            image: 'jpg'
        })

        const user = new User({ name, email, password })

        return Promise.all([
            user.save(),
            location1.save(),
            location2.save()

        ])
            .then(([user, location1, location2]) =>
                retrieveLocation(user.id)
                    .then(locations => {
                        expect(locations).toHaveLength(2)

                        const _location1 = locations.find(location => location.id === location1.id)
                        expect(_location1).toBeDefined()
                        expect(_location1.user).toBeUndefined()
   
                        const _location2 = locations.find(location => location.id === location2.id)
                        expect(_location2).toBeDefined()
                        expect(_location2.user).toBeUndefined()
        
                    })
            )
    })

    it('fails on non-existing user', () => {  // unhappy path
        const userId = new ObjectId().toString()

        return retrieveLocation(userId)
            .catch(error => {
                expect(error).toBeInstanceOf(NotFoundError)
                expect(error.message).toEqual(`user with id ${userId} not found`)
            })
    })

    afterAll(() => disconnect())
})