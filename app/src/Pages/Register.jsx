import Loggito from '../utils/Loggito'
import registerUser from '../logic/registerUser'
import withContext from '../utils/withContext'

function Register({onLinkClick, context: { handleFeedback }}) {
    const logger = new Loggito(Register.name)

    logger.info('constructor')

    const handleLinkClick = event => {
        event.preventDefault()

        onLinkClick()
    }
    const handleFormSubmit = event => {
        event.preventDefault()

        const form = event.target

        const nameInput = form.name
        const emailInput = form.email
        const passwordInput = form.password

        const name = nameInput.value
        const email = emailInput.value
        const password = passwordInput.value

        try {
            registerUser(name, email, password, (error) => {
                if (error) {
                    handleFeedback({ message: error.message, level: 'error'})
                    logger.warn(error.message)

                    return
                }
                logger.debug('register reset')
                handleFeedback({message:`Password update`, level: 'success'})
                form.reset()
                onLinkClick()
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
            <h1 className='text-5xl font-semibold'> Welcome !!! </h1>
            <p className='font-medium text-lg text-gray-500 mt-4'> Please enter your information to register.</p>
            <div className='mt-8'>
                <form metod="get" onSubmit={handleFormSubmit}>
                            <div>
                                <label className='text-lg font-medium' htmlFor='name'>Name</label>
                                <input
                                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                    placeholder='Enter your name'
                                    name="name"
                                    type="text"
                                    id="name"
                                />
                            </div>
                            <div>
                                <label className='text-lg font-medium' htmlFor='email'>Email</label>
                                <input
                                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                    placeholder='Enter your email'
                                    name="email"
                                    type="email"
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
                        id="password"
                        />
                </div>
                                <div className='mt-8 flex flex-col gap-y-4'>
                                    <button className='active:scale-[.98] active:duration-75 transition-all hoover:scale-[1.01] ease-in-out py-3 rounded-xl bg-blue-500 text-white text-lg font-bold' type="submit">Sign in</button>
                                </div>
                                    <a className="anchor" href="login.html" onClick={handleLinkClick}>Login</a>
                </form>
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
export default withContext(Register)


