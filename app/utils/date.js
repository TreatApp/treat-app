import moment from 'moment/min/moment-with-locales';

module.exports = {

   format(date, format) {
      moment.locale('sv');
      return moment(date).format(format);
   }

};
