export default function PlaceDetailCard({ place }) {
  const {
    displayName,
    formattedAddress,
    rating,
    userRatingCount,
    photos,
    types
  } = place; //copy over place data

  const mapAPIkey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  //helper to get gmaps photoUrl google photos api
  const getPhotoUrl = (photo) => {
    if (!photo) return null; //check if place have photo, returns photoref token if have (find a placeholder image instead to return if no photo (try to localise this image instead in a media/static file))
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photoReference}&key=${mapAPIkey}`;
  }; //photos currently restricted to get from Google Photos, consumes an api -> text search returns limited stuff, need to find a workaround?

  const photoUrl = photos?.[0] ? getPhotoUrl(photos[0]) : null;

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
      {photoUrl && (
        <img
          src={photoUrl}
          alt={displayName}
          style={{ width: "80px", height: "80px", borderRadius: "6px", objectFit: "cover" }} //fix image size 80x80, cropped
        />
      )}
      <div style={{ flex: 1 }}> {/* flex1 to occupy rem space beside image */}
        <h4 style={{ margin: "0 0 6px 0" }}>{displayName}</h4> {/* standard header */}
        <p style={{ margin: "4px 0", fontSize: "14px" }}> {/* standard para */}
          {formattedAddress || "Address not available"}
        </p>
        {rating && (
          <p style={{ margin: "4px 0", fontSize: "14px" }}>
            ⭐ {rating} ({userRatingCount} reviews)
          </p>
        )}
        {types && ( //make this a chip in future, filter unnecessary types like food, poi and estab (laze rn)
          <p style={{ fontSize: "12px", marginTop: "6px" }}>
            {types.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}