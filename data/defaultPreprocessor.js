const procedures = {
    normalize: function(data, settings) {
        const normalizer = settings.rule;
        const dimensions = data[0].length;

        for(let i = 0; i < dimensions; i++) {
            const input = data.map(sample => {
                return sample[i];
            });

            const output = normalizer(input, settings);

            for(let j = 0; j < data.length; j++) {
                data[j][i] = output[j];
            }
        }

        return data;
    }
};

const DefaultPreprocessor = function(tasks) {
    this.tasks = tasks;
};

DefaultPreprocessor.prototype.run = function(data) {
    for(const task of this.tasks) {
        for(const procedure in task) {
            const toExecute = procedures[procedure];
            if(toExecute)  {
                const settings = Object.assign({}, task[procedure]);
                data = toExecute(data, settings);
            }
        }
    }

    return data;
};

module.exports = DefaultPreprocessor;
