import moment from 'moment/min/moment-with-locales';

module.exports = {

   formatDate(date, format) {
      moment.locale('sv');
      return moment(date).format(format);
   },

   getImageUrl(externalId, type) {
      return 'https://graph.facebook.com/' + externalId + '/picture?type=' + type;
   },

   getBlobUrl(eventImages) {
      return (eventImages.length > 0) ? 'https://treat.blob.core.windows.net/events/' + eventImages[0].fileName : '';
   }
};