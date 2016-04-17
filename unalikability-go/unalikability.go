package unalikability

import "math"

// Unalikeability returns the unalikability measure
// for `measurements`, assuming that
// `measurements` is an array describing a
// collection of measurements of a categorical
// variable (i.e: perhaps the results of running
// a multiclass classifier on a collection
// of elements of the same class).
func Unalikeability(measurements []int) float64 {
	unalike := 0.0
	counts := map[int]float64{}
	l := 0.0
	for _, m := range measurements {
		counts[m] += 1.0
		l += 1.0
	}
	// If every element is unique,
	// you get an unalikeability
	// of 1.0
	if float64(len(counts)) == l {
		return 1.0
	}
	for _, count := range counts {
		unalike += math.Pow(count/l, 2)
	}
	return 1 - unalike
}
