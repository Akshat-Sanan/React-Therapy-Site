import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "../App.css";
import {
    getAuth,
    createUserWithEmailAndPassword, signOut, onAuthStateChanged
} from 'firebase/auth'

const Navigation = () => {

    const auth = getAuth()
    const navigate = useNavigate();
    const[userUID, setUID] = useState(null);

    const logoutUser = async()=>{
        signOut(auth)
            .then(() => {
                console.log('user signed out')
                navigate('/');
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const chkAuth = onAuthStateChanged(auth, (user) => {
            console.log('user status changed:', user.uid)
            setUID(user.uid);
        })

        console.log(userUID);

    return (
        <>
            <nav className="navContainer">
                <ul>
                    <li>
                        <span id="logo">EliteTherapy</span>
                    </li>
                    <li>
                        <Link to="/homePage">Home</Link>
                    </li>
                    <li>
                        <Link to={`/userProfile/${userUID}`}>User Profile</Link>
                    </li>
                    <li>
                        <Link to="/cart">Your Therapies</Link>
                    </li>
                    <li>
                        <button id="logoutBtn" onClick={()=> logoutUser()}>Logout</button>
                    </li>
                </ul>
            </nav>

        <Outlet/>

        <nav className="footerContainer">
            <ul>
                <li>
                    <span>Copyright &copy Akshat Sanan</span>
                </li>
            </ul>
        </nav>
    </>
    )
};

export default Navigation;