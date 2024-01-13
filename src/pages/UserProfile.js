import { useNavigate,Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import "../App.css";
import React, { useState, useEffect } from 'react';
import{db} from '../firebase-config';
import {collection, getDocs, query, addDoc, updateDoc, Timestamp, doc, deleteDoc, onSnapshot, where} from 'firebase/firestore'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signOut,
    onAuthStateChanged
} from 'firebase/auth'
const auth = getAuth()


function HistoryList({therapies}){
    return (
        <>
        {therapies.map((therapy) => {
            return (
                <div className="therapyHistoryName">{therapy.Name}</div>
            )
        })
        }
        </>
    )
}

function UserInfo({userData}){
    return(
        <>
            {
                userData.map((data) =>{
                    return(
                        <>
                        <h1>Your Information</h1>
                        <h2>NAME</h2>
                        <div className="userName">{data.Name}</div>
                        <h2>EMAIL</h2>
                        <div className="userEmail">{data.Email}</div>
                        <h2>ADDRESS</h2>
                        <div className="userAddress">{data.Address}</div>
                        <h2>PINCODE</h2>
                        <div className="userPincode">{data.Pincode}</div>
                        </>
                    )
                })
            }
        </>
    )
}


function UserProfile(){

    const[therapyHistoryData, setHistory] = useState([]);
    const[userInformation, setUserData] = useState([]);
    const params = useParams();
    // const[userUID, setUID] = useState(null);

    useEffect(() => {
        const therapyRef = collection(db, 'therapyHistory');
        onSnapshot(therapyRef, (snapshot) => {
            setHistory(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })))
        })

        // const chkAuth = onAuthStateChanged(auth, (user) => {
        //     console.log('user status changed:', user.uid)
        //     userUID = user.uid;
        // })

        // console.log(userUID);


        const data = collection(db, 'UserData');
        const userData = query(data, where("UID", "==", params.userUID))
        onSnapshot(userData, (snapshot) => {
            setUserData(snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
            })))
        })
    },[]);

    return (


        <>
            <div className="userTopIMG"><h1>Hii!!, how are you today?</h1></div>

            <section className="userPageContainer">

                <section className="userNameContianer">
                    <h1>Lastest appointment date</h1>
                    <div>21 july 2023 </div>
                </section>

                <section className="userInfoContainer">
                    <UserInfo userData={userInformation}/>
                    {/* <h1>Your Information</h1>
                    <h2>NAME</h2>
                    <div className="userName">Akshat Sanan</div>
                    <h2>EMAIL</h2>
                    <div className="userEmail">akshat.sanan@dcmail.ca</div>
                    <h2>ADDRESS</h2>
                    <div className="userAddress">50 Street Address Whitby ON Canada </div>
                    <h2>PINCODE</h2>
                    <div className="userPincode">L11111</div> */}
                    {/* <h2>PHONE</h2>
                    <div className="userPhone">9054445565</div> */}
                </section>

                <section className="userHistoryContainer">
                    <h1>Your Therapy History</h1>
                    <section className="therapyHistoryCont">
                        <HistoryList therapies={therapyHistoryData}/>
                    </section>
                </section>

            </section>
            <div id="editUserBtnContainer"><Link id="editUserBtn" to={`/editUser/${params.userUID}`}>Edit Your Profile</Link></div>
        </>
    )
}
export default UserProfile;