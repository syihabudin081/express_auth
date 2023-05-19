const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./router/userRoutes');

const app = express();
app.use(bodyParser.json());

// Mount the user routes
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
