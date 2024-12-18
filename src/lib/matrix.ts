function nonZero(x: number): boolean {
    return Math.abs(x) > 0.0000001;
}

export default class Matrix {
    vals: number[][];
    m: number;
    n: number;
    constructor(nums: number[][]) {
        this.vals = nums;
        this.m = nums.length;
        this.n = nums[0].length;
    }

    static fromFlatNums(m: number, n: number, nums: number[]) {
        let mat = new Matrix([[1]]);
        mat.m = m;
        mat.n = n;
        let rows = [];
        let ii = 0;
        for (let i = 0; i < m; ++i) {
            let row = [];
            for (let j = 0; j < n; ++j) {
                row.push(nums[ii++]);
            }
            rows.push(row);
        }
        mat.vals = rows;
        return mat;
    }

    clone(): Matrix {
        return new Matrix(structuredClone(this.vals));
    }

    // Li1 <-> Li2
    swapRows(i1: number, i2: number) {
        i1 -= 1;
        i2 -= 1;
        [this.vals[i1], this.vals[i2]] = [this.vals[i2], this.vals[i1]];
    }

    // Li -> Li * factor
    scaleRow(i: number, factor: number) {
        i -= 1;
        this.vals[i] = this.vals[i].map((x) => x * factor);
    }

    // Li1 -> Li1 + Li2 * factor
    addRows(i1: number, i2: number, factor: number) {
        i1 -= 1;
        i2 -= 1;
        this.vals[i1] = this.vals[i1].map((x, i) =>
            x + this.vals[i2][i] * factor
        );
    }

    get(i: number, j: number): number {
        return this.vals[i - 1][j - 1];
    }

    getFlat(flatIndex: number): number {
        let i = Math.floor(flatIndex / this.n);
        let j = flatIndex % this.n;
        return this.vals[i][j];
    }

    firstNonZero(i: number): number | null {
        for (let j = 1; j <= this.n; ++j) {
            if (nonZero(this.get(i, j))) {
                return j;
            }
        }
        return null;
    }

    escalonar() {
        for (let i = 1; i <= this.m; i++) {
            const j = this.firstNonZero(i);
            if (j === null) continue;
            const a = this.get(i, j);
            if (a !== 1) {
                this.scaleRow(i, 1 / a);
            }
            for (let i2 = 1; i2 <= this.m; i2++) {
                if (i2 !== i) {
                    const b = this.get(i2, j);
                    if (nonZero(b)) {
                        this.addRows(i2, i, -b);
                    }
                }
            }
        }
        // ordernar as linhas usando selection sort
        for (let end = this.m; end > 1; --end) {
            let maxJ = 0;
            let maxI = 0;
            for (let i = 1; i <= end; i++) {
                const j = this.firstNonZero(i) ?? (this.n + 1);
                if (j > maxJ) {
                    maxJ = j;
                    maxI = i;
                }
            }
            if (maxI !== end) {
                this.swapRows(maxI, end);
            }
        }
    }
}
