import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '@windmill/react-ui';
import axios from 'axios';
import { config } from '../assets/config/config';
import ThemedSuspense from '../components/ThemedSuspense';

const apiUrl = config.api.url;

// Custom Toolbar Component
const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header" defaultValue="">
      <option value="1">Heading 1</option>
      <option value="2">Heading 2</option>
      <option value="">Normal</option>
    </select>

    <select className="ql-size" defaultValue="medium">
      <option value="small"></option>
      <option value="medium"></option>
      <option value="large"></option>
      <option value="huge"></option>
    </select>

    <button className="ql-bold" />
    <button className="ql-italic" />
    <button className="ql-underline" />
    <button className="ql-strike" />

    <select className="ql-color" />
    <select className="ql-background" />

    <button className="ql-list" value="ordered" />
    <button className="ql-list" value="bullet" />

    <button className="ql-indent" value="-1" />
    <button className="ql-indent" value="+1" />

    <select className="ql-align" />

    <button className="ql-link" />
    <button className="ql-image" />
    <button className="ql-video" />

    <button className="ql-blockquote" />
    <button className="ql-code-block" />

    <button className="ql-clean" />
  </div>
);

const PrivacyAndPolicy = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const handleEditToggle = () => setIsEditing(prev => !prev);
  const handlePrivacyPolicyChange = (value) => setPrivacyPolicy(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/manage-web/add-privacy-policy`, { description: privacyPolicy });
      alert('Privacy and Policy page updated successfully');
    } catch (error) {
      console.error('Error updating Privacy and Policy page:', error);
    } finally {
      handleEditToggle();
    }
  };

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const response = await axios.get(`${apiUrl}/manage-web/get-privacy-policy`);
        setPrivacyPolicy(response.data.data.description);
      } catch (error) {
        console.error("Error fetching privacy and policy:", error);
      }
    };
    fetchPrivacyPolicy().then(() => setIsLoaded(true));
  }, []);

  if (!isLoaded) {
    return <ThemedSuspense />;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-700">Edit Privacy and Policy Page</h1>
      <div className="flex flex-row justify-between">
        <h2>Privacy and Policy</h2>
        {isEditing ? (
          <Button layout="primary" onClick={handleEditToggle}>Cancel</Button>
        ) : (
          <Button layout="outline" onClick={handleEditToggle}>Edit</Button>
        )}
      </div>

      {!isEditing && (
        <ReactQuill
          theme="bubble"
          value={privacyPolicy}
          readOnly
        />
      )}

      {isEditing && (
        <form onSubmit={handleSubmit}>
          <CustomToolbar />
          <ReactQuill
            theme="snow"
            value={privacyPolicy}
            onChange={handlePrivacyPolicyChange}
            modules={PrivacyAndPolicy.modules}
            formats={PrivacyAndPolicy.formats}
            placeholder="Edit Privacy and Policies..."
            className="mt-2"
          />
          <Button type="submit" className="w-full mt-4" layout="primary">Save Changes</Button>
        </form>
      )}
    </div>
  );
};

// Modules and formats for full toolbar features
PrivacyAndPolicy.modules = {
  toolbar: {
    container: "#toolbar",
  },
};


PrivacyAndPolicy.formats = [
  'header',
  'size',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'list', 'bullet',
  'indent',
  'align',
  'link', 'image', 'video',
  'blockquote', 'code-block',
  'clean',
];

export default PrivacyAndPolicy;
