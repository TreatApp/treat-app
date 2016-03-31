import React, { Component, PropTypes } from 'react';
import EventLogItem from './event-log-item';

export default class EventLog extends Component {

   render() {
      let { eventLogs } = this.props;

      return (
         <div>
            {eventLogs.map(eventLog => {
               return <EventLogItem key={eventLog.id} eventLog={eventLog} />;
            })}
            <form onSubmit={this.onFormSubmit}>
               <div className="form-group">
                  <div className="input-group">
                     <input type="text" className="form-control" placeholder="Write message" ref={o => this.textInput = o} />
                     <span className="input-group-btn">
                        <button type="submit" className="btn btn-default">Send</button>
                     </span>
                  </div>
               </div>
            </form>
         </div>
      );
   }

   onFormSubmit = ev => {
      ev.preventDefault();
      this.props.onSaveEventLog({
         text: this.textInput.value
      });
   };
}

EventLog.propTypes = {
   eventLogs: PropTypes.array.isRequired,
   onSaveEventLog: PropTypes.func.isRequired
};