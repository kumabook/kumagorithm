function* sort(a, less) {
  var ec = 0; //numOfExch
  var cc = 0; //numOfComp
  var N = a.length;
  var h = 1;
  while (h < N / 3) h = 3 * h + 1; // 1, 4, 13, 40, 121, 364, ...
  while (h >= 1) {
    for (var i = h; i < N; i++) {
      for (var j = i; j >= h; j -= h) {
        yield { selections: [j, j - h], h: h, numOfExch: ec, numOfComp: ++cc };
        if (less(a[j], a[j - h])) {
          ++ec;
          exch(a, j, j - h, h);
        } else {
          break;
        }
      }
    }
    h = ~~(h / 3);
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
