import { useState } from "react";
import PlaceSearchBar from "../components/PlaceSearchBar";
import FoodList from "../components/FoodList";
import Map from "../components/Map";
import NavigationBar from "../components/NavBar";
import PopUpFilter from "../components/PopUpFilter";
import FoodMapFilter from "../components/FoodMapFilter";

export default function FindFood() {
  const [results, setResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [filters, setFilters] = useState({});
  const [filterPopUp, setFilterPopUp] = useState(false);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setFilterPopUp(false);
  };

  return (
    <>
      <NavigationBar />

      <div style={{ display: "flex", height: "90%" }}> {/*offset for navbar*/}
        <div style={{ width: "25%", display: "flex", flexDirection: "column" }}>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px"}}>
            <PlaceSearchBar
              onResults={setResults}
              filters={filters}
            />

            <button
              onClick={() => setFilterPopUp(true)}
              title="Filter Places"
              style={{
                padding: "6px", 
                alignItems: "center",
                border: "none",
                width: "10%",
                backgroundColor: "white",
                cursor: 'pointer'
              }}>
              ☰
            </button>
          </div>

          {filterPopUp && (
            <PopUpFilter onClose={() => setFilterPopUp(false)}>
              <FoodMapFilter
                onFilter={handleFilterChange}
                initialFilters={filters} />
            </PopUpFilter>
          )}

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