import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getProfile } from './actions';
import { getImageUrl, formatDate } from '../../utils/helpers';
import Rating from '../rating';

class Profile extends Component {

   constructor(props) {
      super(props);

      this.state = this.makeInitialState(props);
   }

   makeInitialState(props) {
      return {
         userId: props.params.id
      };
   }

   componentWillMount() {
      const {dispatch} = this.props;
      dispatch(getProfile(this.state.userId));
   }

   render() {
      let { userState } = this.props;
      let { profile } = userState.toJS();
      let { externalId, firstName, lastName, email, description, created, rating } = profile;
      let imageUrl = getImageUrl(externalId, 'normal');
      let fullName = firstName + ' ' + lastName;
      let date = formatDate(created, 'lll');

      return (
         <div className="container">
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

Profile.propTypes = {
   dispatch: PropTypes.func.isRequired,
   userState: PropTypes.object.isRequired
};

function propProvider(reduxState, props) {
   const {userState} = reduxState;

   return {
      userState
   };
}

export default connect(propProvider)(Profile);
