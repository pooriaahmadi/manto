import HeaderItem from "./HeaderItem";

const Header = () => {
  return (
    <header>
      <div className="left">
        <h1>Manto</h1>
        <HeaderItem url="home" title="Home"></HeaderItem>
      </div>
      <div className="right">
        <img src="" alt="" />
      </div>
    </header>
  );
};
export default Header;
