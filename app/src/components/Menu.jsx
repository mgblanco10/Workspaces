function Menu (onLogoutClick){
    return(
       <div className="grip grid-rows-3 text-center flex flex-col my-11 md:hidden">
            <button className='text-white font-medium bg-[length:200px_100px] pr-4  h16 bg-blue-500 relative shadow-sm'> Search</button>
            <button className='text-white box-content h-16 font-medium bg-[length:200px_100px] pr-4  h16 bg-blue-500 relative shadow-sm'>Settings</button>
            <button className='text-white font-medium bg-[length:200px_100px] pr-4 h16 bg-blue-500 relative shadow-sm' onLogoutClick={onLogoutClick}> Logout</button>
       </div> 
    )
        

    
}

export default Menu
         