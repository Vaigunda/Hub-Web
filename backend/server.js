require("dotenv").config(); // Load environment variables from .env file

const cors = require("cors");
const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: ["https://hub-web-1.onrender.com", "http://localhost:3000"],
  })
);

app.get("/api/hubspot", async (req, res) => {
  const slug = req.query.slug;
  const apiUrl = `https://api.hubapi.com/content/api/v2/pages?slug=${slug}`;
  const token = process.env.HUBSPOT_API_KEY;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching HubSpot data:", error, message);
    res.status(500).send("Failed to fetch data from HubSpot");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
