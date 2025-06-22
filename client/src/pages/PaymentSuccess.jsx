import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, XCircle } from 'lucide-react';   
import { SnackbarContext } from '../context/SnackbarContext';
import { config } from '../assets/config/config';

const PaymentSuccess = () => {
  const { session_id } = useParams();
  const navigate = useNavigate();
  const { openSnackbar } = useContext(SnackbarContext);

  const [status, setStatus] = useState('pending'); 
  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const { data } = await axios.get(
          `${config.api.url}/payment/stripe/webhook?session_id=${session_id}`
        ); 

        if (data?.success === true && data?.data?.paymentStatus === 'completed') { 
          setStatus('success');
        } else {
          openSnackbar('Payment succeeded but not saved. Contact admin.', 'error');
          setStatus('error');
        }
      } catch (err) {
        console.error('Verification error:', err);
        // openSnackbar('Error verifying payment.', 'error');
        setStatus('error');
      }
    };

    if (session_id) {
      verifyPayment();
    }
  }, [session_id, openSnackbar]);

  const renderContent = () => {
    if (status === 'pending') {
      return (
        <div style={{ display: "grid", justifyItems: "center"}}>
          <h2 style={{ color: '#555' }}>Verifying your payment...</h2>
          <p style={{ color: '#999', marginTop: '8px' }}>
            Please wait while we confirm your transaction.
          </p>
        </div>
      );
    }

    if (status === 'success') {
      return (
        <div style={{ display: "grid", justifyItems: "center"}}>
          <CheckCircle size={64} color="#2ecc71" />
          <h2 style={{ color: '#2ecc71', marginTop: '1rem' }}>Payment Confirmed!</h2>
          <p style={{ color: '#666' }}> Your payment has been successfully processed and your properties is now active.</p>
        </div>
      );
    }

    return (
      <div style={{ display: "grid", justifyItems: "center"}}>
        <XCircle size={64} color="#e74c3c" style={{ display: "grid", justifyItems: "center"}}/>
        <h2 style={{ color: '#e74c3c', marginTop: '1rem' }}>Payment Error</h2>
        <p style={{ color: '#666' }}>
          Your payment was successful but not updated. Please contact support.
        </p>
      </div>
    );
  };

  return (
    <div style={{display:"flex", alignItems: "center", height:"85vh"}}> 
    <div
      style={{
        textAlign: 'center',
        padding: '3rem 1rem',
        maxWidth: '500px',
        margin: '0 auto',
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.06)',
        // display: "flex", 
      }}
    >
      {renderContent()}
      <button
        onClick={() => navigate('/app/userLists')}
        style={{
          marginTop: '2rem',
          padding: '12px 24px',
          backgroundColor: '#2c3e50',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#34495e')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2c3e50')}
      >
        Back to Listings
      </button>
    </div>
    </div>
  );
};

export default PaymentSuccess;
