#!/usr/bin/nodejs
function unalikeability(array_of_ints) {
  var empty_counts = {}
  function get_counts(l) {
    if(l.length == 1) {
      empty_counts[l[0]] = empty_counts[l[0]] || 0.0;
      empty_counts[l[0]] = empty_counts[l[0]] + 1.0
      return Object.keys(empty_counts).map(function(key){return empty_counts[key]})
    }
    empty_counts[l[0]] = empty_counts[l[0]] || 0.0;
    empty_counts[l[0]] = empty_counts[l[0]] + 1.0 
    return get_counts(l.slice(1,l.length))
  }
  counts = get_counts(array_of_ints);
  if(counts.length == array_of_ints.length) {
    return 1.0
  }
  return (1 - counts.map(function(e){
    return Math.pow(e/array_of_ints.length, 2)
  })
    .reduce(function(a,b) {
    return a+b }))
}
if(unalikeability([1, 1, 1, 1, 1, 1, 1]) !== 0.0) {
  console.log("Test for one variable failed")
  process.exit(1)
}
if(unalikeability([1, 2, 3, 4, 5, 6, 7]) !== 1.0) {
  console.log("Test for list of unique variables failed")
  process.exit(1)
}
if (unalikeability([1, 1, 1, 1, 1, 1, 2, 2, 2]) > unalikeability([1, 1, 1, 1, 1, 1, 2, 2, 3])){
  console.log("Test for differences failed")
  process.exit(1)
}
if (unalikeability([1, 1, 1, 1, 1, 1, 1, 2, 2, 2 ]).toFixed(2) !== 0.42.toFixed(2)) {
  console.log("Precalculated test failed")
  process.exit(1)
}
process.exit(0)
