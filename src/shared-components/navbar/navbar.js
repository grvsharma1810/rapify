import './navbar.css'
import { Link } from 'react-router-dom'
import { useRef } from 'react'

const Navbar = () => {

    const navRef = useRef(null);

    const toggleNav = () => {        
        navRef.current.classList.toggle('active')
    }

    return (
        <>
            <nav className="navbar bg-primary">
                <div className="brand">
                    <div className="brand-title text-size-2">Rapify</div>
                </div>
                <div className="nav-links" ref={navRef}>
                    <ul>
                        
                            <li onClick={() => toggleNav()}><button className="btn-solid primary">Home</button></li>
                        
                        
                            <li onClick={() => toggleNav()}><button className="btn-solid primary"><i className="fa fa-shopping-cart" aria-hidden="true"></i> Cart</button></li>
                        
                        
                            <li onClick={() => toggleNav()}><button className="btn-solid primary"><i className="fa fa-heart" aria-hidden="true"></i> Wishlist</button></li>
                        
                    </ul>
                </div>
                <div className="toggle"                    
                    onClick={() => toggleNav()}
                ><i className="fa fa-bars"></i></div>
            </nav>
        </>
    )
}

export default Navbar;