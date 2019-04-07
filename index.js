import mongoose from 'mongoose';
import { PORT, db } from './config.js';
import app from './app.js';
import routes from './Routes/index.js';

const connection = mongoose.connection;
const port = PORT || 8080;
mongoose.Promise = global.Promise;
mongoose.connect(db, {useCreateIndex: true, useNewUrlParser: true});
require('./models/User');
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function() {console.log('Mongodb connection Established')});
app.use('/api', routes);
app.listen(port, () => console.log(`listening on http://localhost:${port}`));