import { useState } from "react";
import placeholderPlaceDetailImage from "../assets/Maps_PlaceDetail_Marketplace_Image.png"

export default function PlaceDetailCard({ place }) { //need placeid here and import places to use reviews and photos here?

  const [showReview, setShowReview] = useState(false)

  const {
    displayName,
    formattedAddress,
    rating, //this needs to be truncated if cost issue (enterprise lvl)
    userRatingCount, //this also needs to be truncated if cost issue (enterprise lvl)
    photos, 
    types,
    reviews,//this also needs to be truncated if cost issue (enterprise lvl)
  } = place; //copy over place data

  const photoURI = photos?.[0] ? place.photos[0].getURI({ maxHeight: 400 }) : placeholderPlaceDetailImage; //called per result, use placeholder only to reduce cost

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "10px",
        display: "flex",
        gap: "12px"
      }}
    >
      {photoURI && (
        <img
          src={photoURI}
          alt={displayName}
          loading="lazy" //load image only when it enters viewport
          style={{ width: "80px", height: "80px", borderRadius: "6px", objectFit: "cover" }} //fix image size 80x80, cropped
        />
      )}
      <div style={{ flex: 1 }}> {/* flex1 to occupy rem space beside image */}
        <h4 style={{ margin: "0 0 6px 0", fontWeight: 'bold' }}>{displayName}</h4> {/* standard header */}
        <p style={{ margin: "4px 0", fontSize: "14px" }}> {/* standard para */}
          {formattedAddress || "Address not available"}
        </p>
        {rating && ( //make reviews clickable which pops out a buncha reviews
          <p style={{ margin: "4px 0", fontSize: "14px" }}>
            ⭐ {rating} {' '}
            <span onClick={() => { setShowReview(!showReview) }} style={{ color: 'blue', cursor: 'pointer' }}>
              ({userRatingCount} reviews)
            </span>

          </p>
        )}

        {showReview && reviews?.length > 0 && ( //need to make this fetch only on click, rather than prefetching for all results for cost management
          <div style={{
            fontSize: "12px",
            scrollMarginTop: "6px",
            border: "1px solid",
            borderRadius: "4px",
            padding: "4px",
            maxHeight: "100px",
            overflowY: "auto"
          }}>
            {reviews.map((review, idx) => (
              <div key={idx} style={{ marginBottom: "8px" }}>
                <p> {review.authorAttribution.displayName} - {review.rating}⭐ </p>
                <p> {review.text} </p>
              </div>
            ))}
          </div>
        )}

        {types && (
          <p style={{ fontSize: "12px", marginTop: "6px" }}>
            {types.filter(type => !["food", "establishment", "point_of_interest"].includes(type))
              .map(type => type.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())) // '/smth/g' matches all corresponding globally
              .join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}