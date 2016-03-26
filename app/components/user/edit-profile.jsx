import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getProfile, saveProfile } from './actions';

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

   saveProfile() {
      const {dispatch} = this.props;
      dispatch(saveProfile());
   }

   render() {
      let { userState } = this.props;
      let { profile } = userState.toJS();
      let { externalId, firstName, lastName, email, description, created, rating } = profile;

      return (
         <div>
            <h3>{firstName} {lastName}</h3>
            <form onSubmit={this.saveProfile}>
               <div className="form-group">
                  <input type="email" name="email" className="form-control" value={email} placeholder="E-mail" />
               </div>
               <div className="form-group">
                  <textarea name="description" className="form-control" rows="4" placeholder="Description" value={description}></textarea>
               </div>
            </form>
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