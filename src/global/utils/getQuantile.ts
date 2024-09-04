function getQuantile(props: Array<number>, recursive = false): Array<number> {
    const sorted = props.sort(((a, b) => a - b));
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const mid = (sorted.length) % 2 == 0 ?
        (sorted[sorted.length / 2] + sorted[(sorted.length / 2) - 1]) / 2
        : sorted[Math.floor(sorted.length / 2)];
    if (recursive) return [mid];

    const formerIndex = (sorted.length) % 2 == 0 ? sorted[sorted.length / 2] : sorted[Math.floor(sorted.length / 2)] - 1;
    const latterIndex = (sorted.length) % 2 == 0 ? sorted[sorted.length / 2] : sorted[Math.floor(sorted.length / 2)] + 1;
    const q1 = getQuantile(sorted.slice(0, formerIndex), true);
    const q3 = getQuantile(sorted.slice(latterIndex, sorted.length), true);

    return [min, q1[0], mid, q3[0], max]

}

export default getQuantile;