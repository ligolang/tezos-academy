# Chapter 18 : Timestamps

<dialog character="pilot">Osiris, here we come! [FTL ENGINE ACTIVATING] Make yourself comfortable captain, it's gonna take some time.</dialog>

## Now

You cannot get the current time in LIGO, but you can get the starting time of the current block:

```
const today: timestamp = Tezos.get_now();
```

## Arithmetics

In LIGO, timestamps can be added to integers:

```
const today: timestamp = Tezos.get_now();
const one_day: int = 86_400;
const in_24_hrs: timestamp = today + one_day;
const some_date: timestamp = "2000-01-01T10:10:10Z" as timestamp;
const one_day_later: timestamp = some_date + one_day;
const _24_hrs_ago: timestamp = today - one_day;
```

## Comparison

You can compare timestamps using the same comparison operators that apply to numbers.

```
const not_tommorow: bool = (Tezos.get_now() == in_24_hrs);
```

## Your mission

<!-- prettier-ignore --> 1- Compute the constant timestamp _eta_ as our estimated time from arrival in 6 days from now.
