import './sidebar.css'
import React from 'react';
import {NavLink} from 'react-router-dom'

const Sidebar = ({ closeSidebar }, ref) => { 
    
    const linkStyle = {
        textDecoration: "none",
        color: "inherit",
        backgroundColor: "inherit",
    };

    return (
        <div className="sidebar" ref={ref}>
            <ul className="list-group">         
                <NavLink to="/" end style={linkStyle} activeClassName="selected">
                    <li className="list-item p-1">                        
                        <p><i className="fa fa-home"></i> Home</p>                                                                
                    </li>                                
                </NavLink>        
                <NavLink to="/account" end style={linkStyle} activeClassName="selected">
                    <li className="list-item p-1">                        
                        <p><i className="fa fa-home"></i> Account</p>                                                                
                    </li>                                
                </NavLink>        
                <NavLink to="/playlists" style={linkStyle} activeClassName="selected">
                    <li className="list-item p-1">                                            
                        <p><i className="fa fa-save"></i> Saved Playlists</p>                                                                
                    </li>
                </NavLink>
                <NavLink to="/watch-later" style={linkStyle} activeClassName="selected">
                    <li className="list-item p-1">                    
                        <p><i className="fa fa-clock-o"></i> Watch Later</p>                                        
                    </li>
                </NavLink>
                <NavLink to="/liked" style={linkStyle} activeClassName="selected">
                    <li className="list-item p-1">                    
                        <p><i className="fa fa-thumbs-up"></i> Liked</p> 
                    </li>
                </NavLink>
                <NavLink to="/history" style={linkStyle} activeClassName="selected">
                    <li className="list-item p-1">                    
                        <p><i className="fa fa-history"></i> History</p>
                    </li>
                </NavLink>
                <NavLink to="/upload-video" style={linkStyle} activeClassName="selected">
                    <li className="list-item p-1">                    
                        <p><i className="fa fa-upload"></i> Upload Video</p>
                    </li>
                </NavLink>
            </ul>                        
            <button                
                className="btn-solid secondary sidebar-close"
                onClick={() => closeSidebar()}
                >X</button>
        </div>
    )
}

const forwardedRefSidebar = React.forwardRef(Sidebar);

export default forwardedRefSidebar;