import * as React from 'react';

// @ts-ignore
import DeckGL, {GeoJsonLayer, ArcLayer} from 'deck.gl';
// @ts-ignore
import {StaticMap} from 'react-map-gl';

import './Map.css';

// Set your mapbox access token here
const MAPBOX_TOKEN = 'pk.eyJ1IjoiYm9iYnktbGF0ZWxlYW4iLCJhIjoiY2ticnFqbWh6MjE5djJ5cG80Y29raGljZyJ9.V4TEhPk8-75-MSXMR5K5zg';

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
    'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

// Viewport settings
const INITIAL_VIEW_STATE = {
    latitude: 51.47,
    longitude: 0.45,
    zoom: 4,
    bearing: 0,
    pitch: 30
};

const Map = () => {
    const _onClick = (info: any) => {
        if (info.object) {
            // eslint-disable-next-line
            alert(`${info.object.properties.name} (${info.object.properties.abbrev})`);
        }
    };

    const layers = [
        new GeoJsonLayer({
            id: 'airports',
            data: AIR_PORTS,
            // Styles
            filled: true,
            pointRadiusMinPixels: 2,
            pointRadiusScale: 2000,
            getRadius: (f: any) => 11 - f.properties.scalerank,
            getFillColor: [200, 0, 80, 180],
            // Interactive props
            pickable: true,
            autoHighlight: true,
            onClick: _onClick
        }),
        new ArcLayer({
            id: 'arcs',
            data: AIR_PORTS,
            dataTransform: (d: any) => d.features.filter((f: any) => f.properties.scalerank < 4),
            // Styles
            getSourcePosition: (f: any) => [-0.4531566, 51.4709959], // London
            getTargetPosition: (f: any) => f.geometry.coordinates,
            getSourceColor: [0, 128, 200],
            getTargetColor: [200, 0, 80],
            getWidth: 1
        })
    ];

    return (
        <div className="map-root">
            <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers}>
                <StaticMap mapboxApiAccessToken={MAPBOX_TOKEN} mapStyle="mapbox://styles/mapbox/light-v9" />
            </DeckGL>
        </div>
    );
};

export default Map;