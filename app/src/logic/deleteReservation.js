import { validateText, validateCallback } from 'validators'
import { ClientError, ServerError } from 'errors'
const API_URL = process.env.REACT_APP_API_URL;


/**
 * Deletes a question from database
 *
 * @param {string} token The user session token
 * @param {string} questionId The question identifier
 * @param {function} callback The function expression that provides a result
 *
 * @throws {TypeError} On invalid inputs
 */

function deleteReservation(token, reservationId, callback) {
    validateText(token)
    validateText(reservationId)
    validateCallback(callback)

    const xhr = new XMLHttpRequest

    // response

    xhr.onload = function () {
        const status = xhr.status

        if (status >= 500)
            callback(new ServerError(`server error (${status})`))
        else if (status >= 400)
            callback(new ClientError(`client error (${status})`))
        else if (status === 204)
            callback(null)
    }


    xhr.open('DELETE', `${API_URL}/workspaces/${reservationId}`)

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    xhr.setRequestHeader('Content-type', 'application/json')

    xhr.send()
}

export default deleteReservation