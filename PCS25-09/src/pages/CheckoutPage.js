import React from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { getAuthHeader } from '../utils/auth';
import axios from 'axios';

const CheckoutPage = () => {
  const { id, slotNumber } = useParams();
  const [params] = useSearchParams();
  const hours = parseInt(params.get('hours'));
  const navigate = useNavigate();
  const pricePerHour = 50; // placeholder, ideally fetch from state
  const total = pricePerHour * hours;

  const handleBookingSuccess = async () => {
    const now = new Date();
    const end = new Date(now.getTime() + hours * 60 * 60 * 1000);

    await axios.post(
      '/api/bookings/',
      {
        parking_space: id,
        slot_number: parseInt(slotNumber),
        start_time: now.toISOString(),
        end_time: end.toISOString(),
      },
      { headers: getAuthHeader() }
    );

    navigate(`/confirmation/${id}/${slotNumber}`);
  };

  return (
    <div className="min-h-screen bg-primaryDark text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Booking Receipt</h1>
      <p className="mb-2">Slot: {parseInt(slotNumber) + 1}</p>
      <p className="mb-2">Hours: {hours}</p>
      <p className="mb-4">Total: ₹{total}</p>

      <PayPalScriptProvider options={{ clientId: 'AZ3ISAIRTE1OWfk4-W-F_OscRTtmSpNSIdMOSAjql3FoUIUx33lSV23dgOT1Oou_0TWcX0vd8sMLIqLP' }}>
        <PayPalButtons
          createOrder={(data, actions) =>
            actions.order.create({
              purchase_units: [{ amount: { value: (total / 85).toFixed(2) } }], // ₹ to $
            })
          }
          onApprove={async () => {
            await handleBookingSuccess();
          }}
          onError={(err) => {
            console.error(err);
            alert('Payment failed');
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default CheckoutPage;