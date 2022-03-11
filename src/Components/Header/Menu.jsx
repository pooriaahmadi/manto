import HeaderItem from "./HeaderItem";
import close from "../../assets/images/close.png";

const Menu = () => {
    return (
        <div className="menu">
            <div className="top">
                <h1>Manto</h1> <img src={close} alt="" />
            </div>
            <div className="bottom">
                <HeaderItem url="/" title="home" />
            </div>
        </div>
    );
};
export default Menu;
