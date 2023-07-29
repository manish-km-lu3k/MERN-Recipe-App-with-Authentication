import { useCookies } from "react-cookie";
import { Link, useNavigate , useLocation } from "react-router-dom";

const usernameColor = {
    color: "cyan", // Change this to your desired text color, e.g., "#ff0000" for red
  };


export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const location = useLocation();

    const logout = () => {
        setCookies('access_token',"")
        window.localStorage.removeItem('userID');
        window.localStorage.removeItem('userName');
        navigate("/auth");
    }
    return (
        <div className="navbar">
            <Link to="/"> Home </Link>
            <Link to="/create-recipe"> CreateRecipe </Link>
            
            {!cookies.access_token ? (
            <Link to="/auth"> Login/Register </Link>
            ) :  (
                <>
                <Link to="/saved-recipe"> SavedRecipe </Link>
                <Link to={location.pathname} style={usernameColor}> {window.localStorage.userName} </Link>
                <button onClick={logout}>Logout</button>
                </>
            )}
        </div>
    );
};