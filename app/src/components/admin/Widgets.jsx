import "./styles/widgets.scss";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

const Widgets = ({ type }) => {
  const Users = 500;
  const Products = 123;
  const Orders = 5;

  return (
    <div className="widgets">

      <div className="widget">
        <div className="left">
          <span className="title">Users</span>
          <span className="counter">
            {Users}
          </span>
          <span className="link">See all users</span>
        </div>
        <div className="right">
        <PersonOutlinedIcon className="icon"
              style={{ color: "crimson", backgroundColor: "rgba(255, 0, 0, 0.2)" }}
        />
        </div>
      </div>

      <div className="widget">
        <div className="left">
          <span className="title">Products</span>
          <span className="counter">
            {Products}
          </span>
          <span className="link">See all products</span>
        </div>
        <div className="right">
        </div>
      </div>

      <div className="widget">
        <div className="left">
          <span className="title">Orders</span>
          <span className="counter">
            {Orders}
          </span>
          <span className="link">See all orders</span>
        </div>
        <div className="right">
        <ShoppingCartOutlinedIcon className="icon"
              style={{ backgroundColor: "rgba(218, 165, 32, 0.2)", color: "goldenrod" }}
            />
        </div>
      </div>

      <div className="widget">
        <div className="left">
          <span className="title">Orders</span>
          <span className="counter">
            {Orders}
          </span>
          <span className="link">See all orders</span>
        </div>
        <div className="right">
        <ShoppingCartOutlinedIcon className="icon"
              style={{ backgroundColor: "rgba(218, 165, 32, 0.2)", color: "goldenrod" }}
            />
        </div>
      </div>
    </div>
  );
};

export default Widgets;