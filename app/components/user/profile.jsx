import React, { Component, PropTypes } from 'react';
import { getProfile } from './actions';

export default class Profile extends Component {

   constructor(props) {
      super(props);

      this.state = this.makeInitialState(props);
   }

   makeInitialState(props) {
      return {
      };
   }

   componentWillMount() {
      const {dispatch} = this.props;
      dispatch(getProfile());
   }

   render() {
      let { externalId, firstName, lastName, email, description, created } = this.props.profile;
      let imageUrl = 'https://graph.facebook.com/' + externalId + '/picture?type=normal';
      let fullName = firstName + ' ' + lastName;

      return (
         <div>
            <div className="text-center">
               <img src={imageUrl} className="img-circle" />
               <br /><br />
               <div id="user-rating"></div>
               <h3>{fullName}</h3>
               <p>{email}</p>
            </div>
            <hr />
            <p>{description}</p>
            <hr />
            <em className="small">Member since {created}</em>
         </div>
      );
   }
}

Profile.propTypes = {
   dispatch: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired
};