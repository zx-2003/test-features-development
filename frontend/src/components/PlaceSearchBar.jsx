import { useState } from "react";

export default function PlaceSearchBar({ onResults }) {

  const [queryText, setQueryText] = useState("")

  const handleSearch = async (e) => {
    e.preventDefault();

    const { Place } = await window.google.maps.importLibrary("places");

    const request = { //make this dynamic, enable filter to change specific items in query here (more for recommendations)
        textQuery: queryText,
        fields: [ //fields wanted from the request (will have to change this to fit costs)
          "displayName", 
          "location",
          "formattedAddress",
          "rating",
          "userRatingCount", //num user reviews
          "photos", //to decide on cost management
          "types",
          "reviews", //add reviews, to decide on cost management
        ],
        //includedType: "restaurant", this is limited to 1 type (typeA) only. easier to just not have this (let them search bicycles), filter typeB food returned results instead 
        //locationBias: { lat: 1.3521, lng: 103.8198 },
        //isOpenNow: true, //should probably include this as well so it restricts to currently avail restaurants?
        language: "en-UK",
        minRating: 0.5, //this is to filter out duds, but still include bad restaurants
        maxResultCount: 8, //can increase this for deployment, max 20 (but each consumes an API)
        region: "sg",
        useStrictTypeFiltering: false,
      };

    try {
      const { places } = await Place.searchByText(request); 
      onResults(places);
    } catch (err) {
      console.error("Failed to get places", err);
      onResults([]);
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Find Places..."
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "70%",
            border: '1px solid',
            borderRadius: '8px'
          }}
        />
        <button
          type="submit"
          style={{
            marginTop: "10px",
            padding: "10px",
            width: "20%",
            borderRadius: '8px',
            cursor: 'pointer' //changed to finger on hover
          }}>
          Search
        </button>
      </form>
    </div>
  );
}