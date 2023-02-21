import React from 'react';
import {Link} from 'react-router-dom';
import { useSignOut   } from 'react-auth-kit';
function Nav(){
    
    const signOut = useSignOut(); 
    return(
      <>  <div
      style={{
        float: 'left',
        width: 120,
        height: 0,
        margin: '0px 30px 16px 0',

      }}>  <a href="/"><img alt="logo" src="https://www.logodesign.net/logo/line-art-house-roof-and-buildings-4485ld.png" height={50} /></a></div>
<nav className="navbar navbar-expand-lg navbar-dark bg-dark top">

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navMainMenu" aria-controls="navMainMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navMainMenu" className="navbar-collapse collapse">
            <div className="navbar-nav">
                <Link to='/' className="nav-item nav-link active">Home</Link>
                <Link to='/drinks' className="nav-item nav-link">Drinks</Link>
                <Link to='/history' className="nav-item nav-link">History</Link>
               
                <Link onClick={() => signOut()} className="nav-item nav-link">Log Out</Link>
            </div>
        </div>
    </nav></>
    );
}

export default Nav;