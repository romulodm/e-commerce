import "./styles/sidebar.scss";
import { Link } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Sidebar = () => {
  return (
    <div className="sidebar">

      <div className="top">
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <span className="logo">Admin Panel</span>
        </Link>
      </div>

      <div className="center">
        <ul>
          <p className="title">HOME</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">CONTROL</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <li>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li>
         
          <p className="title">USER</p>
          <Link to={`/profile`} style={{color: 'inherit', textDecoration: 'none'}}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;