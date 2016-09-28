function* sort(a, less) {
  var aux = new Array(a.length);
  var context = {
    ec: 0, //numOfExch
    cc: 0 //numOfComp
  };
  yield* _sort(a, less, aux, 0, a.length - 1, context);
}

function* merge(a, less, aux, lo, mid, hi, context) {
  var i, j, k;
  for (k = lo; k <= hi; k++) {
    aux[k] = a[k];
  }

  i = lo, j = mid + 1;
  for (k = lo; k <= hi; k++) {
    yield { selections: [k], auxSelections: [i, j],
            aux: aux, lo: lo, hi: hi,
            numOfExch: context.ec, numOfComp: context.cc};
    if (i > mid) {
      a[k] = aux[j++];
    } else if (j > hi) {
      a[k] = aux[i++];
    } else if (less(aux[j], aux[i])) {
      context.ec++;
      a[k] = aux[j++];
    } else {
      a[k] = aux[i++];
    }
    context.cc++;
    yield { selections: [k], auxSelections: [i, j],
            aux: aux, lo: lo, hi: hi,
            numOfExch: context.ec, numOfComp: context.cc};
  }
}

function* _sort(a, less, aux, lo, hi, context) {
  if (hi <= lo) {
//    yield { selections: [], aux: aux };
  } else {
    var mid = lo + ~~((hi - lo) / 2);
    yield* _sort(a, less, aux, lo, mid, context);
    yield* _sort(a, less, aux, mid + 1, hi, context);
    yield* merge(a, less, aux, lo, mid, hi, context);
  }
}

module.exports = {
  sort: sort
};

