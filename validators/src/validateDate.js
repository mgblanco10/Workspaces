function validateDate(date) {
    if  (!(date instanceof Date)) throw new TypeError('date is not valid')
}
module.exports = validateDate

