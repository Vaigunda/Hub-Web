import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [page, setPageData] = useState(null);

  const [token, setToken] = useState(null);
  const [cartData, setCartData] = useState(null);
  const [cartDetails, setCartDetails] = useState(null);
  const [pageDetails, setPageDetails] = useState(null);
  const [buttonArray, setButtonArrya] = useState(null);
  const [buttonCol, setButtonColor] = useState(null);
  const pageDetailsArray = [];
  const buttonTxt = [];

  useEffect(() => {
    const fetchHubSpotPage = async () => {
      const slug = "cart_page";
      const apiUrl = `https://hub-web-sca2.onrender.com/api/hubspot?slug=${slug}`;

      try {
        const response = await axios.get(apiUrl);
        const fetchedData = response.data.objects[0];

        setPageData(fetchedData);

        const nestedData = fetchedData?.layout_sections?.dnd_area;
        const cartId = nestedData?.rows[0][0].rows[0][0].params.value;
        const continueShopping = nestedData?.rows[0][0].rows[1][0].params.value;
        const address = nestedData?.rows[1][0].rows[0][0].params.value;

        pageDetailsArray.push(cartId);
        pageDetailsArray.push(continueShopping);
        pageDetailsArray.push(address);
        setPageDetails(pageDetailsArray);

        const btn1 =
          nestedData?.rows[1][0]?.rows[1][0]?.rows[0][0]?.params?.button_text;
        const btn2 =
          nestedData?.rows[1][0]?.rows[1][4]?.rows[0][0]?.params?.button_text;
        const btn3 =
          nestedData?.rows[1][0]?.rows[1][8]?.rows[0][0]?.params?.button_text;

        const buttonColor =
          nestedData?.rows[1][0]?.rows[1][0]?.rows[0][0]?.params?.styles
            ?.background?.color?.color;
        setButtonColor(buttonColor);

        buttonTxt.push(btn1);
        buttonTxt.push(btn2);
        buttonTxt.push(btn3);
        setButtonArrya(buttonTxt);
      } catch (error) {
        console.error(
          "Error fetching page content from HubSpot:",
          error.message
        );
      }
    };

    const key = localStorage.getItem("accessToken");
    setToken(key);

    fetchHubSpotPage();
  }, []);

  useEffect(() => {
    const getCart = async () => {
      if (token) {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const apiUrl =
            "https://stage-store.drivemedical.com/drivecommercewebservices/v2/us/users/nareshvarma60k@gmail.com/carts/0000000430?fields=DEFAULT";
          const response = await axios.get(apiUrl, config);
          setCartData(response.data.entries);
          setCartDetails(response.data);
          // console.log(response.data.entries);
        } catch (err) {
          console.log(err.message);
        }
      }
    };

    getCart();
  }, [token]);

  if (!page || !cartData) {
    return <div>Loading...</div>;
  }

  console.log("cartDetails", cartDetails);

  return (
    <div className="cart">
      <div className="Header">
        <div dangerouslySetInnerHTML={{ __html: page?.head_html }} />
      </div>

      <div className="cartHeader">
        <p className="head-1">{pageDetails[0]}</p>
        <p className="head-2">{pageDetails[1]}</p>
      </div>

      <div className="address">
        <p>{pageDetails[2]}</p>
      </div>

      <div className="btnFlex">
        <button style={{ backgroundColor: buttonCol }}>{buttonArray[0]}</button>
        <button style={{ backgroundColor: buttonCol }}>{buttonArray[1]}</button>
        <button style={{ backgroundColor: buttonCol }}>{buttonArray[2]}</button>
      </div>

      <div className="table">
        <table
          style={{
            borderCollapse: "collapse",
            border: "none",
            width: "100%",
            margin: "20px 0",
            fontSize: "18px",
            textAlign: "left",
          }}
        >
          <thead>
            <tr
              style={{
                textTransform: "capitalize",
                borderBottom: "1px solid black",
              }}
            >
              <th>Item</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Unit</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {cartData &&
              cartData.map((d, i) => (
                <tr key={i}>
                  <td>
                    <img src={d?.product?.url} />
                    {d?.product?.name}
                  </td>
                  <td>{d?.product?.price?.value}</td>
                  <td>{d?.quantity}</td>
                  <td>{d?.product?.stock?.stockLevel}</td>
                  <td>{d?.totalPrice?.value}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="total">
        <div className="subTotal">
          <p>Order Subtotal</p>
          <p>{cartDetails?.totalPrice?.value}</p>
        </div>
        <div className="grantTotal">
          <p>Estimated Total:</p>
          <p>{cartDetails?.totalPriceWithTax.value}</p>
        </div>
      </div>

      <div className="checkout">
        <button style={{ backgroundColor: buttonCol }}>
          Proceed TO Checkout
        </button>{" "}
      </div>

      <div className="footer">
        <div dangerouslySetInnerHTML={{ __html: page?.footer_html }} />
      </div>
    </div>
  );
};

export default Home;
