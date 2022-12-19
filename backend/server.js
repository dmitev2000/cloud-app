const express = require('express');
const cors = require('cors');
const router = require('./routes/routes.js');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/api", upload.single("file"), router);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});