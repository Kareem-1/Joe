import joelogo from "../../assets/joelogo.png";
// Replace with your own payment icon imports or actual image paths
import visaIcon from "../../assets/visa.png";
import masterCardIcon from "../../assets/mastercard.png";
import FB from '../../assets/fb.png';
import IG from '../../assets/ig.png'
import NewsletterBanner from "./NewsLetterBanner";

export default function Footer() {
    return (
        <footer className="footer">
            <NewsletterBanner />
            <div className="footer-container">

                {/* Left Section: Logo + Description + Social Icons */}
                <div className="footer-left">
                    <img src={joelogo} alt="Company Logo" className="footer-logo" />
                    <p className="footer-description">
                        We provide innovative solutions for dental clinics, designed to enhance your practice.
                        Our silent cabinets ensure a noise-free and comfortable environment for both
                        patients and professionals.
                    </p>

                    <div className="footer-socials">
                        <a href="#facebook" aria-label="facebook">
                            <img src={FB} alt="Facebook" />
                        </a>
                        <a href="#instagram" aria-label="instagram">
                            <img src={IG} alt="Instagram" />
                        </a>
                    </div>
                </div>

                {/* Right Section: Multiple Columns */}
                <div className="footer-right">
                    <div className="footer-column">
                        <h4 className="footer-title">Company</h4>
                        <ul>
                            <li>About</li>
                            <li>Features</li>
                            <li>Works</li>
                            <li>Career</li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4 className="footer-title">Help</h4>
                        <ul>
                            <li>Customer Support</li>
                            <li>Delivery Details</li>
                            <li>Terms &amp; Conditions</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4 className="footer-title">FAQ</h4>
                        <ul>
                            <li>Account</li>
                            <li>Manage Deliveries</li>
                            <li>Orders</li>
                            <li>Payments</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="header-line"></div>
            {/* Footer Bottom: Payment Icons (or any other bottom content) */}
            <div className="footer-bottom">
                <img src={visaIcon} alt="Visa" />
                <img src={masterCardIcon} alt="MasterCard" />
            </div>
        </footer>
    );
}
