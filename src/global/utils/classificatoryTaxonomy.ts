export default (value: number, q1: number, mid: number, q3: number): number => {
    if (!value || value==0) return -1;
    else if (value < q1) return 0;
    else if (value < mid) return 1;
    else if (value < q3) return 2;
    else return 3;

}