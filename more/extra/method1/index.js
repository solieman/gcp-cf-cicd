const express = require('express');
const app = express();
const Adapter = require('./adapter');

class BrazeAdapter extends Adapter {
    constructor(req){
        super(req);
        this.formatted_data = this.format_req_body(req);
    }

    events(req, res) {
        const data = this.formatted_data;
        const app_name = data.app_name;

        res.status(405).send("Method Not Allowed");
    }

    identify(req, res) {
        const data = this.formatted_data;
        const app_name = data.app_name;

        res.status(405).send("Method Not Allowed");
    }
}

let braze = null;

app.post('/event', function (req, res) {
    braze = new BrazeAdapter(req);
    braze.events(req, res);
});
app.post('/identify',function (req, res) {
    braze = new BrazeAdapter(req);
    braze.identify(req, res);
});
exports.small = app;
