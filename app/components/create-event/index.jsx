import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getBlobUrl, getImageUrl, formatDate } from '../../utils/helpers';
import Rating from '../rating';

class CreateEvent extends Component {

   constructor(props) {
      super(props);

      this.state = this.makeInitialState(props);
   }

   makeInitialState(props) {
      return {
      };
   }

   selectFile = ev => {
      ev.preventDefault();
      this.fileInput.click();
      ev.target.blur();
   };

   render() {
      let { eventsState } = this.props;

      return (
         <div>
            <h3 className="text-center">Invite to dinner</h3>
            <form>
               <div className="form-group">
                  <input type="text" className="form-control" name="title" placeholder="Title" />
               </div>
               <div className="form-group">
                  <textarea name="description" className="form-control" rows="4" placeholder="Description"></textarea>
               </div>
               <div className="form-group">
                  <input type="text" className="form-control" name="location[address]" placeholder="Address" />
               </div>
               <div className="form-group">
                  <input type="text" className="form-control" name="location[city]" placeholder="City" />
               </div>
               <div className="form-group">
                  <input type="text" className="form-control" name="start" placeholder="Start date/time" />
               </div>
               <div className="form-group">
                  <input type="text" className="form-control" name="end" placeholder="End date/time" />
               </div>
               <div className="form-group">
                  <input type="text" className="form-control" name="slots" placeholder="Seats" />
               </div>
               <div className="form-group">
                  <input type="text" className="form-control" name="price" placeholder="Price" />
               </div>
               <div id="categories">
                  <label>Categories</label>
                  <div className="checkbox-inline">
                     <label>
                        <input type="checkbox" name="categories[][id]" value="{id}" /> {name}
                     </label>
                  </div>
               </div>
               <br />
               <p className="js-price-info"></p>
            </form>
            <hr /><br />
            <form>
               <button onClick={this.selectFile} className="btn btn-default btn-block">Upload image</button>
               <input type="file" onChange={this.uploadFile} style={{display: 'none'}} ref={o => this.fileInput = o} />
               <div className="progress progress-striped active hide">
                  <div className="progress-bar progress-bar-info" style={{width: '0%'}}></div>
               </div>
               <div id="image-container"></div>
            </form>
         </div>
      );
   }
}

CreateEvent.propTypes = {
   dispatch: PropTypes.func.isRequired,
   appState: PropTypes.object.isRequired,
   eventsState: PropTypes.object.isRequired,
   userEventsState: PropTypes.object.isRequired
};

function propProvider(reduxState, props) {
   const {appState, eventsState, userEventsState} = reduxState;

   return {
      appState,
      eventsState,
      userEventsState
   };
}

export default connect(propProvider)(CreateEvent);