import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HubSpot = () => {
  const [pageContent, setPageContent] = useState(null); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHubSpotPage = async () => {
      const slug = 'testing-page'; // Hardcoded slug for testing
      const apiUrl = `https://hub-web-sca2.onrender.com/api/hubspot?slug=${slug}`; // Make request to your backend

      try {
        const response = await axios.get(apiUrl);

        console.log('Fetched Data:', response.data.objects[0]);
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
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : pageContent ? (
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
        <p>No content found.</p>
      )}
    </div>
  );
};

export default HubSpot;
