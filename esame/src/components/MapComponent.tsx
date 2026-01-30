import React, { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function LocationMap() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | null>(null);
    
    // Coordinate Pasquali
    const coords: [number, number] = [11.230319219351848,46.069647611880896,]; 

    useEffect(() => {
        if (map.current || !mapContainer.current) return; 

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            // URL dello stile "Bright" (simile a Google Maps) di OpenFreeMap
            // Mostra strade, edifici, parchi e nomi
            style: 'https://tiles.openfreemap.org/styles/bright', 
            center: coords,
            zoom: 17, // Zoom aumentato per vedere bene gli edifici
            bearing: 0 // Rotazione (0 = Nord in alto)
        });

        // Marker color Magenta
        new maplibregl.Marker({ color: "#E6007E" })
            .setLngLat(coords)
            .setPopup(new maplibregl.Popup().setHTML("<b>Grafica Pasquali</b><br>Viale dell’Industria, 9"))
            .addTo(map.current);

        map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    }, []);

    return (
        <div className="map-wrap">
            <div ref={mapContainer} style={{ width: '100%', height: '400px', borderRadius: '8px' }} />
        </div>
    );
}