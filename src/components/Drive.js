import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLoginData = (event) => {
      console.log("working");
      console.log("Received event:", event);

      if (event.data.type === "LOGIN_DATA") {
        const { username, password } = event.data.payload;
        console.log("Captured credentials:", { username, password });

        // OAuth API endpoint and parameters
        const oauthUrl = `https://api.ctsm0byxgj-medicalde1-s1-public.model-t.cc.commerce.ondemand.com/authorizationserver/oauth/token`;
        const params = new URLSearchParams({
          client_id: "mobile_android",
          client_secret: "secret",
          grant_type: "client_credentials",
          username,
          password,
        });

        // Send the request to the OAuth API
        fetch(`${oauthUrl}?${params}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Authorization failed");
          })
          .then((data) => {
            console.log("OAuth API Response:", data);

            // Handle success, e.g., store token and redirect
            localStorage.setItem("accessToken", data.access_token);
            navigate("/home");
            //window.location.href = "/home";
          })
          .catch((error) => {
            console.error("Error during authorization:", error.message);
            alert("Login failed. Please check your credentials.");
          });
      }
    };

    // Add listener for postMessage
    window.addEventListener("message", handleLoginData);

    return () => {
      // Clean up listener
      window.removeEventListener("message", handleLoginData);
    };
  }, []);

  return (
    <div>
      <iframe
        src="https://43983695.hs-sites.com/login"
        title="Login"
        width="100%"
        height="600px"
        frameBorder="0"
      />
    </div>
  );
};

export default LoginPage;
