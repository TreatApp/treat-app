module.exports = Chaplin.Collection.extend({
    url: function() {
        return '/eventRatings/' + this.eventId;
    }
});