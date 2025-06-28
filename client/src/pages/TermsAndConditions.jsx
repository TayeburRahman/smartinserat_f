import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { Button } from '@windmill/react-ui';
import axios from 'axios';
import { config } from '../assets/config/config';
import ThemedSuspense from '../components/ThemedSuspense';

const apiUrl = config.api.url;

// কাস্টম টুলবার ডিফাইন করছি
const CustomToolbar = () => (
  <div id="toolbar">
    {/* ফন্ট স্টাইল */}
    <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
      <option value="1">Heading 1</option>
      <option value="2">Heading 2</option>
      <option value="">Normal</option>
    </select>

    {/* ফন্ট ফ্যামিলি (optional) */}
    {/* <select className="ql-font">
      <option value="sans-serif" selected>Sans Serif</option>
      <option value="serif">Serif</option>
      <option value="monospace">Monospace</option>
    </select> */}

    {/* ফন্ট সাইজ */}
    <select className="ql-size" defaultValue="medium" onChange={e => e.persist()}>
      <option value="small"></option>
      <option value="medium"></option>
      <option value="large"></option>
      <option value="huge"></option>
    </select>

    {/* ফরম্যাট বাটন */}
    <button className="ql-bold" />
    <button className="ql-italic" />
    <button className="ql-underline" />
    <button className="ql-strike" />

    {/* রঙ */}
    <select className="ql-color" />
    <select className="ql-background" />

    {/* লিস্ট */}
    <button className="ql-list" value="ordered" />
    <button className="ql-list" value="bullet" />

    {/* ইনডেন্টেশন */}
    <button className="ql-indent" value="-1" />
    <button className="ql-indent" value="+1" />

    {/* এলাইনমেন্ট */}
    <select className="ql-align" />

    {/* লিংক, ছবি, ভিডিও */}
    <button className="ql-link" />
    <button className="ql-image" />
    <button className="ql-video" />

    {/* ব্লককোট, কোড ব্লক */}
    <button className="ql-blockquote" />
    <button className="ql-code-block" />

    {/* ক্লিন (স্টাইল রিসেট) */}
    <button className="ql-clean" />
  </div>
);

const TermsAndConditions = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [terms, setTerms] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const handleEditToggle = () => setIsEditing(prev => !prev);
  const handleTermsChange = (value) => setTerms(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/manage-web/add-terms-conditions`, { description: terms });
      alert('Terms and Conditions updated successfully');
    } catch (error) {
      console.error('Error updating Terms:', error);
    } finally {
      handleEditToggle();
    }
  };

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await axios.get(`${apiUrl}/manage-web/get-terms-conditions`);
        setTerms(response.data.data.description);
      } catch (error) {
        console.error("Error fetching terms:", error);
      }
    };
    fetchTerms().then(() => setIsLoaded(true));
  }, []);

  if (!isLoaded) {
    return <ThemedSuspense />;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Edit Terms and Conditions Page</h1>
      <div className='flex justify-between items-center mb-4'>
        <h2>Terms and Conditions</h2>
        {isEditing ? (
          <Button layout='primary' onClick={handleEditToggle}>Cancel</Button>
        ) : (
          <Button layout='outline' onClick={handleEditToggle}>Edit</Button>
        )}
      </div>

      {!isEditing && (
        <ReactQuill theme="bubble" value={terms} readOnly />
      )}

      {isEditing && (
        <form onSubmit={handleSubmit}>
          <CustomToolbar />
          <ReactQuill
            theme="snow"
            value={terms}
            onChange={handleTermsChange}
            modules={TermsAndConditions.modules}
            formats={TermsAndConditions.formats}
            placeholder="Edit Terms and Conditions..."
            className="mt-2"
          />
          <Button type="submit" className="w-full mt-4" layout='primary'>Save Changes</Button>
        </form>
      )}
    </div>
  );
};

// সম্পূর্ণ toolbar সেটিংস যা সব ফরম্যাট ফিল্ড অন্তর্ভুক্ত করবে
TermsAndConditions.modules = {
  toolbar: {
    container: "#toolbar",
  },
};

TermsAndConditions.formats = [
  'header',
  'font',
  'size',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'list', 'bullet',
  'indent',
  'align',
  'link', 'image', 'video',
  'blockquote', 'code-block',
  'clean'
];

export default TermsAndConditions;
