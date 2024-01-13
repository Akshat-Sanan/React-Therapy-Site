import {useNavigate,Link} from 'react-router-dom';
import "../App.css";
import {
    getAuth,signInWithEmailAndPassword
} from 'firebase/auth'

function LoginPage(){

    const auth = getAuth()
    const navigate = useNavigate();

    function goToLoggedIn(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let credentialChk = document.getElementById('credentialChk')

        const email = formData.get("loginUsername");
        const password = formData.get("loginPassword");

            signInWithEmailAndPassword(auth, email, password)
            .then(cred => {
                    console.log('user logged in:', cred.user)
                    e.target.reset()
                    navigate('/homepage');
                })
                    .catch(err => {
                        credentialChk.style.display = "block";
                        console.log(err.message)
                })

    }

    return (
        <>
            <div className='landingPage'>

                <div className='landingPage_descript'>
                    <div className='welcomeBox'>
                        <h1>Embrace Wellness With Elite Therapy Clinic</h1>
                        <p>Welcome to our dedicated space for holistic well-being through sport therapy! At EliteTherapy, we believe in the transformative power of rehab therapy to nurture both the body and mind.
                            Our expert therapists are here to guide you on your wellness journey. We look forward to supporting you on your path to a healthier, happier life!</p>
                    </div>
                </div>

                <div className='landingPage_login'>

                    <div className='loginContainer'>

                        <h1>Login</h1>

                        <p className='createUserTag'>Don't have an account?<Link id='createUserBtn' to="/createUser"> Create one now!</Link></p>
                        <span id='credentialChk'>check your username or password</span>

                        <form onSubmit={(e) => goToLoggedIn(e)}>
                            <section className='formContainer_login'>

                                <label for="loginUsername">Email:
                                    <input type="text" id='loginUsername' name='loginUsername'/>
                                </label>

                                <label for="loginPassword">Password:
                                    <input type="text" id='loginPassword' name='loginPassword' required/>
                                </label>
                            </section>
                            <input id='loginBtn' type="submit" value="Login" required />
                        </form>

                        <Link id='forgotPassword'>Forgot you password</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage;