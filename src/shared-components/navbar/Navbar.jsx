import './navbar.css'
import Logo from './logo.png'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import {useAuth} from '../../providers/AuthProvider'

const Navbar = ({openSidebar}) => {

    const navRef = useRef(null);
    const navigate = useNavigate();
    const {loggedInUser,logout} = useAuth();
    console.log({loggedInUser});
    
    return (
        <>
            <nav className="navbar bg-primary">
                <div className="brand">
                    <img class="brand-img mr-sm" src={Logo} alt="Rapify"/>
                    <div className="brand-title text-size-2">Rapify</div>
                </div>
                <div className="nav-links" ref={navRef}>
                    <ul>     
                        <li className="avatar-wrapper mr-1">
                            {!loggedInUser && <i className="fa fa-user-circle text-size-2"></i>}
                            {loggedInUser && loggedInUser.avatarUrl !== "" && <img src={`${loggedInUser.avatarUrl}`} alt="User" className="avatar" />}
                            {loggedInUser && loggedInUser.avatarUrl === "" && <div className="avatar bg-yellow-600 letter-avatar">{loggedInUser.name[0].toUpperCase()}</div>}
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