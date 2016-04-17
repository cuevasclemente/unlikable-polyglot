// Unalikeability returns the unalikability measure
// for `measurements`, assuming that
// `measurements` is an array describing a
// collection of measurements of a categorical
// variable (i.e: perhaps the results of running
// a multiclass classifier on a collection
// of elements of the same class).
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
  // Return 1.0 if all elements are unique
  if(counts.length == array_of_ints.length) {
    return 1.0
  }
  return (1 - counts.map(function(e){
    return Math.pow(e/array_of_ints.length, 2)
  })
    .reduce(function(a,b) {
    return a+b }))
}
