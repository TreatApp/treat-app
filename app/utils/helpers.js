import moment from 'moment/min/moment-with-locales';

module.exports = {

   formatDate(date, format) {
      moment.locale('sv');
      return moment(date).format(format);
   },

   getImageUrl(externalId, type) {
      return 'https://graph.facebook.com/' + externalId + '/picture?type=' + type;
   },

   getBlobUrl(data) {
      let fileName = (Array.isArray(data) && data.length > 0) ? data[0].fileName : data;
      return (fileName.length > 0) ? 'https://treat.blob.core.windows.net/events/' + fileName : '';
   }
};