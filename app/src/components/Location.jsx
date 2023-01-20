import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Loggito from "../utils/Loggito";


function Location({ locations, onClick }) {
  const logger = new Loggito("List buildings");
  logger.info("return");

  const handleLinkClick = (event) => {
    event.preventDefault();

    onClick();
  };
  

  return locations.map((location) => (
<> <div key={location.id}>
    <div className="py-10 8px pr-5 p-6 md:break-inside-avoid-column max-w-sm mx-auto rounded overflow-hidden justify-items-center float-left" >
      <img className="w-full h-56 hover:opacity-40 transition duration-300 ease-in-out bg-white cursor-pointer" src={location.image} alt="Workspaces PobleNou" />
      <div className="px-5 py-3">
        <div className="font-bold text-xl mb-2">{location.name}</div>
        <p className="text-gray-700 text-base">{location.address}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <a className="text-gray-700 text-xl hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer" onClick={() => {onClick(location.id)}} >See Spaces </a>
      </div>
    </div>
    </div>
<Footer/>
  </>
  ));
}

export default Location;

