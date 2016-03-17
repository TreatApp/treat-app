import React, { Component, PropTypes } from 'react';

export default class Rating extends Component {

   constructor(props) {
      super(props);

      this.state = this.makeInitialState(props);
   }

   makeInitialState(props) {
      return {
         rating: props.rating
      };
   }

   render() {
      return this.props.onSelected ? this.renderEdit() : this.renderReadOnly();
   }

   renderEdit() {
      return (
         <span>
             <a href="#" onMouseOver={e => this.mouseOver(1)} onMouseOut={this.mouseOut} onClick={e => this.click(1, e)}><i className={this.getClassName(1)}></i></a>
             <a href="#" onMouseOver={e => this.mouseOver(2)} onMouseOut={this.mouseOut} onClick={e => this.click(2, e)}><i className={this.getClassName(2)}></i></a>
             <a href="#" onMouseOver={e => this.mouseOver(3)} onMouseOut={this.mouseOut} onClick={e => this.click(3, e)}><i className={this.getClassName(3)}></i></a>
             <a href="#" onMouseOver={e => this.mouseOver(4)} onMouseOut={this.mouseOut} onClick={e => this.click(4, e)}><i className={this.getClassName(4)}></i></a>
             <a href="#" onMouseOver={e => this.mouseOver(5)} onMouseOut={this.mouseOut} onClick={e => this.click(5, e)}><i className={this.getClassName(5)}></i></a>
         </span>
      );
   }

   renderReadOnly() {
      return (
         <span>
             <span><i className={this.getClassName(1)}></i></span>
             <span><i className={this.getClassName(2)}></i></span>
             <span><i className={this.getClassName(3)}></i></span>
             <span><i className={this.getClassName(4)}></i></span>
             <span><i className={this.getClassName(5)}></i></span>
         </span>
      );
   }

   getClassName(star) {
      return star <= this.state.rating ? 'fa fa-lg fa-star rating-filled' : 'fa fa-lg fa-star rating-empty';
   }

   mouseOver(rating) {
      this.setState({ rating });
   }

   mouseOut = e =>  {
      this.setState({ rating: this.props.rating });
   };

   click(rating, e) {
      e.preventDefault();
      this.props.onSelected(rating);
   }
}

Rating.propTypes = {
   rating: PropTypes.number.isRequired
};