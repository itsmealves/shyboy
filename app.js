const Engine = require('./engine/engine');
const Classifier = require('./model/classifier');
const CsvProvider = require('./data/csvProvider');
const Normalization = require('./data/normalization');

const classifier = new Classifier({
    maxCycles: 300
});

const dataProvider = new CsvProvider({
    divideByClasses: true,
    trainingProportion: 0.7,
    testingProportion: 0.3,
    datasetPath: 'iris.data'
});

const engine = new Engine({
    model: classifier,
    provider: dataProvider
});

engine.start()
      .train()
      .validate()
      .testAgainst(examples);
