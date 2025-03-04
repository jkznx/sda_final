module.exports = {
    // or beforeUpdate(event) {
    beforeCreate(event) {
        const {data} = event.params;
        // dateField is your datefield
        data.Date = new Date();
    }
}