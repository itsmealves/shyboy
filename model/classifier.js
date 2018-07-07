const Classifier = function(settings) {
    this.maxCycles = settings.maxCycles;

    console.log('[Classifier] (INFO) Setup complete');
}

Classifier.prototype.train = function(fullDataset, trainingDataset, testingDataset) {

}

Classifier.prototype.validate = function(fullDataset, trainingDataset, testingDataset) {
    
}

Classifier.prototype.testAgainst = function(examples) {
    
}

module.exports = Classifier;
