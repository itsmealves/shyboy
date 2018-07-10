const Classifier = function(settings) {
    this.gamma = settings.gamma;
    this.maxCycles = settings.maxCycles;
    this.threshold = settings.threshold;

    console.log('[Classifier] (INFO) Setup complete');
}

const knn = function(pivot, dataset, k) {
    return dataset.filter(v => v.id != pivot.id)
                  .map(v => Object.assign({}, {v, w: distanceBetween(v, pivot)}))
                  .sort((a, b) => a.w - b.w)
                  .slice(0, k);
}

const distanceBetween = function(a, b, p) {
    let squaredDistance = 0;
    const length = Math.min(a.data.length, b.data.length);

    for(let i = 0; i < length; i++) {
        squaredDistance += p.data[i] * Math.pow(a.data[i] - b.data[i], 2);
    }

    return Math.sqrt(squaredDistance);
}

const buildDissimilarityMatrix = function(dataset, p) {
    const matrix = [];

    for(const m of dataset) {
        const mLine = [];

        for(const n of dataset) {
            mLine.push(distanceBetween(m, n, p));
        }

        matrix.push({id: m.id, data: mLine});
    }

    return matrix;
}

const getParameters = function(set, iteration) {
    //const random = Array(set[0].length).fill().map(() => Math.round(Math.random() * 1.0));
    return set[iteration % set.length];
}

const buildKnnSpanningGraph = function(dsr, k) {
    const graph = {};

    for(const row of dsr) {
        const neighbors = knn(row, dsr, k);
        graph[row.id + ''] = neighbors;
    }

    return graph;
}

const jensenDivergence = function(graph, gamma) {
    
}

Classifier.prototype.train = function(sets) {
    let mPartition = [];
    let mObjective = Number.MAX_VALUE;
    const trainingSet = sets.trainingSet;

    for(let k = trainingSet.length - 1; k > 0; k--) {
        let kP = [];
        let kGraph = null;
        let kPartition = [];
        let kObjective = Number.MAX_VALUE;
        let currentCycle = 0;
        let optimized = false;

        while(!optimized) {
            const p = getParameters(trainingSet, currentCycle);
            const dsr = buildDissimilarityMatrix(trainingSet, p);
            const graph = buildKnnSpanningGraph(dsr, k);
            const partition = graph;//deriveGraphPartition(graph);
            const divergence = jensenDivergence(graph, this.gamma);

            if(divergence < p) {
                kP = p;
                kGraph = graph;
                kPartition = partition;
                kObjective = divergence;
            }
                
            optimized = currentCycle++ >= this.maxCycles || divergence < this.threshold;
        }

        if(kObjective < mObjective) {
            mObjective = kObjective;
            mPartition = kPartition;
        } else if(kObjective > mObjective) {
            break;
        }
    }

    return mPartition;
}

Classifier.prototype.validate = function(sets) {
    
}

Classifier.prototype.testAgainst = function(examples) {
    
}

module.exports = Classifier;
