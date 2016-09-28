function* sort(a, less) {
  var ec = 0; //numOfExch
  var cc = 0; //numOfComp
  var N = a.length;
  for (var i = 0; i < N; i++) {
    for (var j = i; j > 0; j--) {
      yield { selections: [i, j], numOfExch: ec, numOfComp: ++cc };
      if (less(a[j], a[j - 1])) {
        ++ec;
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

module.exports = {
  sort: sort
};
