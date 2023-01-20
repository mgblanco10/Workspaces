require('dotenv').config()

const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const {Location, Workspace } = require('../../../models')
const { NotFoundError } = require('errors')
const retrieveWorkspaces = require('.')


const { MONGO_URL_TEST } = process.env
describe('retrieveWorkspaces', () => {
    beforeAll(() => connect(MONGO_URL_TEST))

    beforeEach(() =>  Promise.all([Workspace.deleteMany(), Location.deleteMany()]))

    it('retrieve all workspaces in a building', () => {  // happy path
       
        const location1 = new Location({
            name:'diagonal',
            address:'Carrer de Santjoanistes',
            image: 'jpg'
        })
        
        const workspace1 = new Workspace({
            location: location1.id,
            name:'office1',
            price: 50,
            image: 'jpg',
        })
        
        const workspace2 = new Workspace({
            location: location1.id,
            name:'office2',
            price: 45,
            image: 'jpg'
        })

        const workspace3 = new Workspace({
            location: location1.id,
            name:'office3',
            price: 50,
            image: 'jpg',
        })
        
        const workspace4 = new Workspace({
            location: location1.id,
            name:'office4',
            price: 45,
            image: 'jpg'
        })


        return Promise.all([
            location1.save(),
            workspace1.save(),
            workspace2.save(),
            workspace3.save(),
            workspace4.save()
        ])
            .then(([location1,workspace1,workspace2, workspace3,workspace4]) => {
               
                return retrieveWorkspaces(location1.id)
                    .then(workspaces => {
                        expect(workspaces).toHaveLength(4)

                        const _workspace1 = workspaces.find(workspace => workspace.id === workspace1.id)
                        expect(workspace1).toBeDefined()
                        //expect(_workspace1.location).toBeUndefined()

                        const _workspace2 = workspaces.find(workspace => workspace.id === workspace2.id)
                        expect(workspace2).toBeDefined()
                        // expect(_workspace2.location).toBeUndefined()

                        const _workspace3 = workspaces.find(workspace => workspace.id === workspace3.id)
                        expect(_workspace3).toBeDefined()
                        // expect(_workspace3.location).toBeUndefined()

                        const _workspace4 = workspaces.find(workspace => workspace.id === workspace4.id)
                        expect(_workspace4).toBeDefined()
                        // expect(_workspace4.location).toBeUndefined() 

                    })
            })
    })

    it('fails on non-existing workspace', () => {  // unhappy path
        const workspaceId = new ObjectId().toString()

        return retrieveWorkspaces(workspaceId)
            .catch(error => {
                expect(error).toBeInstanceOf(NotFoundError)
                expect(error.message).toEqual(`workspace with id ${workspaceId} not found`)
            })
    })

    afterAll(() => disconnect())
})