import './navbar.css'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import {useAuth} from '../../auth-context'

const Navbar = ({openSidebar}) => {

    const navRef = useRef(null);
    const navigate = useNavigate();
    const {loggedInUser,logout} = useAuth();
    console.log({loggedInUser});
    
    return (
        <>
            <nav className="navbar bg-primary">
                <div className="brand">
                    <div className="brand-title text-size-2">Rapify</div>
                </div>
                <div className="nav-links" ref={navRef}>
                    <ul>     
                        <li className="avatar-wrapper mr-1">
                            {!loggedInUser && <i className="fa fa-user-circle text-size-2"></i>}
                            {loggedInUser && <img src={`${loggedInUser.userAvatarUrl}`} alt="User" className="avatar" />}
                        </li>                   
                        <li>
                            {
                                !loggedInUser &&
                                <button className="btn-solid bg-yellow-600"
                                onClick={() => navigate('/login')}>Log In</button>                                
                            }
                            {
                                loggedInUser &&
                                <button className="btn-solid bg-red-600"
                                onClick={() => logout()}>Log Out</button>
                            }
                        </li>
                        <div className="toggle" onClick={() => openSidebar()}>
                            <i className="fa fa-bars"></i>
                        </div>                        
                    </ul>
                </div>                
            </nav>
        </>
    )
}

export default Navbar;