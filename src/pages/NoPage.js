import {useNavigate,Link} from 'react-router-dom';
import "../App.css";

const NoPage = () => {
    return (
        <>
            <div className="noPageTopIMG"><h1>Oops! Looks like such page does not exist</h1><h2>background will be an image</h2></div>
            <div id="noPageBtnContainer"><Link id="noPageBtn" to="/">Go to login page</Link></div>
        </>

    );
}
export default NoPage;