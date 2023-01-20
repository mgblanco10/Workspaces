import '../index.css'
import Loggito from '../utils/Loggito'
import updateUserPassword from '../logic/updateUserPassword'
import withContext from '../utils/withContext'


function Settings({ onLinkClick, onCloseClick, context: { handleFeedback } }) {
    const logger = new Loggito('Settings')

    logger.info('return')

    const handleLinkClick = event => {
        event.preventDefault()

        onLinkClick()
    }

    const handleFormSubmitPassword = event => {
        event.preventDefault()
        const { target: form } = event
        const {
            oldPassword: { value: oldPassword },
            newPassword: { value: newPassword },
            newPasswordRepeat: { value: newPasswordRepeat } 
        } = form
    

        try {
            updateUserPassword(sessionStorage.token, oldPassword, newPassword, newPasswordRepeat, error => {
                if (error) {
                    handleFeedback({message:error.message, level: 'warning'})
                    logger.warn(error.message)

                    return
                }
                handleFeedback({message:`Password update`, level: 'success'})
                form.reset()
                onCloseClick()
            })
        } catch (error) {
            handleFeedback({message:error.message, level: 'warning'})
            logger.warn(error.message)
        }
    }
    return (
        <div className="flex w-full h-screen">
                         <div className="w-full items-center justify-center lg:w-1/2">
                       
                       <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-100'>
                       <h1 className='text-5xl font-semibold'> Change Password</h1>
                       <div className='mt-8'>
                           <form onSubmit={handleFormSubmitPassword}>
                               <div>
                                   <label className='text-lg font-medium' htmlFor='oldPassword'>Current Password</label>
                                   <input
                                       className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                       placeholder='Enter your name'
                                       type="password"
                                       name="oldPassword"
                                       id="oldPpassword"
                                   />
                               </div>
                               <div>
                                   <label className='text-lg font-medium' htmlFor='password' >New Password</label>
                                   <input
                                       className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                       placeholder='Enter your email'
                                       type='password'
                                       name="NewPassword"
                                       id="NewPassword"
               
                                   />
                               </div>
                               <div>
                                   <label className='text-lg font-medium' htmlFor='password' >Repeat New Password</label>
                                   <input
                                       className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                       placeholder='Enter your email'
                                       type='password'
                                       name="newPasswordRepeat"
                                       ide="NewPasswordRepeat"
               
                                   />
                               </div>
                               <div className='mt-8 flex flex-col gap-y-4'>
                                   <button className='active:scale-[.98] active:duration-75 transition-all hoover:scale-[1.01] ease-in-out py-3 rounded-xl bg-blue-500 text-white text-lg font-bold' type="submit">Update Password</button>
                               </div>
                           </form>
                       </div>
                       <img src="https://www.kindpng.com/picc/m/436-4369832_homepage-icon-png-png-download-transparent-black-home.png" className='h-8 w-8 cursor-pointer' onClick={handleLinkClick}/>
                   </div>   
                         </div>
                         <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center h-full bg-gray-200">
                           <div className="w-60 h-60 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-bounce" />
                               <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
                             </div>
                           </div>
   
   )    
   }
   export default withContext(Settings)