import React, { useEffect, useState } from "react";
import "./Cart.css";
import axios from "axios";

const Cart = () => {
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const fetchHubSpotPage = async () => {
      const slug = "cart_page"; // Use the appropriate slug for your page
      const apiUrl = `http://localhost:3001/api/hubspot?slug=${slug}`;

      try {
        const response = await axios.get(apiUrl);
        const fetchedData = response.data.objects[0];
        console.log("Fetched Data:", fetchedData);
        setPageData(fetchedData);
      } catch (error) {
        console.error(
          "Error fetching page content from HubSpot:",
          error.message
        );
      }
    };

    fetchHubSpotPage();
  }, []);

  if (!pageData) {
    return <div>Loading...</div>;
  }

  return <div>Cart</div>;
};

export default Cart;
