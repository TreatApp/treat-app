import React, { Component, PropTypes } from 'react';

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
      return (
         <a href="/event/{{id}}">
            <div className="panel panel-default">
               <div className="panel-body" style="background: url({{blob eventImages}}); background-size: 100%;">
                  <div className="row">
                     <div className="col-xs-6">
                        <img src="https://graph.facebook.com/{{user.externalId}}/picture?type=square" class="img-circle" />
                     </div>
                     <div className="col-xs-6 text-right">
                        <div className="label label-default">{{slotsAvailable}}/{{slots}} available</div>
                        <br /><br />
                        <span className="text-white">{{city}}</span>
                     </div>
                  </div>
               </div>
               <div className="panel-footer">
                  <div className="row">
                     <div className="col-xs-6">
                        <strong>{{title}}</strong><br />
                        <span className="text-muted">
                        {{categories}}
                        </span>
                     </div>
                     <div className="col-xs-6 text-right">
                        <strong>{{start}}</strong><br />
                        <span className="text-muted">{{price}} SEK</span>
                     </div>
                  </div>
               </div>
            </div>
         </a>
      );
   }
}

Event.propTypes = {
};