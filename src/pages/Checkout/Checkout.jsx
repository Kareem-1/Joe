import { useState } from 'react';
import CheckoutForm from './CheckoutForm';
import CartReview from './CartReview';
import { useCart } from '../../context/CartContext';
import './checkout.css';
import { Link } from 'react-router-dom';

function Checkout() {
  const [formData, setFormData] = useState({
    drName: '',
    clinicName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    additionalDetails: '',
    agreeToTerms: false,
    email: '',
    building: '',
    floor: '',
    apartment: '',
    deliveryOption: false,
  });

  const [paymentUrl, setPaymentUrl] = useState(null);
  const { cartItems } = useCart();

  const fixedItemPrice = 0.1; // EGP
  const quantity = cartItems.reduce((acc, item) => acc + item.orderSize, 0) || 1;

  const initiatePaymobPayment = async () => {
    const totalAmountCents = fixedItemPrice * quantity * 100;

    const payload = {
      amountCents: totalAmountCents,
      currency: "EGP",
      merchantOrderId: `order_${Date.now()}`,
      items: [
        {
          name: "Silent Cabinet for Dental Clinics",
          description: "Silent Cabinet for Dental Clinics",
          amount_cents: totalAmountCents,
          quantity: quantity,
        },
      ],
      firstName: formData.drName,
      lastName: formData.clinicName,
      phoneNumber: formData.phoneNumber,
      country: "EG",
      city: formData.city,
      email: formData.email || "example@example.com",
      street: formData.address,
      building: formData.building || "N/A",
      floor: formData.floor || "N/A",
      apartment: formData.apartment || "N/A",
    };

    try {
      const response = await fetch("https://joe-sbackend.fly.dev/paymob/api/initiate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Payment initiation failed");
      }

      const data = await response.json();
      const constructedUrl = `https://accept.paymob.com/api/acceptance/iframes/${data.iframeId}?payment_token=${data.paymentKey}`;
      setPaymentUrl(constructedUrl);
    } catch (error) {
      alert("Payment initiation failed. Please try again.", error);
    }
  };

  const handlePayNow = async () => {
    if (
      !formData.drName ||
      !formData.clinicName ||
      !formData.phoneNumber ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.agreeToTerms
    ) {
      alert("Please fill out all required fields and agree to the Terms and Conditions.");
      return;
    }
    await initiatePaymobPayment();
  };

  return (
    <div>
      <Link to="/shop" className="back-button">← Back To Shop</Link>
      <div className="app-container2">
        {paymentUrl ? (
            <iframe src={paymentUrl} title="Paymob Payment" className="payment-iframe"></iframe>
        ) : (
          <>
            <div className="left-column">
              <h2 className="checkout-title">Checkout</h2>
              <CheckoutForm formData={formData} setFormData={setFormData} />
            </div>
            <div className="right-column">
              <CartReview onPayNow={handlePayNow} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Checkout;
