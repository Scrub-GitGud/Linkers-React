import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'

const Register = (props) => {

    const {isAuth, login_loading, loading, Register, active_route} = useContext(AuthContext)

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    const onChange = (e) => {setUserData({...userData, [e.target.name]: e.target.value})}

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(userData);
        Register(userData)
    }

    useEffect(() => {
        document.title = 'Linkers | Login'
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active_route])

    useEffect(() => {
        if (isAuth) {
          props.history.push(active_route ?? '/dashboard');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth, props.history]);
    
    return (
        <div className='h-screen bg-green auth-page'>

            <div className='auth overflow-hidden w-full mx-w-sm'>
                <div className='title'>
                    Register
                </div>
                <form onSubmit={onSubmit} className='auth-form'>
                    <div className="">
                        <label className='' htmlFor="name">Name</label>
                        <input onChange={onChange} className='' type="text" id='name' name='name'/>
                    </div>
                    <div className="">
                        <label className='' htmlFor="email">Email</label>
                        <input onChange={onChange} className='' type="email" id='email' name='email'/>
                    </div>
                    <div className="">
                        <label className='' htmlFor="password">Password</label>
                        <input onChange={onChange} className='' type="password" id='password' name='password'/>
                    </div>
                    <div className="">
                        <label className='' htmlFor="password">Confirm Password</label>
                        <input onChange={onChange} className='' type="password" id='password' name='password_confirmation'/>
                    </div>
                    <button className=''>Sign Up</button>
                    <p>
                        Already have an account?
                        <Link to="/login"><span className='text-green bold'> Log In</span></Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register
