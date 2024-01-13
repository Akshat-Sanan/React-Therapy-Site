import { useNavigate,Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import "../App.css";
import React, { useState, useEffect } from 'react';
import{db} from '../firebase-config';
import {collection, getDocs, query, addDoc, updateDoc, serverTimestamp, doc, deleteDoc, onSnapshot, where} from 'firebase/firestore'




function UserInfo({userData, submitChanges}){
    const params = useParams();
    return(
        <>
            {
                userData.map((data) =>{
                    return(
                        <>
                        <form onSubmit={submitChanges}>
                            <label for="editUserEmail">Email:</label>
                            <input type="text" id="editUserEmail" name="editUserEmail" placeholder={data.Email} required disabled/>

                            <label for="editUserName">Name:</label>
                            <input type="text" id="editUserName" name="editUserName" placeholder={data.Name} required/>


                            <label for="editUserAddress">Address:</label>
                            <input type="text" id="editUserAddress" name="editUserAddress" placeholder={data.Address} required/>

                            <label for="editUserPincode">Pincode:</label>
                            <input type="text" id="editUserPincode" name="editUserPincode" placeholder={data.Pincode} required/>

                            <input id='submitEditBtn' type="submit" value="Submit Edit" />
                            <div id='discardEditBtn'><Link to={`/userProfile/${params.userUID}`}>Discard and go back</Link></div>

                        </form>
                        </>
                    )
                })
            }
        </>
    )
}



function EditUser(){

    const[therapyHistoryData, setHistory] = useState([]);
    const[userInformation, setUserData] = useState([]);
    const params = useParams();

    useEffect(() => {
        // const therapyRef = collection(db, 'therapyHistory');
        // onSnapshot(therapyRef, (snapshot) => {
        //     setHistory(snapshot.docs.map(doc => ({
        //         id: doc.id,
        //         ...doc.data()
        //     })))
        // })

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


    const navigate = useNavigate();

    function editNow(e){
        console.log(userInformation[0].id)
        const data = collection(db, 'UserData');
        const userDocRef = doc(data, userInformation[0].id);

        let formData = new FormData(e.target);

        const userName = formData.get("editUserName");
        const address = formData.get("editUserAddress");
        const pincode = formData.get("editUserPincode");

        console.log(userName);

        e.preventDefault();
        updateDoc(userDocRef, {
            Name: userName,
            Address: address,
            Pincode: pincode,
            createdAt: serverTimestamp()
        })
        .then(()=>{
            navigate(`/userProfile/${params.userUID}`);
        })
        .catch((error) => {
            console.error('Error updating document: ', error);
        });

    }
    return (
        <>
            <div className="editUserTopIMG"><h1>Need a change to your profile?</h1></div>

            <section className="editUserContainer">

                {/* <section className="checkoutRight"> */}
                        <section className='formContainer_editUser'>

                        <UserInfo userData={userInformation} submitChanges={(e) => editNow(e)}/>
                            {/* <form onSubmit={editNow}>

                                <label for="editUserName">Name:</label>
                                <input type="text" id="editUserName" name="editUserName" placeholder="Enter your name" required/>

                                <label for="editUserEmail">Email:</label>
                                <input type="text" id="editUserEmail" name="editUserEmail" placeholder="Enter your email address" required/>

                                <label for="editUserAddress">Address:</label>
                                <input type="text" id="editUserAddress" name="editUserAddress" placeholder="Enter your address" required/>

                                <label for="editUserPincode">Pincode:</label>
                                <input type="text" id="editUserPincode" name="editUserPincode" placeholder="Enter your pincode" required/>

                                <input id='submitEditBtn' type="submit" value="Submit Edit" />
                                <div id='discardEditBtn'><Link to="/userProfile">Discard and go back</Link></div>

                            </form> */}
                        </section>
                {/* </section> */}
            </section>
        </>
    )
}
export default EditUser;