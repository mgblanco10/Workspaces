import * as React from 'react'
import Loggito from '../utils/Loggito'
import authenticateUser from '../logic/authenticateUser'
import withContext from '../utils/withContext'
import { AuthError, ClientError, ServerError } from 'errors'

function Login({ onLinkClick, onLogIn }) {

    const logger = new Loggito(Login.name)
    logger.info('constructor')

    const handleLinkClick = event => {
        event.preventDefault()

        onLinkClick()
    }

    const handleFormSubmit = event => {
        event.preventDefault()

        const form = event.target

        const emailInput = form.email
        const passwordInput = form.password

        const email = emailInput.value
        const password = passwordInput.value

        try {
            authenticateUser(email, password, (error, token) => {
                if (error) {
                    if (error instanceof ServerError) {
                       
                        logger.error(error.message)
                    } else if (error instanceof ClientError || error instanceof AuthError) {
                        logger.warn(error.message)
                      
                    }
                    return

            }
            logger.debug('user logged in')

            sessionStorage.token = token

            onLogIn()
        })
    } catch (error) {
        
        logger.warn(error.message)
    }
}
return (


     <div className="flex w-full h-screen">
                      <div className="w-full items-center justify-center lg:w-1/2">
                    
 
                    <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-100'>
                    <h1 className='text-5xl font-semibold'> Welcome Back</h1>
                    <p className='font-medium text-lg text-gray-500 mt-4'> Please enter your dates</p>
                    <div className='mt-8'>
                        <form action="https://www.google.com/search" method="get" onSubmit={handleFormSubmit}>
                            <div>
                                <label className='text-lg font-medium' htmlFor='email'>Email</label>
                                <input
                                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                    placeholder='Enter your name'
                                    type="email"
                                    name="email"
                                    id="email"
                                />
                            </div>
                            <div>
                                <label className='text-lg font-medium' htmlFor='password' >Password</label>
                                <input
                                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                    placeholder='Enter your email'
                                    type='password'
                                    name="password"
                                    ide="password"
            
                                />
                            </div>
                            <div className='mt-8 flex flex-col gap-y-4'>
                                <button className='active:scale-[.98] active:duration-75 transition-all hoover:scale-[1.01] ease-in-out py-3 rounded-xl bg-blue-500 text-white text-lg font-bold' type="submit">Sign in</button>
                            </div>
            
                        </form>
                        <a className="anchor" href="register.html" onClick={handleLinkClick}>Register</a>
                    </div>
                </div>
            
                      </div>
                      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center h-full bg-gray-200">
                        <div className="w-60 h-60 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-bounce" />
                            <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
                          </div>
                        </div>
                        

)    
}
export default withContext(Login)



