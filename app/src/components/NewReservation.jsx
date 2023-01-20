import Loggito from '../utils/Loggito'
import { useParams } from "react-router-dom";
import handleCreateReservation from '../logic/createReservation'
import withContext from '../utils/withContext'


function NewReservation({reservation}) {
    const logger = new Loggito('New Reservation')

    const params = useParams();
    const reservationId = params.reservationId;

    logger.info('return')


      
    return (
        <div>
        <h1> hola </h1>
        </div>
   )    
   }
   export default NewReservation

  // { reservation && reservation.map((reservation)=>{({reservation})})} 