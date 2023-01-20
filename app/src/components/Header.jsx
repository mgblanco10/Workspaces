import {useState} from 'react'
import Loggito from '../utils/Loggito'
import withContext from '../utils/withContext'
import { useLocation } from 'react-router-dom'


function Header({onLogoutClick, onSettingsClick ,onHomeClick, onInfoClick,onSolutionsClick, onPaymentClick, view: settings, workspaces ,context: { toggleTheme }}){
  const logger = new Loggito ('Header')
  const location = useLocation()

  const [view, setView] = useState(null) 
  const handleLogoutClick = () => onLogoutClick()

const handleSettingsClick = () => {
    setView('settings')

    logger.debug('setView', null)

    onSettingsClick()
}

const handleInfoClick = ()=>{
  setView('info')
  
  logger.debug('setView', null)
  
  onInfoClick()
}

const handleSolutionsClick = ()=>{
  setView('solutions')
  
  logger.debug('setView', null)
  
  onSolutionsClick()
}

const handlePaymentClick = ()=>{
  setView('payment')
  
  logger.debug('setView', null)
  
  onPaymentClick()
}

const handleNavigationToHomeClick = ()=>{
  setView('/')

  logger.debug('setView', null)
  onHomeClick()
}




logger.info('return')

  
    return(
        <nav className="bg-gray-800">
  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div className="relative flex h-16 items-center justify-between">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
       
        <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
         
          <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        
          <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div className="flex flex-shrink-0 items-center">
          <img className="block h-8 w-auto lg:hidden" src="https://images.vexels.com/media/users/3/153968/isolated/preview/3fa8d66ea2342195e27d0cbad4f7c219-icono-de-trazo-de-color-paraguas.png" alt="Logo"/>
          <img className="hidden h-8 w-auto lg:block" src="https://images.vexels.com/media/users/3/153968/isolated/preview/3fa8d66ea2342195e27d0cbad4f7c219-icono-de-trazo-de-color-paraguas.png" alt="Logo"/>
        </div>
        <div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-4">

            <a className="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer" onClick={handleNavigationToHomeClick} >Home</a>
          <a className="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer" onClick={handleInfoClick}>Information</a>

            <a className="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer" onClick={handleSolutionsClick}> Reservations </a>

           <a className="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer" onClick={handleSettingsClick}  view={settings} >Settings</a>

           <a className="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer" onClick={handlePaymentClick} > Payment </a>

            <a className="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer" onClick={handleLogoutClick} >Logout</a>


          </div>
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        
        {/* <button 
        type="button" 
        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        onClick={toggleTheme}>

          <span className="sr-only">View notifications</span>

          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
        </button> */}
        <img src="https://cdn-icons-png.flaticon.com/128/1177/1177568.png" className='w-8 h-8 rounded-lg'/>

        <div className="relative ml-3">
          <div>
            <button type="button" className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
      
            
            </button>
          </div>
   
         
        </div>
      </div>
    </div>
  </div>


  <div className="sm:hidden" id="mobile-menu">
 
  </div>
</nav>
    )

}
export default withContext(Header)

