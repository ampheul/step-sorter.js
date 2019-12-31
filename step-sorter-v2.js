var lt = Symbol('less-than');
var gt = Symbol('greater-than');

/**
merge
-----
regular merge function.
*/
function* merge(xs, buffer, start, middle, end) {

    var i = 0;
    var j = 0;
    
    while (i + start < middle && j + middle < end) {
        var choice = yield [xs[i+start], xs[j+middle]];
        if (choice === lt) {
            buffer[start+i+j] = xs[start+i];
            i++;
        }
        else if (choice === gt) {

            buffer[start+i+j] = xs[j+middle];
            j++;
        }
        else {
            console.log("choice did not match anything");
        }
    }
    if (i + start >= middle) {
        while (j + middle < end) {
            buffer[start+i+j] = xs[j+middle];
            j++;
        }
    }
    else if (j + middle >= end) {
        while (i + start < middle) {
            buffer[start+j+i] = xs[i+start];
            i++;
        }
    }
    
    return buffer;
}

function* chain(gen1, gen2) {
    var x = gen1.next();
    while ( !x.done ) {
        x = gen1.next(yield x.value);
    }
    var y = gen2.next();
    while ( !y.done ) {
        y = gen2.next(yield y.value);
    }

    return y.value;
}
function* empty_generator() {}


function merge_sort(xs) {
    function recurse(xs, buffer, start, end) {
        if (end - start < 2) {
            return empty_generator();
        }
        else {
            var middle = Math.floor((start+end)/2);
            var gen1 = recurse(buffer, xs, start, middle);
            var gen2 = recurse(buffer, xs, middle, end);

            return chain(chain(gen1, gen2), merge(xs, buffer, start, middle, end));
        }
    }
    return recurse(xs, xs.slice(), 0, xs.length);
}


module.exports = {
    lt:lt,
    gt:gt,
    merge_sort:merge_sort
};
