import React, { useState, useEffect } from 'react';
import { StripeIcon, PaystackIcon, CreditCardIcon } from './IconComponents';
import { AppointmentDetails } from '../types';

interface PaymentProps {
  onPaymentSuccess: (paymentMethod: string) => void;
  onBack: () => void;
  price: number;
  details: Partial<AppointmentDetails>;
}

const STRIPE_LIVE_PUBLIC_KEY = process.env.STRIPE_PUBLIC_KEY || 'pk_live_51Rl8nWP0OXBFDAIs5mqRhh9atthTjfxC9DpXPhaQGCzd4LYWxBBqQrmq0kd6orkf8VuiJAzcH0CuRayqzPekdGm900pTg7NIl6';
const PAYSTACK_PUBLIC_KEY = process.env.PAYSTACK_PUBLIC_KEY || 'pk_test_e201bcc36df323415e558f8b20f67d23b7d4035b';

const Payment: React.FC<PaymentProps> = ({ onPaymentSuccess, onBack, price, details }) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);

  useEffect(() => {
    // Security check for the Stripe key
    if (STRIPE_LIVE_PUBLIC_KEY && !STRIPE_LIVE_PUBLIC_KEY.startsWith('pk_')) {
        const keyType = STRIPE_LIVE_PUBLIC_KEY.startsWith('sk_') ? 'Secret Key' : STRIPE_LIVE_PUBLIC_KEY.startsWith('rk_') ? 'Restricted Key' : 'Invalid Key';
        const errorMessage = `Security Alert: An insecure Stripe key (${keyType}) was provided. Payments are disabled. Please use a Public Key (starts with 'pk_').`;
        setStripeError(errorMessage);
        console.error("CRITICAL SECURITY WARNING: A secret or restricted Stripe key was found in the client-side configuration. This is a major security risk. Please replace it with your public key immediately.");
    }
  }, []);


  const handlePayment = async () => {
    if (!selectedMethod || (selectedMethod === 'Stripe' && stripeError)) return;

    setIsProcessing(true);
    if(selectedMethod === 'Stripe') setStripeError(null);

    if (selectedMethod === 'Stripe') {
        try {
            const consultationOption = details.consultation;

            // More robust check for placeholder Stripe Price IDs to provide better user feedback.
            const isPlaceholderId = !consultationOption?.stripePriceId ||
                                    consultationOption.stripePriceId.includes('REPLACE_ME') ||
                                    consultationOption.stripePriceId.includes('FAKE');
            
            if (isPlaceholderId) {
                const errorMessage = !consultationOption?.stripePriceId
                    ? 'Stripe payments are not configured for this service. Please contact support.'
                    : `Configuration needed: The Stripe Price ID for "${consultationOption.title}" is a placeholder. Please update it with a real Price ID from your Stripe Dashboard to enable payments.`;
                throw new Error(errorMessage);
            }
            
            // Save details to localStorage to retrieve after redirect
            localStorage.setItem('checkoutAppointmentDetails', JSON.stringify(details));

            // Use API endpoint for creating checkout session
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    priceId: consultationOption.stripePriceId,
                    customerEmail: details.email,
                    appointmentDetails: details,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create checkout session');
            }

            const { url } = await response.json();
            
            // Redirect to Stripe Checkout
            window.location.href = url;

        } catch (err: any) {
            console.error('Error preparing Stripe Checkout:', err);
            setStripeError(err.message || 'An unexpected error occurred. Please refresh and try again.');
            setIsProcessing(false);
        }

    } else if (selectedMethod === 'Paystack') {
        try {
            // Save details to localStorage to retrieve after redirect
            localStorage.setItem('checkoutAppointmentDetails', JSON.stringify(details));
            
            const handler = (window as any).PaystackPop.setup({
                key: PAYSTACK_PUBLIC_KEY,
                email: details.email || 'customer@email.com', // Ensure email is always provided
                amount: Math.round(price * 100), // Ensure integer amount in kobo
                currency: 'NGN', // Nigerian Naira (Paystack default)
                ref: `ref_${Date.now()}`, // Simpler reference format
                channels: ['card', 'bank', 'ussd', 'mobile_money'], // Explicitly specify channels
                callback: function(response: any) {
                    // Payment completed successfully
                    console.log('Paystack payment successful:', response);
                    setIsProcessing(false);
                    onPaymentSuccess('Paystack');
                },
                onClose: function() {
                    // User closed the payment modal
                    console.log('Paystack payment modal closed');
                    setIsProcessing(false);
                }
            });
            
            handler.openIframe();
            
        } catch (err: any) {
            console.error('Error initializing Paystack:', err);
            setIsProcessing(false);
            alert('Failed to initialize Paystack. Please check your internet connection and try again.');
        }
    }
  };
  
  const renderStripeMessage = () => (
    <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50 text-center animate-fade-in">
        {stripeError ? (
             <p className="text-sm text-red-600 font-semibold">{stripeError}</p>
        ) : (
            <p className="text-sm text-gray-700">You will be redirected to Stripe to complete your payment securely.</p>
        )}
    </div>
  );

  const renderPaystackMessage = () => (
      <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50 text-center animate-fade-in">
          <p className="text-sm text-gray-700">A secure Paystack payment window will open for you to complete your payment.</p>
          <p className="text-xs text-gray-500 mt-1">Supports cards, bank transfers, and mobile money payments.</p>
      </div>
  );
  
  const isStripeDisabled = !!stripeError;

  return (
    <div className="max-w-lg mx-auto">
      <h3 className="text-xl font-semibold text-center mb-6">Secure Payment</h3>
      <div className="space-y-4">
        <button
          onClick={() => setSelectedMethod('Stripe')}
          disabled={isStripeDisabled}
          className={`w-full flex items-center p-4 border-2 rounded-lg transition-all ${selectedMethod === 'Stripe' && !isStripeDisabled ? 'border-brand-blue bg-sky-50 shadow-md' : 'border-gray-200 hover:border-gray-400'} ${isStripeDisabled ? 'bg-red-50 border-red-200 cursor-not-allowed opacity-70' : ''}`}
        >
          <StripeIcon />
          <span className="ml-4 font-semibold text-lg">Pay with Stripe</span>
        </button>
{/* Paystack temporarily disabled
        <button
          onClick={() => setSelectedMethod('Paystack')}
          className={`w-full flex items-center p-4 border-2 rounded-lg transition-all ${selectedMethod === 'Paystack' ? 'border-brand-blue bg-sky-50 shadow-md' : 'border-gray-200 hover:border-gray-400'}`}
        >
          <PaystackIcon />
          <span className="ml-4 font-semibold text-lg">Pay with Paystack (For Africa)</span>
        </button>
        */}
      </div>

      <div className="transition-all duration-300 min-h-[100px]">
        {selectedMethod === 'Stripe' && renderStripeMessage()}
        {selectedMethod === 'Paystack' && renderPaystackMessage()}
      </div>
      
      <div className="text-center p-6 bg-gray-50 rounded-lg mt-8">
          <p className="text-lg font-bold text-brand-dark">Service: {details.consultation?.title}</p>
          <p className="text-sm text-gray-500">30-minute personal consultation</p>
          <p className="text-sm text-gray-500 mt-2">The final amount will be displayed on the secure payment page.</p>
      </div>

      <div className="flex justify-between pt-8">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handlePayment}
          disabled={!selectedMethod || isProcessing || (selectedMethod === 'Stripe' && isStripeDisabled)}
          className="flex items-center justify-center bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed min-w-[180px]"
        >
          {isProcessing ? (
            <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
            </>
          ) : (
            <>
                <CreditCardIcon />
                <span className="ml-2">Pay €{price}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Payment;