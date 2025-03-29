import star from "../../assets/Star.png";
import halfStar from "../../assets/HalfStar.png";

export default function ReviewCard({ 
  name, 
  review, 
  date, 
  rating // number, e.g. 4.5
}) {
  // A small helper function to generate star images based on rating
  const renderStars = (ratingValue) => {
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue % 1 !== 0;
    const starsArray = [];

    // Push full stars
    for (let i = 0; i < fullStars; i++) {
      starsArray.push(
        <img 
          key={`star-${i}`} 
          src={star} 
          alt="Star" 
          className="star-icon" 
        />
      );
    }

    // Push half star if rating has a decimal
    if (hasHalfStar) {
      starsArray.push(
        <img 
          key="half-star" 
          src={halfStar} 
          alt="Half Star" 
          className="half-star-icon" 
        />
      );
    }

    return starsArray;
  };

  return (
    <div className="reviewcard-container">
      {/* Star Rating */}
      <div className="reviewcard-rating">
        {renderStars(rating)}
      </div>

      {/* Name and Review Text */}
      <div className="reviewcard-content">
        <h3 className="reviewcard-name">{name}</h3>
        <p className="reviewcard-text">{review}</p>
      </div>

      {/* Footer (date, etc.) */}
      <div className="reviewcard-footer">
        <span className="reviewcard-date">Posted on {date}</span>
      </div>
    </div>
  );
}
