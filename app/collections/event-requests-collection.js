module.exports = Chaplin.Collection.extend({
    url: function() {
        return '/eventRequests/' + this.eventId;
    }
});