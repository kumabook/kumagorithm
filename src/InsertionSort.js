function* sort(a, less) {
  var N = a.length;
  for (var i = 0; i < N; i++) {
    for (var j = i; j > 0; j--) {
      if (less(a[j], a[j - 1])) {
        yield { selections: [i, j] };
        exch(a, j, j - 1);
      } else {
        break;
      }
    }
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
