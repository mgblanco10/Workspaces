require('dotenv').config()
const { connect, disconnect, Types: { ObjectId } } = require("mongoose")
const { User, Reservation, Workspace, Location} = require('../../../models')
const { NotFoundError } = require('errors')
const retrieveReservations = require( '.' )
const { env: { MONGO_URL_TEST } } = process

describe('retrieveReservations', () => {
    beforeAll(() => connect(MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Reservation.deleteMany(), Workspace.deleteMany(), Location.deleteMany()]))

    it('succeeds on existing user and reservation', () => {  // happy path
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = '123123123'

        const location = new Location({
            name:'diagonal',
            address:'Carrer de Santjoanistes',
            image: 'jpg'
        })
        
        const workspace1 = new Workspace({
            location: location.id,
            name:'office1',
            price: 50,
            image: 'jpg',

        })
        
        const workspace2 = new Workspace({
            location: location.id,
            name:'office2',
            price: 45,
            image: 'jpg'
        })
        
        const user = new User({ name, email, password })
        const date = new Date

        const reservation1 = new Reservation({
            user: user.id,
            location: location.id,
            workspace: workspace1.id,
            date
        })

        const reservation2 = new Reservation({
            user: user.id,
            location: location.id,
            workspace: workspace2.id,
            date
        })

        return Promise.all([
            user.save(),
            location.save(),
            workspace1.save(),
            workspace2.save(),
            reservation1.save(),
            reservation2.save()
        ])
            .then(([user, , , , reservation1, reservation2]) => {
 
                return retrieveReservations(user.id)
                    .then(reservations => {
                        expect(reservations).toHaveLength(2)

                        const _reservation1 = reservations.find(reservation => reservation.id === reservation1.id)
                        expect(_reservation1).toBeDefined()
                        expect(_reservation1.user).toBeUndefined()
                        expect(_reservation1.createdAt).toEqual(reservation1.createdAt)
                        expect(_reservation1.modifiedAt).toBeUndefined()

                        const _reservation2 = reservations.find(reservation => reservation.id === reservation2.id)
                        expect(_reservation2).toBeDefined()
                        expect(_reservation2.user).toBeUndefined()
                        expect(_reservation2.createdAt).toEqual(reservation2.createdAt)
                        expect(_reservation2.modifiedAt).toBeUndefined()

                    })
            })
    })

    it('fails on non-existing user', () => {  // unhappy path
        const userId = new ObjectId().toString()

        return retrieveReservations(userId)
            .catch(error => {
                expect(error).toBeInstanceOf(NotFoundError)
                expect(error.message).toEqual(`user with id ${userId} not found`)
            })
    })

    afterAll(() => disconnect())
})