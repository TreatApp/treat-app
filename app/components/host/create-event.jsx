import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getCategories, uploadImage, addEvent } from './actions';
import { getBlobUrl } from '../../utils/helpers';

class CreateEvent extends Component {

   constructor(props) {
      super(props);

      this.state = this.makeInitialState(props);
   }

   makeInitialState(props) {
      return {
         slots: 0,
         price: 0,
         categories: []
      };
   }

   componentWillMount() {
      let { dispatch } = this.props;
      dispatch(getCategories());
   }

   render() {
      let { createEventState } = this.props;
      let { categories, images, progress } = createEventState.toJS();

      return (
         <div>
            <h3 className="text-center">Invite to dinner</h3>
            <form>
               <div className="form-group">
                  <input type="text" className="form-control" placeholder="Title" ref={o => this._title = o} />
               </div>
               <div className="form-group">
                  <textarea className="form-control" rows="4" placeholder="Description" ref={o => this._description = o}></textarea>
               </div>
               <div className="form-group">
                  <input type="text" className="form-control" placeholder="Address" ref={o => this._address = o} />
               </div>
               <div className="form-group">
                  <input type="text" className="form-control" placeholder="City" ref={o => this._city = o} />
               </div>
               <div className="form-group">
                  <input type="text" className="form-control" placeholder="Start date/time" ref={o => this._start = o} />
               </div>
               <div className="form-group">
                  <input type="text" className="form-control" placeholder="End date/time" ref={o => this._end = o} />
               </div>
               <div className="form-group">
                  <input type="text" className="form-control" placeholder="Seats" onChange={this.slotsChanged} />
               </div>
               <div className="form-group">
                  <input type="text" className="form-control" placeholder="Price" onChange={this.priceChanged} />
               </div>
               <div id="categories">
                  <label>Categories</label><br />
                  {categories.map(category => {
                     return (
                        <div className="checkbox-inline" key={category.id}>
                           <label>
                              <input type="checkbox" value={category.id} onClick={this.categoryChanged} /> {category.name}
                           </label>
                        </div>
                     );
                  })}
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
                     <img src={getBlobUrl(fileName)} style={{width: 100, height: 100}} />
                  </div>
               );
            })}
            <button type="button" className="btn btn-block btn-primary" onClick={this.createEvent}>Create event</button>
         </div>
      );
   }

   slotsChanged = ev => {
      this.setState({ slots: parseInt(ev.target.value) });
   };

   priceChanged = ev => {
      this.setState({ price: parseInt(ev.target.value) });
   };

   categoryChanged = ev => {
      let categories = this.state.categories;
      let value = { id: ev.target.value };
      if(ev.target.checked) {
         categories.push(value);
      }
      else {
         let index = categories.indexOf(value);
         categories.splice(index, 1);
      }
      this.setState({ categories: categories });
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

   createEvent = ev => {
      let { slots, price, categories } = this.state;
      let { dispatch, createEventState } = this.props;
      let { images } = createEventState.toJS();

      var event = {
         title: this._title.value,
         description: this._description.value,
         location: {
            address: this._address.value,
            city: this._city.value
         },
         start: this._start.value,
         end: this._end.value,
         slots: slots,
         price: price,
         categories: categories,
         eventImages: images
      };
      dispatch(addEvent(event));
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