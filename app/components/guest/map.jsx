import React, { Component, PropTypes } from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import Immutable from 'immutable';

export default class Map extends Component {

   constructor(props) {
      super(props);

      this.state = this.makeInitialState(props);
   }

   makeInitialState(props) {
      return {
         markers: []
      };
   }

   handleMapClick = ev => {
      let { markers } = this.state;
      markers.push({
         position: ev.latLng,
         defaultAnimation: 2,
         key: Date.now()
      });
      this.setState({ markers: markers });
   };

   render() {
      return (
         <GoogleMapLoader
            containerElement={this.renderContainer()}
            googleMapElement={this.renderMap()}
         />
      );
   }

   renderContainer() {
      return <div {...this.props} className="map-root" />;
   }

   renderMap() {
      return <GoogleMap
         defaultZoom={12}
         defaultCenter={{ lat: 59.32932, lng: 18.06858 }}
         ref={(map) => (this._googleMapComponent = map)}
         onClick={this.handleMapClick}>
         {this.state.markers.map((marker) => {
            return <Marker {...marker} />;
         })}
      </GoogleMap>;
   }
}

Map.propTypes = {
};