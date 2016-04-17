# unalikeable-polyglot

A collection of implementations of the unalikeability metric in various languages.

## Sources and Thoughts

I learned most of what I learned about the unalikeability from this little paper: http://www.amstat.org/publications/jse/v15n2/kader.html.


I made this repository because very few individuals that I spoke to knew of the unalikeability metric, how simple it was, or what it could be used for. It's a nice little metric that should be used more often. Some people like to refer to this as akin to the "variance of a categorical random variable". That's cool too.


The other reason I made this was because I had a hard time getting the unalikeability correctly written when I first wrote it, and wanted to have a source to get back to. I later found that it was because I was trying to extrapolate the "Quantifying Variability with Two Categories" metric in the paper I cited above, but it's probably useful to have a place for it. It's not that complicated but it's a worthwhile metric to have on hand!

## Unalikeability

Unalikeability is a measure of the distribution of classifications in a multivariate distribution. Less abstractly: the unalikeability of a collection of discrete measurements is a measure of how much the measurements agree with one another in their characterization of a system. More concretely may be an example:

### Example

Imagine you have a multiclass classifier analyzing matrices that represent digits from the MNIST database, and you had a collection of digits that were all supposed to be the same digit, (i.e: you have a collection of these matrices, and each matrix is ostensibly supposed to correspond to a handwritten digit of the number 7). Let's imagine that your classifier will look at a matrix and then spit out the digit that it thinks the matrix corresponded to. Maybe in pythonic pseudocode, something like this:
```
...
results = []
for image in mnist_images_sevens:
  results.append(classifier.Classify(image))
print(results[:5])
```
The results may look like:
```
[ 7 7 1 7 7 2 ]
```


The mission of unalikeability metric is to determine how well your classifier picked up on the "7"-ness of the collection of mnist images (it also speaks a bit to the actual "7"-ness of the collection itself, devoid of your classifiers performance, but that's a bit harder to ascertain without knowing a little something about the performance of your classifier in the first place).


If the results looked like: `[7 7 7 7 7 7 ]`, you would want that to have an unalikeability of `0.0`, because the classifier's understanding of the data was that it was unalike any of the other classes. On the other hand, if the result was `[ 1 2 3 4 5 7 ]`, then you would want an unalikeability of `1.0`, because the classifier understood the data to be very "alike" members of the other classes of categorical data.


It's a useful metric for evaluating the performance of multiclass classifiers, and can be used for all sorts of problems that deal with different measurements of a categorical measurement (it's essentially like the discretized version of  the variance of a variable)


The implementation of unalikeability is pretty interesting. Here it is in more pythonic-pseudocode:
```
import collections
map_of_int_counts  = collections.Counter()
for i in list_of_ints:
    map_of_int_counts[i] += 1.0
unalikeability_sum = 0.0
number_of_measurements = sum(map_of_int_counts.values())
for count in map_of_int_counts.values():
    unalikeability_sum += (count/number_of_measurements)^2
unalikeability = 1 - unalikeability_sum
```


You can see that this number will be `0.0` if every number in `list_of_ints` is the same, and will approach (but not quite reach) `1.0` if every number in `list_of_ints` is different. A more brave implementation (like the ones in this repo) will return `1.0` as a convenience if every element in `list_of_ints` is the same.
