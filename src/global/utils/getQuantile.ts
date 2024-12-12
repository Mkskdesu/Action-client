// can be used for plus number only. -1 value will be removed.
function getQuantile(props: Array<number>, recursive = false): Array<number> {
    const sorted = [...props].filter(e=>e!=0).sort(((a, b) => a - b));
    
    if (sorted.length ==0) return [0,0,0,0,0]
    else if (sorted.length == 1) return new Array(5).fill(sorted[0]);
    else if (sorted.length == 2) return [sorted[0],(sorted[0]+sorted[1])/2,(sorted[0]+sorted[1])/2,(sorted[0]+sorted[1])/2,sorted[1]]
    else if (sorted.length == 3) return [sorted[0],(sorted[0]+sorted[1])/2,sorted[1],(sorted[1]+sorted[2])/2, sorted[2]];
    
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const mid = (sorted.length) % 2 == 0 ?
        (sorted[sorted.length / 2] + sorted[(sorted.length / 2) - 1]) / 2
        : sorted[Math.floor(sorted.length / 2)];
    if (recursive) return [mid];

    const formerIndex = (sorted.length) % 2 == 0 ? sorted.length / 2 : Math.floor(sorted.length / 2) - 1;
    const latterIndex = (sorted.length) % 2 == 0 ? sorted.length / 2 : Math.floor(sorted.length / 2) + 1;
    const q1 = getQuantile(sorted.slice(0, formerIndex), true);
    const q3 = getQuantile(sorted.slice(latterIndex, sorted.length), true);
    

    return [min, q1[0], mid, q3[0], max]

}

export default getQuantile;