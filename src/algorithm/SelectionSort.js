function* sort(a, less) {
  var ec = 0; //numOfExch
  var cc = 0; //numOfComp
  var N = a.length;
  for (var i = 0; i < N; i++) {
    var min = i;
    for (var j = i + 1; j < N; j++) {
      yield { selections: [i, j, min], numOfExch: ec, numOfComp: ++cc };
      if (less(a[j], a[min])) {
        min = j;
      }
    }
    if (i != min) {
      yield { selections: [i, j, min], numOfExch: ++ec, numOfComp: cc };
      exch(a, i, min);
    }
  }
  return { selections: [0, 0, 0], numOfExch: ec, numOfComp: cc };
}

function exch(a, i, j) {
  var swap = a[i];
  a[i] = a[j];
  a[j] = swap;
}

module.exports = {
  sort: sort
};
