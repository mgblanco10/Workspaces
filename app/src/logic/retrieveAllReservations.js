import { validateCallback, validateString} from "validators"


const API_URL = process.env.REACT_APP_API_URL

function retrieveAllReservations (token, callback ) {
    if (typeof token !== 'string') throw new TypeError('Token is not a string')
    if (token.trim().length === 0) throw new Error('Token is empty or blank')
    validateCallback( callback )


    const xhr = new XMLHttpRequest

    xhr.onload = function () {
        const status = xhr.status

        const json = xhr.responseText

        const reservations = JSON.parse( json )
        
        if ( status >= 500 )
        callback( new Error( `server error (${status})` ) )
        else if ( status >= 400 )
        callback( new Error( `client error (${status})` ) )
        else if ( status === 200 ) {
         

            callback( null, reservations )
        }
    }

    xhr.open( 'GET', `${API_URL}/workspaces/reservations` )

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.send()
}

export default retrieveAllReservations