const BookingRequest = require('../class/BookingRequest')
class BookingRequestBuilder{
    constructor() {
        this.slot_area_id = 54;
    }

    withCheckInAt(check_in_at){
        this.check_in_at = check_in_at;
        return this;
    }

    withSlotRuleId(slot_rule_id){
        this.slot_rule_id = slot_rule_id;
        return this;
    }

    withUser(user) {
        this.booking = {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            age: null,
            date_of_birth: null,
            participants: [
                {
                    address: null,
                    age: null,
                    city: null,
                    country: null,
                    date_of_birth: user.date_of_birth,
                    email: user.email,
                    extra_fields: {},
                    filename: null,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    member: false,
                    phone: user.phone,
                    photo: null,
                    zip: null
                }
            ],
            selected_tickets:  null,
            ip: "93.42.69.116",
            ticket_required: false,
            skip_payment: false,
        };
        return this;
    }
    /**
     * Wrap our user into a finished bookingRequest
     * @returns {BookingRequest}
     */
    build() {
        return new BookingRequest(this.slot_rule_id, this.slot_area_id, this.check_in_at, this.booking);
    }
}

module.exports = BookingRequestBuilder