module.exports = {

   image(externalId) {
      return 'https://graph.facebook.com/' + externalId + '/picture?type=square';
   },

   blob(eventImages) {
      if(eventImages.length > 0) {
         return 'https://treat.blob.core.windows.net/events/' + eventImages[0].fileName;
      }
      return '';
   }
};
