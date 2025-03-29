import { useState, useEffect } from "react";
import downPointer from "../../assets/DownPointer.png";
import ReviewCard from "./ReviewCard";

export default function Reviews() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  // Helper to format the date as day/month/year
  const getFormattedDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // months are zero-indexed
    const year = currentDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Fetch all reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://joe-sbackend.fly.dev/reviews");
        if (response.ok) {
          const data = await response.json();
          setReviews(data.filter(item => item.confirm === true));
        } else {
          console.error("Error fetching reviews:", response.status);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal(false);
    // Build the review payload
    const reviewData = {
      name,
      review,
      rating: Number(rating),
      date: getFormattedDate(),
      confirm: false,
    };
    console.log(reviewData);

    try {
      const response = await fetch("https://joe-sbackend.fly.dev/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        // Optionally, you can update the reviews list immediately:
        const newReview = await response.json();
        setReviews((prevReviews) => [newReview, ...prevReviews]);
        // Reset form fields
        setName("");
        setReview("");
        setRating("");
        setShowModal(false);
      } else {
        console.error("Error submitting review");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="reviews-section">
      <div className="reviews-container">
        <div className="reviews-header">
          <p className="reviews-title">All Reviews</p>
          <span className="reviews-count">({445 + reviews.length})</span>
        </div>
        <div className="reviews-actions">
          <button className="latest-button">
            <span className="latest-icon">Latest </span>
            <img src={downPointer} alt="down pointer" />
          </button>
          <button
            className="write-review-button"
            onClick={() => setShowModal(true)}
          >
            Write a Review
          </button>
        </div>
      </div>

      {/* Modal pop-up for writing a review */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Write a Review</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="review">Review:</label>
                <textarea
                  id="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="rating">Rating:</label>
                <input
                  id="rating"
                  type="number"
                  step="0.1"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit">Submit Review</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="reviewcards-container">
        {reviews.slice(0, visibleCount).map((reviewItem, index) => {
          console.log(reviewItem);
          if (reviewItem.confirm == true) {
            return (
              <ReviewCard
                key={reviewItem._id || index}
                name={reviewItem.name}
                review={`"${reviewItem.review}"`}
                date={reviewItem.date}
                rating={reviewItem.rating}
              />
            )
          }
        }
        )}
      </div>

      {/* Load More Reviews Button */}
      {visibleCount < reviews.length && (
        <button
          className="load-more-button"
          onClick={() => setVisibleCount(visibleCount + 4)}
        >
          Load More Reviews
        </button>
      )}
    </div>
  );
}
