import { NavLink } from "react-router-dom"

export const Navbar = () => {
    return (
        <nav className="navbar-container" style={{ display: 'flex', justifyContent: 'space-around', width: '100vw'}}>
        <div>MyAPP</div>
            <div style={{display: 'flex', gap: '8px'}}>
                <NavLink
                    to='/'
                    // className={({ isActive}) => 
                    //     isActive ? 'nav-link active' : 'nav-link'
                    // }
                >
                Home
                </NavLink>
                {/* <NavLink>About</NavLink> */}
                <NavLink to='/signin'>Signin</NavLink>
                <NavLink to='signup'>Signup</NavLink>
            </div>
        </nav>
    )
}