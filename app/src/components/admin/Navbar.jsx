import "./styles/navbar.scss";
import { Link } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
            <input type="text" placeholder="Search..." />
            <SearchOutlinedIcon />
        </div>

        <div className="items">
          <div className="item">
            <Link to={`/`} style={{color: 'inherit', textDecoration: 'none'}}>
              <div className="button">
                <div><LogoutIcon style={{ color: "#ffffff"}}/></div>
                <div className="title">Back to e-commerce</div>
              </div>
            </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;