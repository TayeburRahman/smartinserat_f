import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { Button, Label } from '@windmill/react-ui'; // Windmill components
import axios from 'axios'; // Assuming you'll use axios for submitting data
import { config } from '../assets/config/config';
import ThemedSuspense from '../components/ThemedSuspense';


const apiUrl = config.api.url;

const PrivacyAndPolicy = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(""); // State for terms and conditions
  const [isLoaded, setIsLoaded] = useState(false);

  const handleEditToggle = () => setIsEditing((prev => !prev))

  // Handle change for privacyPolicy and conditions
  const handlePrivacyPolicyChange = (value) => {
    setPrivacyPolicy(value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(privacyPolicy)
    try {
      // Make a request to update the privacyPolicy and privacy policy
      await axios.post(`${apiUrl}/manage-web/add-privacy-policy`, { description: privacyPolicy }); // Adjust the URL as needed
      alert('Privacy and Policy page updated successfully');
    } catch (error) {
      console.error('Error updating Privacy and Policy page:', error);
    } finally {
      handleEditToggle();
    }
  };

  useEffect(() => {
    // Fetch Terms and Conditions
    const fetchPrivacyPolicy = async () => {
      try {
        const response = await axios.get(`${apiUrl}/manage-web/get-privacy-policy`); // Adjust this URL as needed
        console.log("Response.data: ", response.data)
        setPrivacyPolicy(response.data.data.description);
      } catch (error) {
        console.error("Error fetching privacy and policy:", error);
      }
    };
    // Trigger both fetches in parallel
    fetchPrivacyPolicy().then(() => {
      setIsLoaded(true);
    });
  }, []);
  if (!isLoaded) {
    return <ThemedSuspense />;
  }


  return (
    <div className="container mx-auto p-6 ">
      <h1 className="text-2xl font-semibold mb-4">Edit Privacy and Policy Page</h1>
      <div>
        <div className='flex flex-row justify-between'>
          <h2>Privacy and Policy</h2>
          {
            isEditing ? (
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
            )
          }
        </div>



        {
          !isEditing && (
            <div>



              <ReactQuill
                theme="bubble"
                value={privacyPolicy}
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
                  value={privacyPolicy}
                  onChange={handlePrivacyPolicyChange}
                  placeholder="Edit Privacy and Policies..."
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

export default PrivacyAndPolicy;