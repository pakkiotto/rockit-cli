class BookingRequest {
    /**
     * @param {number} slot_rule_id
     * @param {?string} slot_area_id
     * @param {string} check_in_at
     * @param {object} booking
     */
    constructor(slot_rule_id, slot_area_id, check_in_at, booking) {
        this.slot_rule_id = slot_rule_id;
        this.slot_area_id = slot_area_id || 54;
        this.check_in_at = check_in_at;
        this.locale = 'it';
        this.redirect_url_base = 'https://gyms.vertical-life.info/rock-it/booking';
        this.return_url = "https://gyms.vertical-life.info/rock-it/checkins#/54/2022-03-02/10:30/1"
        this.booking = booking
    }
}
module.exports = BookingRequest