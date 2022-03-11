import HeaderItem from "./HeaderItem";
import logo from "../../assets/images/logo.png";
import "../../assets/scss/header.scss";
const Header = () => {
    return (
        <header>
            <div className="left">
                <h1>Manto</h1>
                <div className="items">
                    <HeaderItem url="home" title="Home"></HeaderItem>
                </div>
            </div>
            <div className="right">
                <img src={logo} alt="" />
            </div>
        </header>
    );
};
export default Header;
