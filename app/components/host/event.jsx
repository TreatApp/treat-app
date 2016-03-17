import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import { blob, imageSmall } from '../../utils/url';
import { format } from '../../utils/date';

export default class Event extends Component {

   constructor(props) {
      super(props);

      this.state = this.makeInitialState(props);
   }

   makeInitialState(props) {
      return {
      };
   }

   render() {
      let { id, user, slotsAvailable, slots, location, title, categories, start, price, eventImages } = this.props.event;
      let { externalId } = user;
      let { city } = location;

      let linkUrl = '/event/' + id;
      let imageUrl = imageSmall(externalId);
      let backgroundUrl = 'url(' + blob(eventImages) + ')';
      let date = format(start, 'lll');

      return (
         <Link to={linkUrl}>
            <div className="panel panel-default">
               <div className="panel-body" style={{background: backgroundUrl, backgroundSize: '100%'}}>
                  <div className="row">
                     <div className="col-xs-6">
                        <img src={imageUrl} className="img-circle" />
                     </div>
                     <div className="col-xs-6 text-right">
                        <div className="label label-default">{slotsAvailable}/{slots} available</div>
                        <br /><br />
                        <span className="text-white">{city}</span>
                     </div>
                  </div>
               </div>
               <div className="panel-footer">
                  <div className="row">
                     <div className="col-xs-6">
                        <strong>{title}</strong><br />
                        <span className="text-muted">
                           {categories.map(category => {
                              return <span key={category.id}>{category.name}</span>;
                           })}
                        </span>
                     </div>
                     <div className="col-xs-6 text-right">
                        <strong>{date}</strong><br />
                        <span className="text-muted">{price} SEK</span>
                     </div>
                  </div>
               </div>
            </div>
         </Link>
      );
   }
}

Event.propTypes = {
   event: PropTypes.object.isRequired
};