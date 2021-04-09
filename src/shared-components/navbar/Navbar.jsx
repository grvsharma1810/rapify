import './navbar.css'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import {useAuth} from '../../auth-context'

const Navbar = () => {

    const navRef = useRef(null);
    const navigate = useNavigate();
    const {loggedInUser} = useAuth();
    console.log(loggedInUser);
    
    return (
        <>
            <nav className="navbar bg-primary">
                <div className="brand">
                    <div className="brand-title text-size-2">Rapify</div>
                </div>
                <div className="nav-links" ref={navRef}>
                    <ul>     
                        <li className="avatar-wrapper mr-1">
                            {!loggedInUser && <i class="fa fa-user-circle text-size-2"></i>}
                            {loggedInUser && <img src={`${loggedInUser.userAvatarUrl}`} alt="User" class="avatar" />}
                        </li>                   
                        <li>
                            <button 
                            className="btn-solid bg-yellow-600"
                            onClick={() => navigate('/login')}>
                                Log In
                            </button>
                        </li>                        
                    </ul>
                </div>                
            </nav>
        </>
    )
}

export default Navbar;