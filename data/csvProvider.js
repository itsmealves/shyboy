const fs = require('fs');
const readline = require('readline');

const CsvProvider = function(settings) {
    this.trainingProportion = settings.trainingProportion;
    this.testingProportion = settings.testingProportion;
    this.trainingClass = settings.trainingClass;
    this.datasetPath = settings.datasetPath;

    console.log('[CsvProvider] (INFO) Setup complete');
};

CsvProvider.prototype.run = function() {
    return new Promise((resolve, reject) => {
        console.log('[CsvProvider] (INFO) Starting to fetch entities');

        const path = this.datasetPath;
        const dataset = {length: 0, full: []};
        const trainingClass = this.trainingClass;
        const testingProportion = this.testingProportion;
        const trainingProportion = this.trainingProportion;

        const interface = readline.createInterface({
            input: fs.createReadStream(this.datasetPath)
        });

        console.log('[CsvProvider] (INFO) Read interface ready');

        interface.on('line', line => {
            if(line.length == 0) return;

            dataset.length += 1;
            const data = line.split(',');
            const lastIndex = data.length - 1;
            
            const entityClass = data[lastIndex];
            const entityData = data.slice(0, lastIndex);
            const entity = {
                id: dataset.length,
                data: entityData.map(v => parseFloat(v))
            };

            dataset.full.push(entity);

            if(dataset[entityClass]) {
                dataset[entityClass].push(entity);
            } else {
                dataset[entityClass] = [entity];
            }
        });

        interface.on('close', () => {
            console.log('[CsvProvider] (INFO) Fetching complete');

            const size = dataset[trainingClass].length;
            const normalizedTrainingProportion = trainingProportion / (trainingProportion + testingProportion);

            const trainingDataset = dataset[trainingClass].slice(0, normalizedTrainingProportion * size);
            const testingDataset = dataset[trainingClass].slice(normalizedTrainingProportion * size);

            for(const className in dataset) {
                if(className == trainingClass || className == 'length') continue;

                for(const entity of dataset[className]) {
                    testingDataset.push(entity);
                }
            }
            
            console.log('[CsvProvider] (INFO) Datasets ready');

            const sets = {full: dataset.full, trainingDataset, testingDataset};
            resolve(sets);
        });
    });
};


module.exports = CsvProvider;
