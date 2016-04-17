package unalikability

import (
	"math"
	"testing"
)

func TestUnalike(t *testing.T) {
	collection := []int{1, 1, 1, 1, 1, 1, 1, 1, 1}
	u := Unalikeability(collection)
	if u != 0.0 {
		t.Errorf("Unalikability for a collection with only one variable should be 0, was: %v", u)
	}
	collection = []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	u = Unalikeability(collection)
	if u != 1.0 {
		t.Errorf("Unalikability for an array of unique values should be 1.0, was: %v", u)
	}
	collection1 := []int{1, 1, 1, 1, 2, 2, 3, 1, 1, 1}
	u1 := Unalikeability(collection1)
	collection2 := []int{1, 1, 1, 1, 2, 2, 2, 1, 1, 1}
	u2 := Unalikeability(collection2)
	if u1 < u2 {
		t.Errorf("The unalikability of an array with more class values should be greater than the unalikability of an array with just two class values, if they are expressing a similar degree of uncertainty in measurement")
	}
	collection = []int{1, 1, 1, 1, 1, 1, 1, 2, 2, 2}
	u = Unalikeability(collection)
	if math.Abs(u)-0.42 > 0.000001 {
		t.Errorf("The precomputed unalikeability of collection [ 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, ] should be `0.42`, was: %v", u)
	}
}
