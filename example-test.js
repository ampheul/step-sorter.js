var ss = require('./step-sorter');

//-- BEGIN EXAMPLE/TEST

var sorted_list = range(0,50);

var xs = shuffle(sorted_list.slice());
console.log("UNSORTED:\n",xs);

// begin sorting
xs = ss.init_sort(xs);

// step through the sorting process automatically
while (xs[ss.type] === 'sorting') {
    [a,b] = ss.choices(xs);
    if (a > b) {
        xs = ss.sort_step(ss.lt, xs);
    }
    else {
        xs = ss.sort_step(ss.gt, xs);
    }
}

console.log("SORTED:\n", xs)

if (compare_arrays(xs, sorted_list)) {
    console.log("Sorting was successful!");
}
else {
    console.log("sorted_list does not match xs.");
}


//-- UTILITY FUNCTIONS

function range(start, end) {
    var xs  = [];
    for (let i = start; i <= end; i++) {
        xs.push(i);
    }
    return xs;
}

// knuth shuffle
function shuffle(xs) {
    for (let i = 0; i < xs.length; i++) {
	var k = Math.floor(Math.random()*(xs.length-i));
	// swap
	var tmp = xs[i];
	xs[i] = xs[i+k];
	xs[i+k] = tmp;
    }
    return xs;
}

function compare_arrays(xs, ys) {
    if (xs === ys) return true;
    else if (!xs || !ys) return false;
    else if (xs.length !== ys.length) return false;

    for (let i = 0; i < xs.length; i++) {
        if (xs[i] !== ys[i]) return false;
    }
    return true;
}
