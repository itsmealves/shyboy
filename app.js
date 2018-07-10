const Engine = require('./engine/engine');
const Classifier = require('./model/classifier');
const CsvProvider = require('./data/csvProvider');
const Normalization = require('./data/normalization');

const examples = [
    [5.4,3.9,1.7,0.4],
    [5.4,3.9,1.7,0.4],
    [5.4,3.9,1.7,0.4]
];

const classifier = new Classifier({
    gamma: 2,
    threshold: 0.1,
    maxCycles: 300
});

const dataProvider = new CsvProvider({
    testingProportion: 0.3,
    trainingProportion: 0.7,
    datasetPath: 'iris.data',
    trainingClass: 'Iris-setosa',
});

const engine = new Engine({
    model: classifier,
    provider: dataProvider
});


engine.train(() => {
    engine.validate(() => {
        engine.testAgainst(() => {}, examples);
    });
});

