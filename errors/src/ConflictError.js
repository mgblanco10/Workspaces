class ConflictError extends Error {
    constructor(message) {
        super(message)

        this.name = AuthError.name
    }
}

module.exports = ConflictError