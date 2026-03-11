#!/bin/bash

echo "Enter a number"
read num

if [ $num -gt 10 ]
then 
echo "Number is greater than 10"
elif [ $num -lt 10 ]
then
echo "Number is less than 10"
else
echo "The number you have entered is 10"
fi
