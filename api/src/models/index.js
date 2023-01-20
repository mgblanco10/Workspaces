const { model } = require('mongoose')
const { user, workspace, location, reservation } = require('./schemas')

module.exports = {
    User: model('User', user),
    Workspace: model('Workspace', workspace),
    Location: model ('Location', location),
    Reservation: model ('Reservation', reservation )
}