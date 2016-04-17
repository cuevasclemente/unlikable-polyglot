#!/bin/sh
[ $(printf "1\n1\n1\n1\n1\n1\n1\n1\n1\n1" | ./unalikability) = "0" -a  \
  $(printf "1\n2\n3\n4\n5\n6\n7\n8\n9\n10" | ./unalikability) = "1" -a \
  $(printf "1\n1\n1\n1\n1\n1\n1\n2\n2\n2" | ./unalikability) = "0.42" ]
if [ $? -ne 0 ]; then
  echo "Tests failed"
  exit 1
fi
echo "Tests passed"
exit 0
