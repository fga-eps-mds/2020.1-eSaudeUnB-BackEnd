const mongoose = require('mongoose');

mongoose
    .connect('mongodb://root:esaude@mongo:27017', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        // eslint-disable-next-line no-console
        console.log('MongoDB connected!');
    })
    .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('Not connected to MongoDB!');
        // eslint-disable-next-line no-console
        console.log(err);
    });
