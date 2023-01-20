import { useState } from 'react'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Settings from './Pages/Settings'
import Home from './Pages/Home'
import Feedback from './components/Feedback'
import Context from './utils/Context'
import Loggito from './utils/Loggito'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'



function App () {
    const logger = new Loggito('App')

    const [feedback, setFeedback] = useState({ message: null, level: null })
    const navigate = useNavigate()

    const handleNavigationToRegister = () => {
        navigate('register')

        logger.debug('navigate to register')
    }

    const handleNavigationToLogin = () => {
        navigate('login')
    
        logger.debug('navigate to login')
    }

    const handleNavigationToSettings = () => {
        navigate('settings')
    
        logger.debug('navigate to settings')
    }

    const handleNavigationToWorkspaces = () => {
        navigate('workspaces')
    
        logger.debug('navigate to workspaces')
    }

    const handleNavigationToHome = () => {
        navigate('/')
    
        logger.debug('navigate to home')
    }


    const handleLogoutClick = () => {
        delete sessionStorage.token

        handleNavigationToLogin()
    }
    const handleAcceptFeedback = () => {
        const feedback = { message: null, level: null }

        setFeedback(feedback)
        logger.debug('setFeedback', feedback)
    }

    const handleFeedback = feedback => {
        setFeedback(feedback)

        logger.debug('setFeedback', feedback)
    }
    logger.info('return')

const toggleTheme = () => {
    document.documentElement.classList.toggle('dark')
    }

    return (   
        <Context.Provider value={{toggleTheme}}>
        <div>
        <Routes>
       <Route path="login" element={sessionStorage.token ? <Navigate to="/" /> : <Login onLinkClick={handleNavigationToRegister} onLogIn={handleNavigationToHome} />} />
        <Route path="register" element={sessionStorage.token ? <Navigate to="/" /> :  <Register onLinkClick={handleNavigationToLogin} />} />
        <Route path="settings" element={<Settings onLinkClick={handleNavigationToHome}/>} />
         <Route path="/*" element={sessionStorage.token ? <Home onLogoutClick={handleLogoutClick} onLinkClick={handleNavigationToSettings} onLink={handleNavigationToWorkspaces} /> : <Navigate to="login" />} />
        </Routes> 
        {feedback.message && <Feedback level={feedback.level} message={feedback.message} onClick={handleAcceptFeedback} />}
         </div>
         </Context.Provider>
   
            )
        }
export default App
            
            

