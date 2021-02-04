// import React, { Component } from 'react';

//stateless functional component
const NavBar = ({totalCounters}) => {

    //just for debugging for now
    console.log('NavBar - Rendered')

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="##">
                    Shopping Cart {" "}
                    <span className="badge badge-pill badge-secondary">
                        {totalCounters}
                    </span>
                </a>
            </div>
        </nav>
     );
}
 
export default NavBar;