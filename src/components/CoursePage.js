import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link
import axios from "axios";

const ACCOUNT_ID = "43983695";
const TABLE_ID = "100594471";  // Replace with the actual Table ID

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchHubDBData = async () => {
      try {
        // Fetch HubDB data
        const response = await axios.get(
          `https://api.hubapi.com/cms/v3/hubdb/tables/${TABLE_ID}/rows?portalId=${ACCOUNT_ID}`
        );

        const data = response.data.results;

        if (data.length > 0) {
          setCourses(data); // Store the fetched data with images and prices
        } else {
          console.error("No data found in HubDB response.");
        }
      } catch (error) {
        console.error("Error fetching HubDB data:", error);
      }
    };

    fetchHubDBData();
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 1500);
  }, []);

  return (
    <div className="p-8 bg-[#01C5FB] min-h-screen relative">
      {/* Login successful message displayed without taking space */}
      {showMessage && (
        <div className="absolute top-0 left-0 mt-4 ml-4">
          <h2 className="text-xl text-white font-semibold text-center">
            Login successful!
          </h2>
        </div>
      )}

      <h1 className="text-4xl font-bold text-center mb-6 text-white">Product Details</h1>
      <p className="text-center text-lg mb-6 text-white">Explore the following products:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex">
              {/* Left Side for Image */}
              <div className="flex-shrink-0 w-1/3">
                <img
                  src={course.values.image.url} // Image URL from HubDB
                  alt={course.values.name}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              {/* Right Side for Name, Description, and Price */}
              <div className="ml-4 flex-grow">
                <Link
                  to={`/product/${course.id}`} // Product detail link
                  className="text-xl font-semibold mb-2 hover:underline"
                >
                  {course.values.name}
                </Link>
                <p className="text-gray-600">{course.values.description}</p>
                {/* Price from HubDB */}
                <p className="text-lg font-semibold text-green-500 mt-4">
                  Price: ₹{course.values.price} {/* Assuming the price field is in your HubDB table */}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default CoursePage;
