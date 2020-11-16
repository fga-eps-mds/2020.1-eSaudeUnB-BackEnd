const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => {
    // eslint-disable-next-line no-console
    console.log('MongoDB connected!');
}).catch((err) => {
    // eslint-disable-next-line no-console
    console.log('Not connected to MongoDB!');
    // eslint-disable-next-line no-console
    console.log(err);
});
