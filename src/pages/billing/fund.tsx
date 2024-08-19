import  { useEffect, useState } from 'react';
import { useStore } from '../../store';
import billing from '../../asset/icons8-wallet-30.png';
import dollar from '../../asset/icons8-dollar-30.png';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe('sk_test_51LaHNDSDaCHyKtDmFDmrw9Rcyj9qrgOp8fXofjEIjRnTl9ij49nk3PfAm2qUBHouhNNPJCQjuK3EhEscpMJdYELo00U7qgfFH1', {
  apiVersion: '2024-06-20', // Replace with your desired Stripe API version
});

function Fund() {
  const { price } = useStore();
  const [billUrl, setBillUrl] = useState('');

  async function createStripeResources() {
    try {
      // Ensure the total amount is at least 50 cents
      const minAmountCents = 50; // 50 cents in USD
      const unitAmountCents = Math.max(price * 100, minAmountCents);

      const createdPrice = await stripe.prices.create({
        currency: 'usd',
        unit_amount: unitAmountCents, // Stripe expects amount in the smallest currency unit (e.g., cents for USD)
        product: 'prod_QWMYCZrbzeJSeF',
      });

      console.log("createdPrice", createdPrice);

      const paymentLink = await stripe.paymentLinks.create({
        line_items: [
          {
            price: createdPrice.id,
            quantity: 1, // Set the quantity based on your requirement
          },
        ],
      });

      console.log("paymentLink", paymentLink.url);
      setBillUrl(paymentLink.url);
    } catch (error) {
      console.error('Error creating Stripe resources:', error);
    }
  }

  useEffect(() => {
    createStripeResources();
  }, [price]); // Recreate Stripe resources whenever the price changes

  const handleDepositClick = () => {
    if (billUrl) {
      window.location.href = billUrl;
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <div
          style={{
            backgroundColor: '#ffffff',
            color: '#3f5175',
            padding: '20px',
            borderRadius: '10px',
            width: '30%',
            border: '2px solid',
            borderColor: '#673ab7',
            display: 'flex',
            gap: '20px',
          }}
        >
          <img style={{ height: '30px', marginTop: '10px' }} src={billing} alt="billing" />
          <div>
            <p style={{ margin: '0', fontSize: '20px', fontWeight: 500 }}>${price}</p>
            <p style={{ margin: '0', fontSize: '14px', fontWeight: 500 }}>Current Month Usage</p>
          </div>
        </div>
        <div
          style={{
            backgroundColor: '#ffffff',
            color: '#3f5175',
            padding: '20px',
            borderRadius: '8px',
            width: '30%',
            border: '2px solid',
            borderColor: '#673ab7',
            display: 'flex',
            gap: '20px',
          }}
        >
          <img style={{ height: '30px', marginTop: '10px' }} src={dollar} alt="dollar" />
          <div>
            <p style={{ margin: '0', fontSize: '20px', fontWeight: 500 }}>0.00 USD</p>
            <p style={{ margin: '0', fontSize: '14px', fontWeight: 500 }}>Account Credit</p>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      >
        <h3 style={{ marginBottom: '20px' }}>Add funds</h3>
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <button
            style={{
              backgroundColor: '#1E90FF',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              marginRight: '10px',
            }}
          >
            Stripe
          </button>
          {/* <button
            style={{
              backgroundColor: '#f0f0f0',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
            }}
          >
            RazorPay
          </button> */}
        </div>
        <div style={{ marginBottom: '20px' }}>
          <input type="radio" id="100USD" name="amount" value="100USD" style={{ marginRight: '10px' }} />
          <label htmlFor="100USD">100 USD</label>
          <input
            type="radio"
            id="customAmount"
            name="amount"
            value="customAmount"
            style={{ marginLeft: '20px', marginRight: '10px' }}
          />
          <label htmlFor="customAmount">Custom amount</label>
        </div>
        <button
          onClick={handleDepositClick}
          style={{
            background: 'linear-gradient(to left, rgb(181, 44, 246), rgb(74, 145, 247))',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
          }}
        >
          Deposit
        </button>
      </div>
    </div>
  );
}

export default Fund;
