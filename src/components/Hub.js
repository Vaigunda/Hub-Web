// This is for local, for deploy code is below this
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HubSpot = () => {
  const [pageContent, setPageContent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const fetchHubSpotPage = async () => {
      const slug = 'home_page';
      const apiUrl = `http://localhost:3001/api/hubspot?slug=${slug}`;

      try {
        const response = await axios.get(apiUrl);
        const page = response.data.objects[0];
        setPageContent(page);
      } catch (error) {
        console.error('Error fetching page content from HubSpot:', error);
        setError('Failed to fetch content');
      } finally {
        setLoading(false);
      }
    };

    fetchHubSpotPage();

    // Listen for messages from the iframe
    const handleMessage = (event) => {
      if (event.data.action === 'signInClicked') {
        setShowLogin(true); // Show the login component
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : pageContent ? (
        <div>
          {!showLogin ? (
            <div className="iframe-container">
              <iframe
                src={pageContent.published_url.replace('http://', 'https://')}
                title="HubSpot Page"
                width="100%"
                height="800px"
                frameBorder="0"
                style={{ border: 'none' }}
                loading="lazy"
              />
            </div>
          ) : (
            <div>
              {/* Replace this with your actual login component */}
              <h2>Login Component</h2>
              <form>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <p>No content found.</p>
      )}
    </div>
  );
};

export default HubSpot;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const HubSpot = () => {
//   const [pageContent, setPageContent] = useState(null); 
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHubSpotPage = async () => {
//       const slug = 'testing-page'; // Hardcoded slug for testing
//       const apiUrl = `https://hub-web-sca2.onrender.com/api/hubspot?slug=${slug}`;  // for production
//       // const apiUrl = `http://localhost:3001/api/hubspot?slug=${slug}`; // Make request to your backend

//       try {
//         const response = await axios.get(apiUrl);

//         console.log('Fetched Data:', response.data.objects[0]);
//         const page = response.data.objects[0];
//         setPageContent(page);
//       } catch (error) {
//         console.error('Error fetching page content from HubSpot:', error);
//         setError('Failed to fetch content');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHubSpotPage();
//   }, []);

//   return (
//     <div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>{error}</p>
//       ) : pageContent ? (
//         <div className="iframe-container">
//           <iframe
//             src={pageContent.published_url.replace('http://', 'https://')}
//             title="HubSpot Page"
//             width="100%"
//             height="800px"
//             frameBorder="0"
//             style={{ border: 'none' }}
//             loading="lazy"
//           />
//         </div>
//       ) : (
//         <p>No content found.</p>
//       )}
//     </div>
//   );
// };

// export default HubSpot;
