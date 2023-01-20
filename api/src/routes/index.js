const express = require('express')
const { Router, json } = express
const jsonBodyParser = json()
const { registerUserHandler, authenticateUserHandler, retrieveUserHandler, updateUserEmailHandler, updateUserPasswordHandler } = require('./users')
const { retrieveLocationsHandler } = require('./locations')
const {createReservationHandler, retrieveAllReservationsHandler, retrieveReservationHandler, deleteReservationHandler} =require('./reservations')
const{retrieveWorkspacesHandler} = require ('./workspaces')


const usersRouter = Router()

usersRouter.post('/users', jsonBodyParser, registerUserHandler)
usersRouter.post('/users/auth', jsonBodyParser, authenticateUserHandler)
usersRouter.get('/users', retrieveUserHandler)
usersRouter.patch('/users/email/',jsonBodyParser, updateUserEmailHandler)
usersRouter.patch('/users/password/',jsonBodyParser, updateUserPasswordHandler)

const locationsRouter = Router ()

locationsRouter.get('/locations/:locationsId/workspaces', retrieveWorkspacesHandler)
locationsRouter.get('/locations', retrieveLocationsHandler)

const workspacesRouter = Router()

workspacesRouter.get('/workspaces/reservations', retrieveAllReservationsHandler)
workspacesRouter.post('/workspaces/:workspaceId/reservations', jsonBodyParser, createReservationHandler)
workspacesRouter.get('/workspaces/:reservationId', retrieveReservationHandler)
workspacesRouter.delete('/workspaces/:reservationId', deleteReservationHandler)



module.exports = {
    usersRouter,
    locationsRouter,
    workspacesRouter
}

