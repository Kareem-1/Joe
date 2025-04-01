import { useState } from 'react';
import Truck from '../../assets/truck-fast.png';
import PropTypes from 'prop-types';

CheckoutForm.propTypes = {
  formData: PropTypes.shape({
    drName: PropTypes.string,
    clinicName: PropTypes.string,
    phoneNumber: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    additionalDetails: PropTypes.string,
    agreeToTerms: PropTypes.bool.isRequired,
    email: PropTypes.string,
    building: PropTypes.string,
    floor: PropTypes.string,
    apartment: PropTypes.string,
    deliveryOption: PropTypes.bool,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
};

function CheckoutForm({ formData, setFormData }) {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let message = '';

    if (!value && ['drName', 'clinicName', 'phoneNumber', 'address'].includes(name)) {
      message = 'This field is required';
    }

    if (name === 'phoneNumber' && value) {
      const phoneRegex = /^[0-9]{10,15}$/;
      if (!phoneRegex.test(value)) {
        message = 'Enter a valid phone number';
      }
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    validateField(name, fieldValue);
  };

  return (
    <div className="checkout-form-container">
      <h3 className="form-title">Shipping Information</h3>

      {/* Delivery Option Section */}
      <div className="delivery-option">
        <input
          type="checkbox"
          id="delivery"
          name="deliveryOption"
          checked={formData.deliveryOption}
          onChange={handleChange}
        />
        <label htmlFor="delivery">
          <img src={Truck} alt="Truck Icon" className="delivery-icon" />
          Delivery
        </label>
      </div>

      {/* Shipping Form */}
      <form className="shipping-form">
        <label>
          Dr Name *
          <input
            type="text"
            name="drName"
            value={formData.drName}
            onChange={handleChange}
            placeholder="Enter full name"
            required
          />
          {errors.drName && <span className="error-text">{errors.drName}</span>}
        </label>

        <label>
          Clinic Name *
          <input
            type="text"
            name="clinicName"
            value={formData.clinicName}
            onChange={handleChange}
            placeholder="Enter clinic name"
            required
          />
          {errors.clinicName && <span className="error-text">{errors.clinicName}</span>}
        </label>

        <label>
          Phone number *
          <div className="phone-input-container">
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="phone-input"
              placeholder="Enter phone number"
              required
            />
          </div>
          {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
        </label>

        <label>
          Address *
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter full address"
            required
          />
          {errors.address && <span className="error-text">{errors.address}</span>}
        </label>

        <div>
          <label className="city-label">
            City
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
            />
          </label>

          <label className="state-label">
            State
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state"
            />
          </label>
        </div>

        <label>
          Additional details
          <input
            name="additionalDetails"
            value={formData.additionalDetails}
            onChange={handleChange}
            placeholder="Enter your special requests"
          />
        </label>

        <div className="terms-checkbox">
          <input
            type="checkbox"
            id="terms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
          />
          <span>I have read and agree to the Terms and Conditions.</span>
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;
