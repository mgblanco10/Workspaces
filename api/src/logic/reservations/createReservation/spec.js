require( 'dotenv' ).config()

const { connect, disconnect, Types: { ObjectId } } = require( 'mongoose' )
const { User, Reservation, Workspace, Location } = require( '../../../models' )
const { DuplicityError, NotFoundError } = require( 'errors' )
const createReservation = require( '.' )

const { env: { MONGO_URL_TEST } } = process

describe( 'createReservation', () => {

    beforeAll( () => connect( MONGO_URL_TEST ) )

    beforeEach( () => Promise.all( [User.deleteMany(), Reservation.deleteMany(), Workspace.deleteMany(), Location.deleteMany()] ) )

    it( 'user manages to make a reservation of a space', () => { //happy path
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = '123123123'

     const user = new User( { name, email, password } )
        const date = new Date

        const location = new Location( {
            name: 'diagonal',
            address: 'Carrer de Santjoanistes',
            image: 'jpg'
        } )

        const workspace1 = new Workspace( {
            location: location.id,
            name: 'office1',
            price: 50,
            image: 'jpg',
        } )
        const reservation = new Reservation( {
            user: user.id,
            workspace: workspace1.id,
            date: new Date('2022-02-04')

        } )

        return Promise.all( [
            user.save(),
            location.save(),
            workspace1.save(),
            reservation.save()
        ] )
            .then( () => {

                return User.create( user.name, user.email, user.password )
                    .then( user =>

                        createReservation(user.id, workspace1.id, reservation.date)
                            .then( res => {

                                expect( res ).toBeUndefined()

                                return Reservation.find()
                            } )
                            .then(reservations => {
                                expect( reservations ).toHaveLength( 1 )

                                const [reservation] = reservations
                                expect( reservation.workspace ).toEqual( workspace1._id )
                                expect( reservation.createdAt ).toBeInstanceOf( Date )
                                expect( reservation.modifiedAt ).toBeUndefined()
                            } )
                    )
            } )
    } )

    it( 'fails on non-existing user', () => {  //   unhappy path
                
        const date = new Date

        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = '123123123'
        const user = new User( { name, email, password } )
        

        const location1 = new Location( {
            name: 'diagonal',
            address: 'Carrer de Santjoanistes',
            image: 'jpg'
        } )


        const workspace2 = new Workspace( {
            location: location1.id,
            name: 'office1',
            date: new Date('2022-02-04'),
            price: 50,
            image: 'jpg',
        } )

        return Promise.all( [
            user.save(),
            location1.save(),
            workspace2.save()
        ] )
            .then( () => {

                return createReservation(user.id, workspace2.id, date )
                    .then( () => { throw new NotFoundError( `workspace with id ${workspace2.id} not found`) } )
                    .catch( error => {
                        expect( error ).toBeInstanceOf( Error)
                        expect( error.message ).toEqual(`workspace with id ${workspace2.id} not found`)
                    } )
            } )
    } )

    afterAll( () => disconnect() )
} )

