import { Link } from "react-router-dom";
import "../App.css";
import React, { useState, useEffect } from 'react';
import{db} from '../firebase-config';


import {collection, getDocs, query, addDoc, updateDoc, Timestamp, doc, deleteDoc, onSnapshot, where} from 'firebase/firestore'


function TherapyList({therapies, onClick}){
    return (
        <>
        {therapies.map((therapy, index) => {
            return (
                <div className="cartItem" key={index}>
                    <div id="cartIMG" className="centerItems" style={{ backgroundImage: `url(../therapies/${therapy.image})` }}></div>
                    <div id="cartName" className="centerItems">{therapy.Name}</div>
                    <div id="cartPrice" className="centerItems">${therapy.Price}</div>
                    <div id="cartRemove"><button onClick={() => onClick(index)}>Remove</button></div>
                </div>
        )})
        }
        </>
    )
}

function Cart(){

const[therapyData, setTherapies] = useState([]);

useEffect(() => {
    const therapyRef = collection(db, 'Therapies');
    const therapyQuery = query(therapyRef, where("addedToCart", "==", true))
    onSnapshot(therapyQuery, (snapshot) => {
        setTherapies(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
        })))
        // setTodosLoaded(true);

        console.log(therapyData);
    })
},[]);


const removeFromCart = async(i )=>{
    const therapyRef = doc(db, 'Therapies', therapyData[i].id)
    try{
        await updateDoc(therapyRef, {
            addedToCart: !therapyData[i].addedToCart
        })
        console.log("data update sent");
        } catch (err) {
        alert(err)
    }
}

    return (
        <>
            <div className="cartPageContainer">

                <div className="cartTopIMG"><h1>Your Therapies</h1></div>

                <TherapyList  therapies={therapyData} onClick={(i)=> removeFromCart(i)}/>

                <div id="checkoutBtnContainer"><Link id="checkoutBtn" to="/checkout">Checkout Now</Link></div>

            </div>
        </>
    )
}
export default Cart;