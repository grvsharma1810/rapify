import React from 'react';
import './sidebar.css'

const Sidebar = ({ closeSidebar }, ref) => {    

    return (
        <div className="sidebar" ref={ref}>
            <h5 className="text-size-2 mb-1">Sort By</h5>            
            <button
                className="btn-solid secondary"                
            >Clear Filters</button>
            <button                
                className="btn-solid secondary sidebar-close">X</button>
        </div>
    )
}

const forwardedRefSidebar = React.forwardRef(Sidebar);

export default forwardedRefSidebar;