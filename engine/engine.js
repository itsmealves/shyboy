const Engine = function(settings) {
    this.tasks = [];
    this.model = settings.model;
    this.provider = settings.provider;
    console.log('[ENGINE] (INFO) Setup complete');
}

Engine.prototype.run = function(procedure, callback) {
    const model = this.model;
    const onSuccess = function(fullDataset, trainingDataset, testingDataset) {
        console.log('[ENGINE] (INFO) Running procedure \'' + procedure + '\'');

        const toExecute = model[procedure];
        toExecute(fullDataset, trainingDataset, testingDataset);
        callback();
    };

    const onFailure = function(error) {
        console.log('[ENGINE] (ERROR) Couldn\'t fetch data from provider.');
    }

    this.provider.run()
        .then(onSuccess)
        .catch(onFailure);
}

Engine.prototype.train = function(callback) {
    this.run('train', callback);
};

Engine.prototype.validate = function(callback) {
    this.run('validate', callback);
};

Engine.prototype.testAgainst = function(callback, examples) {
    console.log('[ENGINE] (INFO) Running procedure \'testAgainst\'');
    this.model.testAgainst(examples);
    callback();
};

module.exports = Engine;
