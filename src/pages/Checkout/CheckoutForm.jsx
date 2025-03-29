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
  // Handle changes in any input/checkbox
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
          // Changed from hard-coded true to a controlled value from state
          checked={formData.deliveryOption}
          onChange={handleChange}
          required
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
            required
            placeholder="Enter full name"
          />
        </label>

        <label>
          Clinic Name *
          <input
            type="text"
            name="clinicName"
            value={formData.clinicName}
            onChange={handleChange}
            required
            placeholder="Enter clinic name"
          />
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
        </label>

        <label>
          Address *
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Enter full address"
          />
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
            placeholder="enter your special requests"
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
