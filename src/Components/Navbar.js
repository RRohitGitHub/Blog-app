import { Avatar } from '@material-ui/core'
import React, { useState } from 'react'
import { GoogleLogout } from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux'
import { selectSignedIn, selectUserData, selectUserInput, setInput, setSignedIn, setUserData } from '../features/userSlice'
import '../styling/Navbar.css'

const Navbar = () => {
    const isSignedIn = useSelector(selectSignedIn)
    const [inputValue,setInputValue] = useState('')
    const userData = useSelector(selectUserData)
    const dispatch = useDispatch()

    const logout = (response)=>{
        dispatch(setUserData(null))
        dispatch(setSignedIn(false));
        dispatch(setInput('tech'));
    }

    const handleClick = (e)=>{
        e.preventDefault();
        dispatch(setInput(inputValue))
    }

    return (
        <div className="navbar">
            <div className="navbar__header">🤜</div>
            {isSignedIn &&
            
            <div className="blog__search">
                <input className="search" placeholder="Search for a bl0g" value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
                <button className="submit" onClick={handleClick}>Search</button>
            </div>
            }

            {isSignedIn ? 
                <div className="navbar__user__data">
                    <Avatar src={userData?.imageUrl} alt={userData?.name}/>
                    <h1 className="signedIn">{userData?.givenName}</h1>
                    <GoogleLogout
                        clientId="369189826772-2ceng47eosqk46cuuve23o0gtt6rbo4d.apps.googleusercontent.com"
                        render={(renderProps) => (
                        <button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            className="logout__button"
                        >
                            Logout
                        </button>
                    )}
                    buttonText="Logout"
                    onLogoutSuccess={logout}
                    />
                </div>
             : 
            ""
            }
        </div>
    )
}

export default Navbar
