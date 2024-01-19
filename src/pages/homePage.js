import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import{db} from '../firebase-config';
import PhoneIcon from '../therapies/massage.jpg';


import {collection, updateDoc, Timestamp, doc, deleteDoc, onSnapshot} from 'firebase/firestore'


function IconBxsPhone(props) {
    return (
        <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="4em"
        width="4em"
        {...props}
        >
        <path d="M20.487 17.14l-4.065-3.696a1.001 1.001 0 00-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 00.043-1.391L6.859 3.513a1 1 0 00-1.391-.087l-2.17 1.861a1 1 0 00-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 00.648-.291l1.86-2.171a.997.997 0 00-.085-1.39z" />
        </svg>
    );}

function IconEmail(props) {
    return (
        <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="4em"
        width="4em"
        {...props}
        >
        <path d="M20 8l-8 5-8-5V6l8 5 8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z" />
        </svg>
    );
    }

function IconLocation(props) {
    return (
        <svg
        baseProfile="tiny"
        viewBox="0 0 24 24"
        fill="currentColor"
        height="4em"
        width="4em"
        {...props}
        >
        <path d="M17.657 5.304c-3.124-3.073-8.189-3.073-11.313 0a7.78 7.78 0 000 11.13L12 21.999l5.657-5.565a7.78 7.78 0 000-11.13zM12 13.499c-.668 0-1.295-.26-1.768-.732a2.503 2.503 0 010-3.536c.472-.472 1.1-.732 1.768-.732s1.296.26 1.768.732a2.503 2.503 0 010 3.536c-.472.472-1.1.732-1.768.732z" />
        </svg>
    );
    }

function IconInstagram(props) {
    return (
        <svg
        viewBox="0 0 1024 1024"
        fill="currentColor"
        height="4em"
        width="4em"
        {...props}
        >
        <path d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 01-47.9 47.9z" />
        </svg>
    );
    }



function Therapy({ arrPos, tName, tDesc, tDuration, tPrice, tCart, timage, onClick}){
    return (

    <div className="therapy" key={arrPos}>
        <div id="name">{tName}</div>
        <div id="img" style={{ backgroundImage: `url(../therapies/${timage})` }}></div>
        <p id="descript">{tDesc}</p>
        <p id="price">${tPrice}</p>
        <p id="duration">{tDuration} min</p>

        {tCart ? (
                <button id="addTherapybtn" disabled>
                    Already in Cart
                </button>
            ) : (
                <button id="addTherapybtn" onClick={onClick}>
                    Add this to Cart
                </button>
            )}
    </div>

    )
}

function TherapyList({therapies, onClick}){
    // console.log("inside of the taskList");
    // console.log(tasks);
    // console.log(typeof(tasks));
    return (
        <div className="therapyContainer">
        {therapies.map((therapy, index) => {
            return (
            <Therapy
            key={index}
            arrPos={index}
            tName={therapy.Name}
            tDesc={therapy.Descript}
            tDuration={therapy.Duration}
            tPrice={therapy.Price}
            timage={therapy.image}
            tCart={therapy.addedToCart}
            onClick={() => onClick(index)}
            />
        )})
        }
        </div>
    )
}

function HomePage(){

const[therapyData, setTherapies] = useState([]);

useEffect(() => {
    const therapyRef = collection(db, 'Therapies');
    onSnapshot(therapyRef, (snapshot) => {
        setTherapies(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
        })))
        // setTodosLoaded(true);

        console.log(therapyData);
    })
},[]);

const addToCart = async(i )=>{
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
            <div className="homePageContainer">

                <div className="heroIMG">
                    <h1>Welcome to a place where healing begins</h1>
                    <p>Here's to your well-being and the courage it takes to seek support.</p>
                </div>

                <div className="homePage_clinicMessage">
                    <div id="message1">
                        <h3>Your Path to Recovery</h3>
                        <p>At Elite Therapy, we believe in the transformative power of rehabilitation and the journey towards optimal well-being. Our clinic stands as a beacon of hope and healing, where individuals embark on a personalized path to recovery.</p>
                    </div>

                    <div id="message2">
                        <h3>About Elite Therapy:</h3>
                        <p>Elite Therapy is not just a clinic; it's a sanctuary for those seeking enduring therapeutic support. Our team of dedicated professionals is committed to providing top-notch rehabilitation services, empowering you to overcome challenges and rediscover the vitality of a pain-free, active lifestyle.</p>
                    </div>

                    <div id="message3">
                        <h3>Your Well-Being Matters:</h3>
                        <p>Recovery is not just a destination; it's a continuous process. Elite Therapy is more than a clinic; it's a community that values your health and champions your success. Trust us to be your partner on the road to recovery.</p>
                    </div>

                    <div id="messageIMG"></div>
                </div>

                {/* <div className="homePage_clinicIMG">
                    <h1>Image here</h1>
                </div> */}

                <div className="contactInfo">
                    <h1>Contact Us</h1>
                    <div id="info1">{IconBxsPhone()}<span>905-781-8531</span></div>
                    <div id="info2">{IconEmail()}<span>contact@zenheal.com</span></div>
                    <div id="info3">{IconLocation()}<span>21 Harmony St.</span></div>
                    <div id="info4">{IconInstagram()}<span>_ZenHeal</span></div>
                </div>

                <div className="locationInfo">
                    {/* <h1>therapies offered and locaiton</h1> */}
                </div>

                <div className="therapiesOffered">
                    <h1>Our Therapies</h1>
                </div>

                {/* <input  type="button" value="your therapies"></input> */}
                {/* <div className="yourTherapies"><Link to="/cart">Your Therapies</Link></div> */}

                <TherapyList  therapies={therapyData} onClick={(i)=> addToCart(i)}/>
                {/* why therapyData is passed like this, using a variable and then = */}

                {/* <div className="therapyContainer">

                    <div className="therapy">
                        <div id="name">Therapy Name</div>
                        <div id="img">IMG</div>
                        <p id="descript">Descript</p>
                        <p id="price">cost</p>
                        <button id="addTherapybtn">add this therapy</button>
                    </div>

                </div> */}

            </div>
                <div id="cartBtnContainer"><Link id="cartBtn" to="/cart">Your Therapy Cart</Link></div>
        </>
    )
}
export default HomePage;