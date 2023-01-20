

export default function PhotoGaleria() {
  
  return (
<div className="justify-items-center bg-contain bg-center">
    <div className="flex fex-row place-items-center max-w-lg mx-3 py-2">  
    <img className="p-3 bg-cover w-70 h-80" src="https://www.savills.es/_images/oficinas-01.jpg" alt="office"/>
    <div className="flex flex-row h-90">  
      <p className="mt-3 text-gray-600 h-70 w-80 p-8">The many possibilities of a simple office, from a single desk, to configured offices. Choose a single location or access any of our buildings.</p>
      </div>
    </div>
    <div className="flex justify-center mx-auto px-3">
     <div className="flex flex-row h-70">
        <div className=" m-5 w-60 h-60 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse m-9 p-8" />
      </div>
      <div className="max-w-md p-1 mx-auto px-3 bg-gray-200 bg-gray-100 md:bg-gradient-to-r from-green-400 to-blue-500">
    <img className="p-3" src="https://www.ecipic.com/material/img/empresas_web/img_5849_1516185532_-3mo7328-pic.jpg" alt="office"/>
      <h2 className="text-lg font-semibold text-center text-blue-500 sm:text-xl">Flexible spaces that meet your needs. </h2>
      <p className="mt-3 text-gray-600"> Flexible workspaces can unlock value for both your employees and your bottom line—regardless of your company size</p>
      </div>
      
    </div>
    </div>
  

    );
}











