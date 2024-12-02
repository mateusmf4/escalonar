export default class Matrix {
    vals: number[][];
    m: number;
    n: number;
    constructor(nums: number[][]) {
        this.vals = nums;
        this.m = nums.length;
        this.n = nums[0].length;
    }

    clone(): Matrix {
        return new Matrix(structuredClone(this.vals));
    }

    swapRows(i1: number, i2: number) {
        i1 -= 1;
        i2 -= 1;
        [this.vals[i1], this.vals[i2]] = [this.vals[i2], this.vals[i1]];
    }
};