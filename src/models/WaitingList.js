const mongoose = require('mongoose');

const WaitingListSchema = new mongoose.Schema({
    email: {
        type: String,
<<<<<<< HEAD
=======
        unique:true,
>>>>>>> 1c5e3fa... feat: add waitingList structure
        required: true,
    },
    namePatient: String,
    emailPatient: {
        type: String,
<<<<<<< HEAD
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('WaitingList', WaitingListSchema);
=======
        unique:true,
        required: true,
    },
}, { timestamps: true },
);

module.exports = mongoose.model('WaitingList', WaitingListSchema);
>>>>>>> 1c5e3fa... feat: add waitingList structure
