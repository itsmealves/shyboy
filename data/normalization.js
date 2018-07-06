const Normalization = {};

Normalization.MINMAX = function(values, settings) {
    const min = values.reduce((a, b) => Math.min(a, b));
    const max = values.reduce((a, b) => Math.max(a, b));

    return values.map(v => {
        return (v - min) / (max - min);
    });
}


module.exports = Normalization;
