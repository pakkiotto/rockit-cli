const axios = require('axios');
const moment = require('moment')
const boxen = require("boxen");

const slots_url = `https://smcb.vertical-life.info/api/v1/gyms/264/checkins/public-slots/at/54/date/`

const slotsHandler = async function (argv){
    const returnSlots = []
    const date = argv.date;

    const response = await axios.get(slots_url.concat(date));

    const availableSlots = response.data.slots.filter(slot => (slot.free_spots > 0));

    for(slot of availableSlots){
        const availableSlot = {
            orario: moment(slot.slot.check_in_at).format('HH:mm'),
            posti: slot.free_spots,
        }
        returnSlots.push(availableSlot)
    }
   console.table(returnSlots)
}

module.exports = {
    slotsHandler
}
