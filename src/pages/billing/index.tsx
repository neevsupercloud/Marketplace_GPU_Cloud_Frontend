import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
// import PaymentRequest from './PaymentRequest'
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51PdSN2RtSGFvExvinCKkuTPlbMSzebsO0YoadH50hUu65jgpdFojxDuAoAvXhKzBf2O8U61AvxXWpxYie4Tu8F7600afnkLzV9', {
  apiVersion: '2024-06-20', // Replace with your desired Stripe API version
});


const Billing = () => {
  const [isPending, setIsPending] = useState(true)

  const [billUrl, setBillUrl] = useState('')

  async function createStripeResources() {
    const price = await stripe.prices.create({
      currency: 'inr',
  unit_amount: 10,
  product: 'prod_QURL7g9YIwS3fY',
    });
  
    console.log("price", price);
  
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: 'price_1PdST3RtSGFvExviaD8DykE1',
          quantity: 1,
        },
      ],
    });
  
    console.log("paymentLink", paymentLink.url);
    setBillUrl(paymentLink.url)
  }
  
  
  useEffect(() => {
    createStripeResources();
  }, []);


  return (
    <div>
        <div className="rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-7">
        <h2 className='text-gray-50 text-2xl'>Billing Overview</h2>
        </div>

        <table className='w-full mt-5 '>
          <thead className='bg-gray-300 py-4 '>
            <tr className='rounded'>
              <th className='border-b-2 border-gray-200 text-left p-4'>Delete Storage</th>
              <th className='border-b-2 border-gray-200 text-left p-4'>Period Start</th>
              <th className='border-b-2 border-gray-200 text-left p-4'>Period End</th>
              <th className='border-b-2 border-gray-200 text-left p-4'>Total Storage</th>
              <th className='border-b-2 border-gray-200 text-left p-4'>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border-b border-gray-200 text-left p-4'>100 GB</td>
              <td className='border-b border-gray-200 text-left p-4' >10-July, 2024</td>
              <td className='border-b border-gray-200 text-left p-4'>10-August, 2024</td>
              <td className='border-b border-gray-200 text-left p-4'>1TB</td>
              <td className='border-b border-gray-200 text-left p-4'>
                {isPending?<Link to={billUrl} target='_blank'><button className='bg-gray-0 border border-1 border-[#5C80F7] hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 rounded px-6 py-1 hover:text-gray-50' onClick={()=> setIsPending(true)}>Pay Now</button></Link>:'Paid'}
                {/* {isPending?<Link to={`${paymentLink}`}><button className='bg-gray-0 border border-1 border-purple-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 rounded px-6 py-1 hover:text-gray-50' onClick={()=> setIsPending(false)}>Pay Now</button></Link>:'Paid'} */}
              </td>
            </tr>
          </tbody>
        </table>
        
      {/* <PaymentRequest /> */}
    </div>
  )
}

export default Billing