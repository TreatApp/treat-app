module.exports = Chaplin.Model.extend({
    url: function() {
        return this.id ? '/user/' + this.id : '/user';
    }
});