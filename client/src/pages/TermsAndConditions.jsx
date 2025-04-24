import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { Button, Label } from '@windmill/react-ui'; // Windmill components
import axios from 'axios'; // Assuming you'll use axios for submitting data
import { config } from '../assets/config/config';
import ThemedSuspense from '../components/ThemedSuspense';


const apiUrl = config.api.url;
const TermsAndConditions = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [terms, setTerms] = useState(""); // State for terms and conditions
  const [isLoaded, setIsLoaded] = useState(false);


  const handleEditToggle = () => setIsEditing((prev => !prev))

  // Handle change for terms and conditions
  const handleTermsChange = (value) => {
    setTerms(value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(terms)
    try {
      // Make a request to update the terms and privacy policy
      await axios.post(`${apiUrl}/manage-web/add-terms-conditions`, { description: terms }); // Adjust the URL as needed
      alert('Terms and Conditions page updated successfully');
    } catch (error) {
      console.error('Error updating Terms and Conditions page:', error);
    } finally {
      handleEditToggle();
    }
  };

  useEffect(() => {
    // Fetch Terms and Conditions
    const fetchTerms = async () => {
      try {
        const response = await axios.get(`${apiUrl}/manage-web/get-terms-conditions`); // Adjust this URL as needed
        console.log("Response.data: ", response.data)
        setTerms(response.data.data.description);
      } catch (error) {
        console.error("Error fetching terms and conditions:", error);
      }
    };
    // Trigger both fetches in parallel
    fetchTerms().then(() => {
      setIsLoaded(true);
    });
  }, []);


  if (!isLoaded) {
    return <ThemedSuspense />;
  }



  return (

    <div className="container mx-auto p-6 ">
      <h1 className="text-2xl font-semibold mb-4">Edit Terms and Conditions Page</h1>
      <div>
        <div className='flex flex-row justify-between'>
          <h2>Terms and Conditions</h2>
          {isEditing ? (
            <Button
              layout='primary'
              onClick={handleEditToggle}
            >
              Cancel
            </Button>
          ) : (
            <Button
              layout='outline'
              onClick={handleEditToggle}
            >
              Edit
            </Button>

          )}
        </div>

        {
          !isEditing && (
            <div>


              <ReactQuill
                theme="bubble"
                value={terms}
                readOnly
              />
            </div>
          )
        }

        {
          isEditing && (
            <form onSubmit={handleSubmit}>
              {/* Terms and Conditions Editor */}
              <div className="mb-6">

                <ReactQuill
                  theme="snow"
                  value={terms}
                  onChange={handleTermsChange}
                  placeholder="Edit Terms and Conditions..."
                  className="mt-2"
                />
              </div>
              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                layout='primary'
              >
                Save Changes
              </Button>
            </form>
          )
        }
      </div>
    </div>
  )
}

export default TermsAndConditions;