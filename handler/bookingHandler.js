const axios = require('axios');
const moment = require('moment')
const BookingRequestBuilder = require('../class/BookingRequestBuilder')
const users = require('../users/users')
const boxen = require("boxen");

const SLOTS_URL = `https://smcb.vertical-life.info/api/v1/gyms/264/checkins/public-slots/at/54/date/`
const SLOTS_RULE_URL = 'https://smcb.vertical-life.info/api/v1/gyms/264/checkins/public-slots/rule-for-date/'
const BOOK_URL = `https://smcb.vertical-life.info/api/v1/gyms/264/checkins/book`;

const bookingHandler = async function (argv){
    const date = argv.date;
    const time = argv.time
    const uKeys = argv.users;

    const slots_rule = await axios.get(SLOTS_RULE_URL.concat(date))
    const id_slot_rule = slots_rule.data.slot_rule.id;

    const slotsResponse = await axios
        .get(SLOTS_URL.concat(date))
        .then(res => res.data.slots)
        .catch(err => console.error(err))

    const slotDateTime = moment(date.concat(time), 'YYYY/MM/DDhh:mm').format("YYYY-MM-DDTHH:mm:ss.SSS")

    const mappedSlots = slotsResponse
        .filter(pSlot => pSlot.free_spots > 0 )
        .map(slot => {
        const mappedSlot = {
            id: slot.slot.id,
            checkIn: moment(slot.slot.check_in_at).format('HH:mm'),
            freeSpots: slot.free_spots,
        }
        return mappedSlot;
    })

    const slotRequested = mappedSlots.filter(slot => slot.checkIn === time)[0];
    console.log(`Slot date requested: ${slotDateTime} with freespot: ${slotRequested}, id-slot-rule: ${id_slot_rule}`)
    if(slotRequested){
        for(uKey of uKeys){
            const user = users.index[uKey];
            const bookingRequest = new BookingRequestBuilder()
                .withUser(user)
                .withSlotRuleId(id_slot_rule)
                .withCheckInAt(slotDateTime.concat("+02:00"))
                .build();

            const bookResponse = await axios.post(BOOK_URL, bookingRequest)
                .then(response => response.data)
                .catch(err => {
                    argv.err = err.data
                    printMessage(argv, true)
                })
        }
        printMessage(argv, false)
        return;
    }
    argv.err = "No slots found";
    printMessage(argv, true)
    return;
}

function printMessage(argv, err){
    const succTpl = `Prenotazione effettuata per ${argv.users} il ${moment(argv.date, "YYYY/MM/DD").format("DD-MM")} alle ${argv.time}, buona arrampicata`;
    const errTpl = `Qualcosa è andato storto: ${argv.err}`;

    const message = err ? errTpl : succTpl;

    const boxenOptions = {
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: err ? "red": "green",
        backgroundColor: "#555555"
    };
    const msgBox = boxen( message, boxenOptions );

    console.log(msgBox);
}

module.exports = {
    bookHandler: bookingHandler
}