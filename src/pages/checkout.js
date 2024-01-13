import { useNavigate,Link } from "react-router-dom";
import "../App.css";
import React, { useState, useEffect } from 'react';
import{db} from '../firebase-config';


import {collection, getDocs, query, onSnapshot, where} from 'firebase/firestore'




function Checkout() {
    const navigate = useNavigate();
    const [therapyData, setTherapies] = useState([]);
    const [costBeforeTax, setCostBeforeTax] = useState(0);
    const [costAfterTax, setCostAfterTax] = useState(0);



    useEffect(() => {
        const fetchData = async () => {
            const therapyRef = collection(db, 'Therapies');
            const therapyQuery = query(therapyRef, where("addedToCart", "==", true))

            onSnapshot(therapyQuery, (snapshot) => {
                setTherapies(snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })));

                let totalCost = 0;
                snapshot.docs.forEach(doc => {
                    totalCost += doc.data().Price;
                });
                setCostBeforeTax(totalCost);

                const taxAmount = totalCost * (5.5 / 100);
                const totalPrice = totalCost + taxAmount;
                setCostAfterTax(totalPrice);


                const apptDate = document.getElementById('apptDate');
                const myDate = new Date();
                const weekLater = new Date();
                weekLater.setDate(myDate.getDate() + 7);
                apptDate.min = weekLater.toISOString().split('T')[0];

            });
        };

        fetchData();
    }, []);

    const payNow = (e) => {
        e.preventDefault();
        let apptDate = document.getElementById('apptDate');
        if(apptDate.value){
            navigate(`/payConfirmation/${apptDate.value}`);
        }else{
            let apptDateChk = document.getElementById('apptDateChk');
            apptDateChk.style.display = "block";
        }


    };

    return (

        <>
            <div className="checkoutTopIMG"><h1 id="test">Book your Therapies at your comfort!</h1></div>

            <section className="checkoutPageContainer">

                <section className="checkoutLeft">

                    <div className="apptDateContainer">
                        <label id="appDateLabel">Please select your inintal appointment date : </label>
                        <input type="date" id="apptDate" name="apptDate" min=''></input>
                    </div>


                    <div className="checkoutCosts">
                        <div className="costHeading ">Total Cost Before Tax :</div>
                        <div className="costBeforeTax ">${costBeforeTax}</div>
                        <div className="costHeading ">Tax :</div>
                        <div className="Tax ">hst 5.5%</div>
                        <div className="costHeading ">Total Cost :</div>
                        <div className="costAfterTax ">${costAfterTax}</div>
                    </div>

                    <div className="checkoutDetails">
                        <div className="detailHeading ">Name :</div>
                        <div className="checkoutName ">Akshat Sanan</div>
                        <div className="detailHeading ">Address :</div>
                        <div className="checkoutAddress ">50 street name whitby ON Canada</div>
                        <div className="detailHeading ">Pincode :</div>
                        <div className="checkoutPincode ">L11111</div>
                        <div className="detailHeading ">Phone :</div>
                        <div className="checkoutPhone ">905444666</div>
                    </div>
                </section>

                <section className="checkoutRight">
                    <section className='formContainer_checkout'>
                        <form onSubmit={payNow}>

                            <label for="cardType">Card Type:</label>
                                <select id="cardType" name="cardType" required>
                                <option value="visa">Visa</option>
                                <option value="debit">Debit</option>
                                <option value="mastercard">MasterCard</option>
                                <option value="amex">American Express</option>
                                </select>

                            <label for="cardNumber">Card Number:</label>
                            <input type="text" id="cardNumber" name="cardNumber" placeholder="Enter card number" required/>


                            <label for="expirationDate">Expiration Date:</label>
                            <input type="text" id="expirationDate" name="expirationDate" placeholder="MM/YY" required/>

                            <label for="securityCode">Security Code:</label>
                            <input type="text" id="securityCode" name="securityCode" placeholder="Enter security code" required/>

                            <input id='payBtn' type="submit" value="Pay Now" />

                            <span id="apptDateChk">please select your appointment date</span>

                        </form>
                    </section>
                </section>
            {/* <div id="checkoutBtnContainer"><input id="checkoutBtn" type="button" value="Checkout Now"></input></div> */}

            </section>
        </>
    )
}
export default Checkout;