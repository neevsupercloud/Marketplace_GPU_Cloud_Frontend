// src/components/Usage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner-loader';
import { useStore } from '../../store';

interface UsageItem {
  resource_type: string;
  region: string;
  date: string;
  quantity: number;
  billable_metric: string;
}

const Usage: React.FC = () => {
  const [data, setData] = useState<UsageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { price, setPrice } = useStore();
  const [error, setError] = useState<string | null>(null);
  const [totalAmount, setTotalAmount] = useState<string>('0.00');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.mkinf.io/v0/usage', {
          headers: {
            Authorization: 'Bearer 4WC70c0pXKICy1AILVtQIBmxcP4KGl'
          }
        });
        setData(response.data.items);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(price,"rufhrufb")

  const calculateAmount = (resourceType: string, quantity: number) => {
    let hourlyPriceUSD = 0;

    switch (resourceType) {
      case 'a40.1x':
        hourlyPriceUSD = 1.10;
        break;
      case 'a40.2x':
        hourlyPriceUSD = 2.20;
        break;
      case 'a40.4x':
        hourlyPriceUSD = 4.40;
        break;
      case 'a40.8x':
        hourlyPriceUSD = 8.80;
        break;
      case 'l40s-48gb.1x':
        hourlyPriceUSD = 1.25;
        break;
      case 'l40s-48gb.2x':
        hourlyPriceUSD = 2.50;
        break;
      case 'l40s-48gb.4x':
        hourlyPriceUSD = 5.00;
        break;
      case 'l40s-48gb.8x':
        hourlyPriceUSD = 10.00;
        break;
      case 'l40s-48gb.10x':
        hourlyPriceUSD = 12.50;
        break;
      case 'a100-40gb-pcie.1x':
        hourlyPriceUSD = 1.60;
        break;
      case 'a100-80gb-pcie.1x':
        hourlyPriceUSD = 1.81;
        break;
      case 'a100-80gb.1x':
        hourlyPriceUSD = 1.81;
        break;
      case 'a100.1x':
        hourlyPriceUSD = 1.60;
        break;
      case 'a100.2x':
        hourlyPriceUSD = 3.20;
        break;
      case 'a100.4x':
        hourlyPriceUSD = 6.40;
        break;
      case 'a100.8x':
        hourlyPriceUSD = 12.80;
        break;
      case 'a100-80gb.2x':
        hourlyPriceUSD = 3.62;
        break;
      case 'a100-80gb.4x':
        hourlyPriceUSD = 7.24;
        break;
      case 'a100-80gb.8x':
        hourlyPriceUSD = 14.48;
        break;
      case 'a100-80gb-sxm-ib.8x':
        hourlyPriceUSD = 17.12;
        break;
      case 'persistent-ssd':
        hourlyPriceUSD = 0.0001369863014;
        break;
      default:
        hourlyPriceUSD = 0;
        break;
    }

    const amount = hourlyPriceUSD * quantity;
    console.log(`Calculated amount for resource type ${resourceType} and quantity ${quantity} is $${amount.toFixed(2)}`);
    return amount;
  };

  useEffect(() => {
    if (data.length > 0) {
      const total = data.reduce((acc, item) => acc + calculateAmount(item.resource_type, item.quantity), 0);
      const totalAmountUSD = total.toFixed(2);
      setTotalAmount(totalAmountUSD);
      setPrice(parseFloat(totalAmountUSD)); // Convert to number before saving to the store
    }
  }, [data, setPrice]);

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Usage Data</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b px-6 py-4 text-left">Resource Type</th>
              <th className="border-b px-6 py-4 text-left">Region</th>
              <th className="border-b px-6 py-4 text-left">Date</th>
              <th className="border-b px-6 py-4 text-left">Quantity</th>
              <th className="border-b px-6 py-4 text-left">Amount (USD)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="bg-white shadow-md rounded-lg mb-4">
                <td className="px-6 py-4 border-b border-gray-200">
                  <div className="font-semibold">{item.resource_type}</div>
                </td>
                <td className="px-6 py-4 border-b border-gray-200">{item.region}</td>
                <td className="px-6 py-4 border-b border-gray-200">{item.date}</td>
                <td className="px-6 py-4 border-b border-gray-200">{item.quantity}</td>
                <td className="px-6 py-4 border-b border-gray-200">
                  ${calculateAmount(item.resource_type, item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
            <tr className="bg-white shadow-md rounded-lg mb-4">
              <td colSpan={4} className="px-6 py-4 border-b border-gray-200 font-bold text-right">Total Amount (USD):</td>
              <td className="px-6 py-4 border-b border-gray-200 font-bold">${totalAmount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Usage;
