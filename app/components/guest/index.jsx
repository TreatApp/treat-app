import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Map from './map';
import List from './list';

class Guest extends Component {

   constructor(props) {
      super(props);

      this.state = this.makeInitialState(props);
   }

   makeInitialState(props) {
      return {
         viewMode: Guest.viewMode.list
      };
   }

   render() {
      const showMap = this.state.viewMode === Guest.viewMode.map;
      const listClass = showMap ? 'btn btn-default' : 'btn btn-primary';
      const mapClass = showMap ? 'btn btn-primary' : 'btn btn-default';

      return (
         <div>
            <div className="btn-group">
               <button type="button" className={listClass} onClick={this.showList}>List</button>
               <button type="button" className={mapClass} onClick={this.showMap}>Map</button>
            </div>
            {showMap ? <Map /> : <List />}
         </div>
      );
   }

   showList = ev => {
      this.setState({ viewMode: Guest.viewMode.list });
      ev.target.blur();
   };

   showMap = ev => {
      this.setState({ viewMode: Guest.viewMode.map });
      ev.target.blur();
   };
}

Guest.viewMode = { list: 0, map: 1 };

Guest.propTypes = {
   dispatch: PropTypes.func.isRequired,
   appState: PropTypes.object.isRequired
};

function propProvider(reduxState, props) {
   const {appState} = reduxState;

   return {
      appState
   };
}

export default connect(propProvider)(Guest);