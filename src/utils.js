// this function compare two objects
// assume a & b should be objects
const compare = (a, b) => {
    if (a.start < b.start) {
        return -1;
    } else if (a.start > b.start) {
        return 1;
    }
    return a.end - b.end;
};

const schedule = (data) => {
    if (!data || data.length === 0) return [];
    const size = data.length;
    let marks = new Array(size).fill(0);

    let shift = 0;
    for (let i = 0; i < size; i++) {
        if (marks[i] === 0) {
            shift++;
            marks[i] = shift;   // assign the task to shift
            const task = data[i];
            let time = task.end;
            // assign next tasks could be in the same shift
            for (let j = 0; j < data.length; j++) {
                const next_stask = data[j];
                if (marks[j] === 0 && next_stask.start >= time) {
                    marks[j] = shift;
                    time = next_stask.end;
                }
            }
        }
    }

    // group by shift
    return marks.reduce((res, val, index) => {
        res[val] = [...res[val] || [], data[index]];
        return res;
    }, []);
};

// assume arr should be an array
// greedy algorithm
const process = (arr) => {
    const cloned = [...arr];
    const sorted = cloned.sort(compare);
    return schedule(sorted);
};

export {
    process
}