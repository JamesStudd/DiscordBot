const express = require("express");
const router = express.Router();

import { Commands } from "./../../Bot/MessageHandlers/Utils/commands";

router.get("/", (req, res) => {
	res.send(Commands);
});

module.exports = router;
