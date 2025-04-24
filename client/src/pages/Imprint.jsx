import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { Button } from '@windmill/react-ui'; // Windmill components
import axios from 'axios'; // Assuming you'll use axios for submitting data
import ThemedSuspense from '../components/ThemedSuspense';
import { config } from '../assets/config/config';


const apiUrl = config.api.url;

const Imprint = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [contact, setContact] = useState(""); // State for terms and conditions

    const [isLoaded, setIsLoaded] = useState(false);


    const handleEditToggle = () => setIsEditing((prev => !prev))

    // Handle change for privacyPolicy and conditions
    const handleContactChnage = (value) => {
        setContact(value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a request to update the privacyPolicy and privacy policy
            await axios.post(`${apiUrl}/manage-web/add-about-us`, { description: contact }); // Adjust the URL as needed
            alert('Contact page updated successfully');
        } catch (error) {
            console.error('Error updating contact page:', error);
        } finally {
            handleEditToggle();
        }
    };

    useEffect(() => {
        // Fetch Terms and Conditions
        const fetchContact = async () => {
            try {
                const response = await axios.get(`${apiUrl}/manage-web/get-about-us`); // Adjust this URL as needed
                console.log("Response.data: ", response.data)
                setContact(response.data.data.description);
            } catch (error) {
                console.error("Error fetching contact:", error);
            }
        };
        // Trigger both fetches in parallel
        fetchContact().then(() => {
        setIsLoaded(true)
        })
    }, []);

    if (!isLoaded) {
        return <ThemedSuspense />;
    }


    return (
      <div className="container mx-auto p-6 ">
      <h1 className="text-2xl font-semibold mb-4">Edit Imprint Page</h1>
        <div>

            <div className='flex flex-row justify-between'>
                <h2>Imprint</h2>

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
                            value={contact}
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
                                value={contact}
                                onChange={handleContactChnage}
                                placeholder="Edit imprint..."
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

export default Imprint;