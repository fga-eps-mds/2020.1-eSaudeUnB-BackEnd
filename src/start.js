const app = require('./server.js');
require('./config/database.js');

const port = process.env.PORT || '8000';

app.listen(port);
