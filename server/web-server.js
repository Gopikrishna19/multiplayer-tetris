const express = require('express');
const path = require('path');

const port = 8080;
const app = express();

app.use(express.static(path.join(__dirname, '..', 'src')));
app.use('/common', express.static(path.join(__dirname, '..', 'common')));

app.listen(port, () => {
    console.info(`Web server listening at http://localhost:${port}`);
});
