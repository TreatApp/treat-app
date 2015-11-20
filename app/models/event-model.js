module.exports = Chaplin.Model.extend({
    url: function() {
        return '/events/' + this.id;
    }
});