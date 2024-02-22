# Chapter 11 : Lists and Sets

<dialog character="pilot">Please now plot our course as a list of destinations.</dialog>

Lists are linear collections of elements of the same type. Linear means that, in order to reach an element in a list, we must visit all the elements before (sequential access). Elements can be repeated, as only their order in the collection matters. The first element is called the head, and the sub-list after the head is called the tail.

## Lists

To define an empty list :

```
const empty_list: list<int> = list([]);
```

To define a list with values:

```
const my_list: list<int> = list([1, 2, 2]); // The head is 1
```

You can add elements to an existing list using the cons operator _..._ :

```
const larger_list: list<int> = list([5, ...my_list]); // [5,1,2,2]
```

You cannot access element directly in a list, but you can access the first element, the head, or the rest of the list, the tail. The two function to access those are List.head_opt and List.tail_opt

```
const head: option<int> = List.head_opt(my_list); // 1
const tail: option<list<int>> = List.tail_opt(my_list); // [2,2]
```

## Sets

Sets are unordered collections of values of the same type, whereas lists are ordered collections. Elements of sets in LIGO are unique, whereas they can be repeated in a list. To define an empty set:

```
const my_set: set<int> = Set.empty;
```

and to define a non-empty set:

```
const my_set: set<int> = Set.literal(list([3, 2, 2, 1]));
```

You can test membership with the _Set.mem_ operator :

```
const contains_3: bool = Set.mem(3, my_set);
```

Notice: Previously, _Set.size_ was used for the number of elements in a set. _Set.size_ is now marked for deprecation, and _Set.cardinal_ should be used instead:

```
const cardinal: nat = Set.cardinal(my_set);
```

To update a set :

```
const larger_set: set<int> = Set.add(4, my_set);
const smaller_set: set<int> = Set.remove(3, my_set);
```

## Your mission

<!-- prettier-ignore -->1- Define a variable *itinerary_initial* as a set of string names of celestial bodies representing your departure. Start with _"earth"_

<!-- prettier-ignore -->2- On the next line, define a variable *itinerary_small* representing your course (short version). Add _"sun"_ to the *itinerary_initial*.

<!-- prettier-ignore -->2- On the next line, define a variable *itinerary_big* representing your course (long version). Add _"alpha-centauri"_ to the *itinerary_small*.

<!-- prettier-ignore -->⚠️ If you have installed LIGO, then you can check the value of the *itinerary_big* variable by running the following command:

```
ligo run interpret --init-file exercise.jsligo 'itinerary_big'
```
