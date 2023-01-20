import { validateText,validateCallback } from "validators"
const API_URL = process.env.REACT_APP_API_URL

function retrieveLocations(token, callback) {
    validateText(token, 'token')
    validateCallback(callback)
    
    const xhr = new XMLHttpRequest

    xhr.onload = function() {
        const status = xhr.status

        const json = xhr.responseText

        const locations = JSON.parse(json)


        if (status >= 500)
            callback(new Error(`server error (${status})`))
        else if (status >= 400)
            callback(new Error(`client error (${status})`))
        else if (status === 200) {

            callback(null, locations)
        }
    }

    xhr.open('GET', `${API_URL}/locations`)

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.send()
}

export default retrieveLocations