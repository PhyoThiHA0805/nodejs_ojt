const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
   res.send('GET route on route.js');
});

router.post('/', (req, res) => {
   res.send('POST route on route.js');
});

//export this router to use in our index.js
module.exports = router;