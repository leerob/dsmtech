import {Component} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

import Logo from './Card/Logo';
import {COMPANIES} from '../companies';

const formatName = (name) => name.replace('_', ' ');

const formatFilePath = (name) => name.replace(' ', '_').toLowerCase();

const createMarker = (company) => (
    <Marker key={company.name} latitude={company.lat} longitude={company.lng}>
        <Logo alt={formatName(company.name)} src={`/static/logos/${formatFilePath(company.name)}.jpg`} />
    </Marker>
);

class Map extends Component {
    state = {
        viewport: {
            width: '100vw',
            height: '100vh',
            latitude: 41.5868,
            longitude: -93.625,
            zoom: 13
        }
    };

    render() {
        return (
            <ReactMapGL
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxApiAccessToken="pk.eyJ1IjoibHJvYmluc29uIiwiYSI6ImNqcGtrdngwazA0ajIzeG41MHA3eGdvaXQifQ.ZXGWvgIxejlIWqFTPkDzuQ"
                {...this.state.viewport}
                onViewportChange={(viewport) => this.setState({viewport})}
            >
                {COMPANIES.map((company) => createMarker(company))}
            </ReactMapGL>
        );
    }
}

export default Map;
