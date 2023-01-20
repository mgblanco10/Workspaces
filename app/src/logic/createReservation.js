const {validateDate, validateString} = require('validators')

const API_URL = process.env.REACT_APP_API_URL

function createReservation(token, workspaceId, date, callback) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    validateString(workspaceId, 'workspace id')
    validateDate(new Date(date))
    if (token.trim().length === 0) throw new Error('token is empty or blank')

    if (typeof callback !== 'function') throw new TypeError('callback is not a function')

    const xhr = new XMLHttpRequest


    xhr.onload = function () {
        const status = xhr.status

        const json = xhr.responseText

        const data = JSON.parse(json)

        if (status >= 500)
            callback(new Error(`server error (${status})`))
        else if (status >= 400)
            callback(new Error(`client error (${status})`))
        else if (status === 201)
            callback(null, data.reservationId)
    }


    xhr.open('POST', `${API_URL}/workspaces/${workspaceId}/reservations`)

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    xhr.setRequestHeader('Content-type', 'application/json')

    const data = { date }
    const json = JSON.stringify(data)

    xhr.send(json)
}
export default createReservation