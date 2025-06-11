import { useEffect, useRef } from "react";
import useGoogleMaps from "../hooks/useGoogleMaps"; //this hook is unfortunately needed as react components faster than async GMaps script, since react google maps api is deprecated wrt Places new API 

export default function Map({ results, selectedPlace }) {
  const mapRef = useRef(null); //for map render
  const mapInstance = useRef(null); //store map
  const markersRef = useRef([]); //track markers
  const infoWindowRef = useRef(null); //track infowindow

  const mapsLoaded = useGoogleMaps();

  useEffect(() => { //initial mapload

    if (!mapsLoaded) return; //need to always wait for map api to retrieve map before allowing any other actions (non-react component)

    async function initMap() { //to initialize map
      const { Map } = await window.google.maps.importLibrary("maps"); //wait to retrieve map from google
      const center = { lat: 1.3521, lng: 103.8198 }; //center sg
      mapInstance.current = new Map(mapRef.current, { //load and init javascript map api
        center,
        zoom: 12,
        mapId: "DEMO_MAP_ID",
      });
    }

    initMap();
  }, [mapsLoaded]);

  useEffect(() => { //on placequery mark map

    if (!mapsLoaded || !results?.length) return;

    async function placeMarkers() {

      const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");
      const { LatLngBounds } = await window.google.maps.importLibrary("core"); //lib for bounds

      markersRef.current.forEach(marker => marker.map = null); //clear old markers
      markersRef.current = [];

      const bounds = new LatLngBounds();
      results.forEach((place) => {
        const marker = new AdvancedMarkerElement({
          map: mapInstance.current,
          position: place.location,
          title: place.displayName,
        });

        markersRef.current.push({ placeId: place.id, marker, place }); //store marker info

        bounds.extend(place.location); //include this marker in bound for display
      });

      mapInstance.current.fitBounds(bounds);
    }

    placeMarkers();
  }, [mapsLoaded, results]);

  useEffect(() => { //panzoom + infowindow on selectedplace
    if (mapsLoaded && selectedPlace && mapInstance.current) {
      mapInstance.current.panTo(selectedPlace.location); //pan to location if detailcard clicked
      mapInstance.current.setZoom(17); //zoom in after pan

      const { InfoWindow } = window.google.maps;

      const content = ` 
        <div style=max-width: 200px;">
          <strong>${selectedPlace.displayName}</strong><br/>
          ${selectedPlace.rating ? `⭐ ${selectedPlace.rating} (${selectedPlace.userRatingCount} reviews)` : ""}
        </div>
      `; //quickstyle html content for infowindow

      if (!infoWindowRef.current) {
        infoWindowRef.current = new InfoWindow(); //straight out of maps
      }

      const markerObj = markersRef.current.find(m => m.place.id === selectedPlace.id); //find marker to put infowindow for selected detailcard

      if (markerObj) {
        infoWindowRef.current.setContent(content);
        infoWindowRef.current.open({
          map: mapInstance.current,
          anchor: markerObj.marker,
        });
      }
    }
  }, [mapsLoaded, selectedPlace]);

  return <div
    ref={mapRef} //render map
    style={{
      height: "100vh",
      width: "100%"
    }} />;
}