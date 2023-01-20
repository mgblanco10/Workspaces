const { runWithErrorHandling, createLogger,verifyToken} = require( '../../utils' )
const { workspaces: { retrieveWorkspaces } } = require( '../../logic' )
const logger = createLogger( module )

module.exports = (req,res ) => {
    runWithErrorHandling( () => {
        //const {userId} = verifyToken()
        const { locationsId } = req.params

        return retrieveWorkspaces(locationsId)
            .then( workspaces => res.status( 200 ).json( workspaces ) )
    }, res, logger )
}