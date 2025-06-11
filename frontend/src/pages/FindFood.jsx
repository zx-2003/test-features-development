import { useState } from "react";
import PlaceSearchBar from "../components/PlaceSearchBar";
import FoodList from "../components/FoodList";
import Map from "../components/Map";
import NavigationBar from "../components/NavBar";

export default function FindFood() {
  const [results, setResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  return ( 
    <>
      <NavigationBar />

      <div style={{ display: "flex", height: "calc(100vh - 56px)" }}> {/*offset for navbar*/}
        <div style={{ width: "25%", display: "flex", flexDirection: "column" }}>

          <div style={{ flex: "0 0 auto" }}>
            <PlaceSearchBar
              onResults={setResults}
            />
          </div>

          <div style={{ flex: "1 1 auto", overflow: "hidden" }}>
            <FoodList
              results={results}
              onCardClick={setSelectedPlace}
              selectedPlace={selectedPlace}
            />
          </div>
        </div>

        <div style={{ width: "75%" }}>
          <Map
            results={results}
            selectedPlace={selectedPlace}
          />
        </div>
      </div>
    </>
  );
}