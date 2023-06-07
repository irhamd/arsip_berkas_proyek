import moment from "moment";

var randomstring = require("randomstring");

export const RandomText = randomstring.generate(10) + moment().format('YYYYMMDDHHmmss');