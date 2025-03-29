import { useState } from "react";
import Mail from "../../assets/mail.png";

export default function NewsletterBanner() {
  const [number, setNumber] = useState("");

  const handleSubscribe = async () => {
    try {
      const response = await fetch("https://joe-sbackend.fly.dev/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number }),
      });

      if (response.ok) {
        // Reset the input or show success message
        setNumber("");
        console.log("Successfully subscribed!");
      } else {
        console.error("Failed to subscribe.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="newsletter-banner">
      <div className="newsletter-content">
        <h2 className="newsletter-title">
          STAY UP TO DATE ABOUT <br /> OUR LATEST OFFERS
        </h2>

        <div className="newsletter-input-wrapper">
          <div className="newsletter-input-box">
            <img src={Mail} alt="Mail" className="newsletter-icon" />
            <input
              type="text"
              placeholder="Enter your number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>

          <button className="newsletter-button" onClick={handleSubscribe}>
            Subscribe to OurNews
          </button>
        </div>
      </div>
    </div>
  );
}
