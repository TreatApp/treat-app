import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { uploadImage } from './actions';
import { getBlobUrl } from '../../utils/helpers';

class CreateEvent extends Component {

   constructor(props) {
      super(props);

      this.state = this.makeInitialState(props);
   }

   makeInitialState(props) {
      return {
         slots: 0,
         price: 0
      };
   }

   render() {
      let { createEventState } = this.props;
      let { images, progress } = createEventState.toJS();

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
                  <input type="text" className="form-control" name="slots" placeholder="Seats" onChange={this.slotsChanged} />
               </div>
               <div className="form-group">
                  <input type="text" className="form-control" name="price" placeholder="Price" onChange={this.priceChanged} />
               </div>
               <div id="categories">
                  <label>Categories</label><br />
                  <div className="checkbox-inline">
                     <label>
                        <input type="checkbox" name="categories[][id]" value="{id}" /> {name}
                     </label>
                  </div>
               </div>
               <br />
               {this.renderPriceInformation()}
            </form>
            <br />
            {this.renderUploadControl(progress)}
            {images.map((image, index) => {
               let fileName = image.fileName;
               return (
                  <div className="img-thumbnail" key={'div' + index}>
                     <input type="hidden" name="eventImages[][fileName]" value={fileName} key={'input' + index} />
                     <img src={getBlobUrl(fileName)} style={{width: 100, height: 100}} key={'img' + index} />
                  </div>
               );
            })}
         </div>
      );
   }

   slotsChanged = ev => {
      this.setState({ slots: parseInt(ev.target.value) });
   };

   priceChanged = ev => {
      this.setState({ price: parseInt(ev.target.value) });
   };

   renderPriceInformation() {
      let cut = 15;
      let percentage = (100 - cut) / 100;
      let { slots, price } = this.state;
      let sum = slots * price * percentage;

      return sum > 0 ? <p className="text-center">After our deduction on 15% the total amount for this event if fully booked will be {sum} SEK.</p> : null;
   }

   renderUploadControl(progress) {
      return progress > 0 ? (
         <div className="progress progress-striped active">
            <div className="progress-bar progress-bar-info" style={{width: progress + '%'}}></div>
         </div>
      ) : (
         <form>
            <input type="file" onChange={this.uploadFile} style={{display: 'none'}} ref={o => this.fileInput = o} />
            <button onClick={this.selectFile} className="btn btn-default btn-block">Upload image</button>
         </form>
      );
   }

   selectFile = ev => {
      ev.preventDefault();
      ev.target.blur();
      this.fileInput.click();
   };

   uploadFile = ev => {
      ev.preventDefault();

      let fileName = ev.target.files[0];
      ev.target.form.reset();

      let { dispatch } = this.props;
      dispatch(uploadImage(fileName));
   };
}

CreateEvent.propTypes = {
   dispatch: PropTypes.func.isRequired,
   createEventState: PropTypes.object.isRequired
};

function propProvider(reduxState, props) {
   const {createEventState} = reduxState;

   return {
      createEventState
   };
}

export default connect(propProvider)(CreateEvent);