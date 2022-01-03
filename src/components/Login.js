import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'

const Login = (props) => {

    const {isAuth, login_loading, loading, Login, active_route} = useContext(AuthContext)

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const onChange = (e) => {setUserData({...userData, [e.target.name]: e.target.value})}

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(userData);
        Login(userData)
    }

    useEffect(() => {
        if (isAuth) {
          props.history.push(active_route ?? '/dashboard');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth, props.history]);

    useEffect(() => {
        document.title = 'Linkers | Login'
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active_route])
    
    return (loading) ? "Loading..." : (
        <div className='h-screen bg-green auth-page'>

            <div className='auth w-full mx-w-sm'>
                <div className='title'>
                    Login
                </div>
                <form onSubmit={onSubmit} className='auth-form'>
                    <div className="">
                        <label className='' htmlFor="email">Email</label>
                        <input onChange={onChange} className='' type="email" id='email' name='email'/>
                    </div>
                    <div className="">
                        <label className='' htmlFor="password">Password</label>
                        <input onChange={onChange} className='' type="password" id='password' name='password'/>
                    </div>
                    <button className=''>Login</button>
                    <p>
                        Don't have an account?
                        <Link to="/register"><span className='text-green bold'> Join Us</span></Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
