import {useNavigate,Link} from 'react-router-dom';
import "../App.css";

import{db} from '../firebase-config';
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth'
import {collection, getDocs, query, addDoc, updateDoc,serverTimestamp, Timestamp, doc, deleteDoc, onSnapshot, where} from 'firebase/firestore'


function CreateUser(){

    const auth = getAuth()
    const userInfo = collection(db, 'UserData');
    const navigate = useNavigate();

    function goToUserCreated(e){
        e.preventDefault();
        let passChk = document.getElementById('passChk')

        let formData = new FormData(e.target);

        const email = formData.get("createUserEmail");
        const password = formData.get("createUserPassword");
        const rePassword = formData.get("createUserRetypePassword");
        const userName = formData.get("createUserName");
        const address = formData.get("createUserAddress");
        const pincode = formData.get("createUserPincode");




        if(password == rePassword){

            createUserWithEmailAndPassword(auth, email, password)
                .then(cred => {
                    console.log('user created:', cred.user.uid)
                    addDoc(userInfo, {
                        UID:cred.user.uid,
                        Email: email,
                        Name: userName,
                        Address: address,
                        Pincode: pincode,
                        createdAt: serverTimestamp()
                    });
                    e.target.reset();
                    navigate('/homePage');
                })
                .catch(err => {
                    console.log(err.message)
                })


        }
        else{
            console.log("passwords doesn't matched")
            passChk.style.display = "block"
        }
    }

    return (
        <>
        <div className="createUserTopIMG"><h1>Join Us Now!</h1></div>

        <div className='createUserContainer'>
            <section className='formContainer_createUser'>
                <form onSubmit={(e) => goToUserCreated(e)}>

                    <label for="createUserName">Name:</label>
                    <input type="text" id="createUserName" name="createUserName" placeholder="Enter your name" required/>

                    <label for="createUserEmail">Email:</label>
                    <input type="text" id="createUserEmail" name="createUserEmail" placeholder="Enter your email address" required/>

                    <label for="createUserAddress">Address:</label>
                    <input type="text" id="createUserAddress" name="createUserAddress" placeholder="Enter your address" required/>

                    <label for="createUserPincode">Pincode:</label>
                    <input type="text" id="createUserPincode" name="createUserPincode" placeholder="Enter your pincode" required/>

                    <label for="createUserPassword">Password:</label><span id='passLengthChk'>password should be 6 character long</span>
                    <input type="text" id="createUserPassword" name="createUserPassword" placeholder="Enter your password" required/>

                    <label for="createUserRetypePassword">Confirm Password:</label>
                    <input type="text" id="createUserRetypePassword" name="createUserRetypePassword" placeholder="Retype your password" required/>
                    <span id='passChk'>password does not match</span>

                    <input id='submitCreateBtn' type="submit" value="Create Now" />
                    <div id='discardCreateBtn'><Link to="/">Go back to login</Link></div>

                </form>
            </section>
        </div>
        </>
    )
}

export default CreateUser;