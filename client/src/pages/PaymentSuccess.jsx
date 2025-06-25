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
        <div style={{ display: "grid", justifyItems: "center" }}>
          <h2 style={{ color: '#555' }}>Zahlung wird überprüft...</h2>
          <p style={{ color: '#999', marginTop: '8px' }}>
            Bitte warte, während wir deine Transaktion bestätigen.
          </p>

        </div>
      );
    }

    if (status === 'success') {
      return (
        <div style={{ display: "grid", justifyItems: "center" }}>
          <CheckCircle size={64} color="#2ecc71" />
          <h2 style={{ color: '#2ecc71', marginTop: '1rem' }}>Zahlung bestätigt!</h2>
          <p style={{ color: '#666' }}>
            Deine Zahlung wurde erfolgreich verarbeitet und deine Immobilie ist jetzt aktiv.
          </p>

        </div>
      );
    }

    return (
      <div style={{ display: "grid", justifyItems: "center" }}>
        <XCircle size={64} color="#e74c3c" style={{ display: "grid", justifyItems: "center" }} />
        <h2 style={{ color: '#e74c3c', marginTop: '1rem' }}>Zahlungsfehler</h2>
        <p style={{ color: '#666' }}>
          Deine Zahlung war erfolgreich, wurde jedoch nicht aktualisiert. Bitte kontaktiere den Support.
        </p>

      </div>
    );
  };

  return (
    <div style={{ display: "flex", alignItems: "center", height: "85vh" }}>
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

        {
          status !== 'pending' && (
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
              Zurück zu den Inseraten
            </button>
          )
        }

      </div>
    </div>
  );
};

export default PaymentSuccess;
