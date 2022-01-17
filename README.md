# js-object

 a js oop experiment
 the objectiv is to try to mimic python's oop system, that is

- each method take a first argument that references the instance. That argument is mandatory.
- when acessed from the class, a method stays that way but accessed from an instance the method is bound to it and the first parameter no longer needs to be given.

The advantages are that there is no more special keyword like this which can be ambiguous in some cases. Also, giving a method to another object makes sure that method will still aply to the same instance it was bound to.
