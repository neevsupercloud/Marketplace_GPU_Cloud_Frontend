// src/components/Billing.tsx
import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
import Funds from './fund';
import Usage from './Usage';
// import billing from ''
// import Cards from './billing/Cards';
// import BillHistory from './billing/BillHistory';
// import PromotionalCredits from './billing/PromotionalCredits';
// import BillingAddress from './billing/BillingAddress';

const navItems = [
  { name: 'Usage', component: Usage },
  { name: 'Funds', component: Funds },
  
  // { name: 'Bill History', component: BillHistory },
  // { name: 'Promotional Credits', component: PromotionalCredits },
  // { name: 'Billing Address', component: BillingAddress },
];

const Billing: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Usage');

  const renderContent = () => {
    const activeItem = navItems.find(item => item.name === activeTab);
    if (activeItem) {
      const Component = activeItem.component;
      return <Component />;
    }
    return null;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Billing</h1>
      <nav className="mb-4">
        <ul className="flex space-x-4 border-b">
          {navItems.map(item => (
            <li key={item.name}>
              <button
                className={`pb-2 ${activeTab === item.name ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
                onClick={() => setActiveTab(item.name)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {renderContent()}
    </div>
  );
};

export default Billing;
