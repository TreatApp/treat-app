module.exports = Chaplin.Collection.extend({
    url: function() {
        return '/eventLog/' + this.id;
    }
});