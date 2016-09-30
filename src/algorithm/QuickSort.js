function* sort(a, less) {
  var context = {
    ec: 0, //numOfExch
    cc: 0 //numOfComp
  };
  yield* _sort(a, less, 0, a.length - 1, context);
}

function *_sort(a, less, lo, hi, context) {
  if (hi <= lo) return;
  var j = yield* partition(a, less, lo, hi, context);
  yield* _sort(a, less, lo, j-1, context);
  yield* _sort(a, less, j+1, hi, context);
}

function* partition(a, less, lo, hi, context) {
  var i = lo, j = hi + 1;
  for (;;) {
    context.cc++;
    while (less(a[++i], a[lo])) {
      yield { selections: [lo, hi, i, j], numOfExch: context.ec, numOfComp: context.cc };
      if (i == hi) {
        break;
      }
      context.cc++;
    }
    context.cc++;
    while (less(a[lo], a[--j])) {
      yield { selections: [lo, hi, i, j], numOfExch: context.ec, numOfComp: context.cc };
      if (j == lo) {
        break;
      }
      context.cc++;
    }
    if (i >= j) {
      break;
    }
    yield { selections: [lo, hi, i, j], numOfExch: context.ec, numOfComp: context.cc };
    context.ec++;
    exch(a, i, j);
  }

  context.ec++;
  exch(a, lo, j);
  yield { selections: [lo, hi, i, j], numOfExch: context.ec, numOfComp: context.cc, partitionEnd: true };
  return j;
}

function exch(a, i, j) {
  var swap = a[i];
  a[i] = a[j];
  a[j] = swap;
}

module.exports = {
  sort: sort
};
