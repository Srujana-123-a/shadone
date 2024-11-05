// components/PaymentDashboard.tsx
"use client";

import React from 'react';

interface PaymentIconProps {
  children: React.ReactNode;
  hasNotification?: boolean;
  isLight?: boolean;
}

interface PaymentOptionProps {
  title: string;
  icon: React.ReactNode;
  hasNotification?: boolean;
  isAmazonPay?: boolean;
  hasOffer?: boolean;
}

const PaymentIcon: React.FC<PaymentIconProps> = ({ children, hasNotification, isLight }) => (
  <div className={`relative w-12 h-12 flex items-center justify-center rounded-full ${isLight ? 'bg-white' : 'bg-gray-900'}`}>
    {children}
    {hasNotification && (
      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
        1
      </span>
    )}
  </div>
);

const PaymentOption: React.FC<PaymentOptionProps> = ({ title, icon, hasNotification, isAmazonPay, hasOffer }) => (
  <div className="flex flex-col items-center gap-2">
    <PaymentIcon hasNotification={hasNotification} isLight={!isAmazonPay}>
      {icon}
    </PaymentIcon>
    <span className="text-sm font-medium text-gray-800">{title}</span>
    {hasOffer && (
      <span className="px-2 py-0.5 text-xs bg-orange-500 text-white rounded-full">
        OFFERS
      </span>
    )}
  </div>
);

const PaymentDashboard: React.FC = () => {
  return (
    <div className="w-full max-w-md p-6 bg-gradient-to-r from-pink-500 via-pink-400 to-yellow-400 rounded-xl shadow-lg">
      <div className="grid grid-cols-2 gap-8">
        <PaymentOption
          title="Amazon Pay"
          hasNotification={true}
          isAmazonPay={true}
          icon={
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />
        
        <PaymentOption
          title="Send Money"
          icon={
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 19L19 12L12 5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 12H5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />
        
        <PaymentOption
          title="Scan any QR"
          icon={
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 3H9V9H3V3Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 3H21V9H15V3Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 15H9V21H3V15Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 15H21V21H15V15Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />
        
        <PaymentOption
          title="Recharge & Bills"
          hasOffer={true}
          icon={
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 9V15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 12H8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />
      </div>
    </div>
  );
};

export default PaymentDashboard;