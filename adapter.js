class Adapter {

    constructor() {
        this.formatted_data = null;

        if (this.constructor === Adapter) {
            throw new TypeError('Abstract class "Adapter" cannot be instantiated directly.');
        }

        if (this.identify === undefined) {
            throw new TypeError('Classes extending the Adapter abstract class must implement identify');
        }

        if (this.events === undefined) {
            throw new TypeError('Classes extending the Adapter abstract class must implement events');
        }
    }

    format_req_body(req) {
        let data = null;
        switch (req.get('content-type')) {
            case 'application/json':
                data = req.body;
                break;

            case 'application/octet-stream':
                data = req.body.toString(); // Convert buffer to a string
                break;

            case 'text/plain':
                data = req.body;
                break;

            // data in the body of a POST request (not the URL)
            case 'application/x-www-form-urlencoded':
                data = req.body;
                break;
        }

        if (typeof (data) === "string") {
            data = JSON.parse(data);
        }

        return data;
    }

    /**
     * ABSTRACT METHODS.
     * Implementation required
     */
    identify(req, res) {
        throw new Error('You have to implement the method identify!');
        // when implement, Clean the data
        // const clean_data = this.clean(req);
    }

    /**
     * ABSTRACT METHODS.
     * Implementation required
     */
    events(req, res) {
        throw new Error('You have to implement the method events!');
        // when implement, Clean the data
        // const clean_data = this.clean(req);
    }
}

module.exports = Adapter;
