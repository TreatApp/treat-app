module.exports = Chaplin.Collection.extend({
    url: function() {
        return '/userRatings/' + this.eventId;
    }
});