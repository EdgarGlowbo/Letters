import { Link } from "react-router-dom";

const Navbar = () => {
  const displayTextEditor = () => {    

  };
  return ( 
    <nav className="m-nav">
      <h1 className="c-nav__h1">Letters</h1>
      <div className="o-nav__links">
        <Link to="/" className="c-nav__home c-nav__link">Home</Link>
        <Link to="/create" className="c-nav__new-entry c-nav__link" onClick={displayTextEditor}>New entry</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;