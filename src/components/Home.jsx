import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [page, setPageData] = useState(null);

  const [token, setToken] = useState(null);
  const [cartData, setCartData] = useState(null);
  const [cartDetails, setCartDetails] = useState(null);

  useEffect(() => {
    const fetchHubSpotPage = async () => {
      const slug = "cart_page";
      const apiUrl = `http://localhost:3001/api/hubspot?slug=${slug}`;

      try {
        const response = await axios.get(apiUrl);
        const fetchedData = response.data.objects[0];

        setPageData(fetchedData);
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
          console.log(response.data.entries);
        } catch (err) {
          console.log(err.message);
        }
      }
    };

    getCart();
  }, [token]);

  if (!page && !cartData) {
    return <div>Loading...</div>;
  }

  console.log("cartData", cartData);

  return (
    <div className="cart">
      <div className="Header">
        <div dangerouslySetInnerHTML={{ __html: page.head_html }} />
      </div>

      <div className="cartHeader">
        <p className="head-1">Cart | ID:{cartDetails?.code}</p>
        <p className="head-2">{`< Continue Shopping`}</p>
      </div>

      <div className="address">
        <p>
          Delivery Address: (0000129795)99 SEAVIEW BLVD,PORT
          WASHINCTON,NY,11050-4606
        </p>
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

      <div className="footer">
        <div dangerouslySetInnerHTML={{ __html: page.footer_html }} />
      </div>
    </div>
  );
};

export default Home;
