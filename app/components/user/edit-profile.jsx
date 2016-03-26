import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getProfile } from './actions';
import { getImageUrl, formatDate } from '../../utils/helpers';
import Rating from '../rating';

class EditProfile extends Component {

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
      let { externalId, firstName, lastName, email, description, created, rating } = this.props.profile;
      let imageUrl = getImageUrl(externalId, 'normal');
      let fullName = firstName + ' ' + lastName;
      let date = formatDate(created, 'lll');

      return (
         <div>
            <div className="text-center">
               <img src={imageUrl} className="img-circle" />
               <br /><br />
               <Rating rating={rating || 0} /><br />
               <h3>{fullName}</h3>
               <p>{email}</p>
            </div>
            <hr />
            <p>{description}</p>
            <hr />
            <em className="small">Member since {date}</em>
         </div>
      );
   }
}

EditProfile.propTypes = {
   dispatch: PropTypes.func.isRequired,
   userState: PropTypes.object.isRequired
};

function propProvider(reduxState, props) {
   const {userState} = reduxState;

   return {
      userState
   };
}

export default connect(propProvider)(EditProfile);