module.exports = Chaplin.Model.extend({
    url: function() {
        return '/users/' + this.id;
    }
});