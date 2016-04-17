import collections
import math
def unalikeability(measurements: [int]) -> float:
    """
    Unalikeability returns the unalikability measure
    for `measurements`, assuming that
    `measurements` is an array describing a
    collection of measurements of a categorical
    variable (i.e: perhaps the results of running
    a multiclass classifier on a collection
    of elements of the same class).

    >>> unalikeability([1, 1, 1, 1, 1, 1, 1])
    0.0
    >>> unalikeability([1, 2, 3, 4, 5, 6, 7])
    1.0
    >>> unalikeability([1, 1, 1, 1, 1, 1, 2, 2, 2]) < \
        unalikeability([1, 1, 1, 1, 1, 1, 2, 2, 3])
    True
    >>> round(unalikeability([1, 1, 1, 1, 1, 1, 1, 2, 2, 2 ]), 2)
    0.42
    """
    unalike = 0.0
    counts = collections.Counter()
    l = 0.0
    for m in measurements:
            counts[m] += 1.0
            l += 1.0
    # If every element is unique,
    # you get an unalikeability
    # of 1.0
    if len(counts.keys()) == l:
            return 1.0
    for count in counts.values():
            unalike += math.pow(count/l, 2)
    return 1 - unalike


if __name__ == '__main__':
    import doctest
    doctest.testmod()
