import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaLink, FaPlusSquare } from 'react-icons/fa';
import { BiCategory, BiLogOut } from 'react-icons/bi';
import { AiFillFolderOpen } from 'react-icons/ai';
import { AuthContext } from './Context/AuthContext';
import { useLocation } from 'react-router-dom';

const Layout = (props) => {

    const {Logout} = useContext(AuthContext)
    const {pathname} = useLocation();

    return (
        <div className="main">

            <div className="sidebar">
                <div className="top_icons">
                    <Link to="/dashboard" className={`flex items-center text-xl mx-auto ${pathname.includes("dashboard") && 'active'}`}><FaHome/></Link>
                    <Link to="/links" className={`flex items-center text-lg  mx-auto ${pathname.includes("links") && 'active'}`}><FaLink/></Link>
                    <Link to="/add" className={`flex items-center text-lg  mx-auto ${pathname.includes("add") && 'active'}`}><FaPlusSquare/></Link>
                    <Link to="/folder" className={`flex items-center text-xl  mx-auto ${pathname.includes("folder") && 'active'}`}><AiFillFolderOpen/></Link>
                </div>
                <div className="bottom_icons">
                    <button onClick={Logout} className='flex items-center text-xl  mx-auto'><BiLogOut/></button>
                </div>
            </div>

            <div className='content'>
                <div className='mx-5'>
                    {props.children}
                </div>
            </div>

        </div>
    )
}

export default Layout
