import { useNavigate,Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import "../App.css";
import React, { useState, useEffect } from 'react';
import{db} from '../firebase-config';


import {collection, getDocs, query, addDoc, updateDoc, Timestamp, doc, deleteDoc, onSnapshot, where} from 'firebase/firestore'

function TherapyList({therapies}){
    return (
        <>
        {
        therapies.map((therapy) => {
            return (
                <div className="confirmationTherapyInfo">
                    <div className="confirmationTherapyName">{therapy.Name}</div>
                    <div className="confirmationTherapyPrice">${therapy.Price}</div>
                </div>
        )})
        }
        </>
    )
}

function ThearpyPrice({price}){
    return(
        <>
            <div className="confirmationTotalCost">${price}</div>
        </>
    )
}

function PayConfirmation(){

    const[therapyData, setTherapies] = useState([]);
    const [paidAmount, setPaidAmount] = useState(0);
    const params = useParams();

    useEffect(() => {
        const therapyRef = collection(db, 'Therapies');
        const therapyQuery = query(therapyRef, where("addedToCart", "==", true))
        onSnapshot(therapyQuery, (snapshot) => {
            setTherapies(snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
            })))

            let totalCost = 0;
            snapshot.docs.forEach(doc => {
                totalCost += doc.data().Price;
            });
            setPaidAmount((totalCost*(5.5/100))+totalCost);

        })
    },[]);

    async function addToHistory() {
        const histroyRef = collection(db, 'therapyHistory');
        try {
            for (const doc of therapyData) {
            await addDoc(histroyRef, { Name: doc.Name, created: Timestamp.now() });
            };
        } catch (err) {
            alert(err);
        }
    }


    return (

        <>
            <div className="confirmationTopIMG"><h1>Thanks So Much!</h1><h2>You just made it half way your healing by choosing this decision</h2></div>

            <section className="confirmationPageContainer">

                <h1>Your Booking Summary</h1>

                <section className="confirmationInfo">

                    <TherapyList  therapies={therapyData}/>

                    <div className="confirmationTotal">
                        <div className="confirmationTotalHeading">Paid (incl tax 5.5%):</div>
                        <ThearpyPrice price={paidAmount}/>
                    </div>

                </section>

                <div className="confirmationDate">Your inital date of appointment is : {params.apptDate}</div>

                <div className="confirmationNote">Note : If you wish to change your inital appointment date, please feel free to call us at 905-333-4444</div>

                <div id="gohomePageBtnContainer"><Link id="goHomePageBtn" onClick={() => addToHistory()} to="/homePage">Go to Home</Link></div>

            </section>
        </>
    )
}
export default PayConfirmation;