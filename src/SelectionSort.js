function* sort(a, less) {
  var N = a.length;
  for (var i = 0; i < N; i++) {
    var min = i;
    for (var j = i + 1; j < N; j++) {
      yield { selections: [i, j] };
      if (less(a[j], a[min])) {
        min = j;
      }
    }
    exch(a, i, min);
  }
}

function exch(a, i, j) {
  var swap = a[i];
  a[i] = a[j];
  a[j] = swap;
}

function isSorted(a, less) {
  for (var i = 1; i < a.length; i++) {
    if (less(a[i], a[i-1])) return false;
  }
  return true;
};

module.exports = {
  sort: sort,
  isSorted: isSorted
};
