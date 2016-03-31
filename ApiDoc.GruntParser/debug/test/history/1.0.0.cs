/**
     * @apiVersion 1.0.0
         * @api {get} account/view/{id} view account
         * @apiName My Account
         * @apiDescription Gets the information of a user based on his Id.
         * @apiVersion 1.0.0
         * @apiGroup Account
         * @apiSampleRequest account/view/1
         * @apiHeader {String} consumer-key your consumer access token
         * @apiHeader {String} consumer-secret your secret access key.
         * @apiSuccess {Boolean} success Represents if the operation went through successfully.
         * @apiSuccess {Object} profile the user information
         * @apiSuccess {Number} profile.id the user Id
         * @apiSuccess {String} profile.name the user's full name
         * @apiSuccess {String} profile.emailAddress the user's email address.
         * @apiUse MaintenanceBreak
         * */