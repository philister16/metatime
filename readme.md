# Metatime

Metatime is a new way to keep track of and account for time optimised for the digital age. This repository is both a specification of the Metatime time keeping system as well as a [reference](#reference-library) implementation in javascript.

## Motivation and background

In our increasingly globalized world, decentralized and remote teams are a reality in many industries, particularly in tech and web3. Also, with the advent of the metaverse(s) it is becoming more and more common place to "meet" online across geographic boundaries and timezones. All of this holds a number of challenges, one of which is how we collectively think about and account for time.

### Lost in timezones

Today, it is notoriously difficult to schedule meetings of distributed teams across timezones or announce an event or meetup in the metaverse as you always have to factor the timezone differences. Generally we use the [UTC timesystem](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) that comes with timezones that are either n hours ahead or behind the universal time or UTC (for example Switzerland is UTC+1, San Francisco is UTC-8 and Singapore UTC+8). Generally, a timezone is just describing a deviation from UTC, either positive (UTC+n) or negative (UTC-n).

### Complicated calculations

Let's say Bob has scheduled an online meeting at 2pm and is based in Manhatten. NYC is in timezone UTC-5. Now let's assume Alice is joining from Singapore. She needs to manually add 8 + 5 hours to understand when to login to the meeting. How does she know to add 13 hours? She needs 3 data points: the meeting time, the meeting's timezone/deviation from UTC and her own timezone/deviation from UTC. In addition to the data she needs the knowledge how to calculate. This is all cumbersome and error prone. And besides the reading of the meeting time must feel a bit unnatural for Alice as in this example the actual meeting time in Singapore's timezone (UTC+8) is actually 1am in the morning on the next day! That is a very different time from 2pm in the afternoon as the meeting invite suggests.

### UTC for all

One way to solve this issue and make it more human-readable would be to ditch the concept of timezones and just use UTC around the globe. The problem with this solution is, that most of us have gotten used to certain universal conventions such as 6am - 9am are the morning hours, when we for example start work. Adopting UTC would most likely mean, that we would use 2 time calibrations in parallel: UTC for international meetings and the metaverse, and our local timezone to plan our days.

### Metatime as an alternative

This is where Metatime as an entirely new time counting system comes in. It is universal without timezones and in addition also more human-readable by making use of the familiar decimal instead of the sexagenary numeral system. Metatime is an adaption and simplifcation of some of the older [decimal time systems](https://en.wikipedia.org/wiki/Decimal_time) that originated in China and the French revolution.

## Specification

Metatime divides up a [Gregorian Calendar](https://en.wikipedia.org/wiki/Gregorian_calendar) day with the decimal numeral system as follows:

- 1 day is divided into 100 clicks
- 1 click is divided into 100 ticks
- 1 tick is divided into 100 blicks

Each Metatime units length can be expressed in milliseconds as follows:

- 1 click equals exactly 864,000 milliseconds
- 1 tick equals exactly 8,640 milliseconds
- 1 blick equals exactly 86.40 milliseconds

|       | day      | clicks | ticks  | blicks    |
|-------|----------|--------|--------|-----------|
| day   | 1        | 100    | 10,000 | 1,000,000 |
| click | 0.01     | 1      | 100    | 10,000    |
| tick  | 0.0001   | 0.01   | 1      | 100       |
| blick | 0.000001 | 0.0001 | 0.01   | 1         |

### Formatting

As a convention metatime uses a full stop to separate its different units clicks, ticks and blicks. The full stop makes it easier to differentiate Metatime from UTC time which commonly uses colons. Metatime by convention is noted from the largest to the smallest unit: days, clicks, ticks and lastly blicks.

In its most basic form metatime is stylized as follows:

> clicks.ticks (for example: 20.95 which can be read as 20 clicks and 95 ticks)

In some scenarios (for example when working across different UTC timezones, see section about timezones) it is useful to also show the day of the current month.

> days.clicks.ticks (for example 08.20.95 which can be read as 8th day of the month at 20 clicks and 95 ticks)

In scenarios such as a stop clock it is useful to also add in blicks.

> days.clicks.ticks.blicks (for example 08.20.95.80 which can be read as 8th day of the month at 20 clicks, 95 ticks and 80 blicks)

Instead of the full stop separating the units you can also use unit descriptors. As a convention these are:

- *dx* for days
- *cx* for clicks
- *tx* for ticks
- *bx* for blicks

Abbreviations are kept in all lower caps.

> 8dx 20cx 95tx

If clicks and ticks are being displayed together, separators can be ommited altogether. This essentially gives a reading of the total number of ticks that passed on a any given day. However, the notation including the full stop is preferred.

> 20.95 becomes 2095 (20 clicks and 95 ticks or 2095 ticks)

### Comparison to base 60 time

Because 1 Metatime blick is equal to 86.4 milliseconds, 100 clicks * 100 ticks * 100 blicks is equal to 86,400,000 milliseconds which is the same as 24 hours * 60 minutes * 60 seconds * 1000 milliseconds. Therefore, Metatime is compatible with the sexagenary UTC time system as both share the same largest unit, a Gregorian day. The conversion from one system to the other works out as follows:

|          | Clicks    | Ticks     | Blicks      | Milliseconds |
| -------- | --------- | --------- | ----------- | ------------ |
| day      | 100       | 10,000    | 1,000,000   | 86,400,000   |
| hour     | ~4.167    | ~416.667  | ~41,666.667 | 3,600,000    |
| minute   | ~0.06944  | ~6.944    | ~694.444    | 60,000       |
| second   | ~0.001157 | ~0.1157   | ~11.5740740 | 1,000        |

|       | days     | hours    | minutes | seconds | milliseconds |
| ----- | -------- | -------- | ------- | ------- | ------------ |
| Click | 0.01     | 0.24     | 14.4    | 864     | 864,000      |
| Tick  | 0.0001   | 0.0024   | 0.144   | 8.64    | 8,640        |
| Blick | 0.000001 | 0.000024 | 0.00144 | 0.0864  | 86.4         |

For convenience and to make transition to Metatime easier it is recommended to compare the two time systems as follows:

- 1 click equals 14 minutes and 24 seconds (14.4 minutes)
- 1 tick represent about 9 seconds (8.64 seconds)
- 10 clicks represent about 2 and a half hours (2.4 hours)
- 10 ticks represent about 1 and a half minutes (1.44 minutes)
- 25 clicks equal 6 hours (4 * 6 hours = 24 hours = 1 day = 4 * 25 clicks = 100 clicks = 1 day)

### Timezones

Metatime is universal and does not have any timezones at all. It uses UTC-0 midnight as a base. Therefore, UTC 00:00:00 is equal to 00.00 in Metatime. The following table compares metatime to UTC time:

| UTC      | Clicks | Ticks |
|----------|--------|-------|
| 00:00:00 | 0      | 0     |
| 00:14:24 | 1      | 100   |
| 00:28:48 | 2      | 200   |
| 00:43:12 | 3      | 300   |
| 00:57:36 | 4      | 400   |
| 01:12:00 | 5      | 500   |
| 01:26:24 | 6      | 600   |
| 01:40:48 | 7      | 700   |
| 01:55:12 | 8      | 800   |
| 02:09:36 | 9      | 900   |
| 02:24:00 | 10     | 1000  |
| 02:38:24 | 11     | 1100  |
| 02:52:48 | 12     | 1200  |
| 03:07:12 | 13     | 1300  |
| 03:21:36 | 14     | 1400  |
| 03:36:00 | 15     | 1500  |
| 03:50:24 | 16     | 1600  |
| 04:04:48 | 17     | 1700  |
| 04:19:12 | 18     | 1800  |
| 04:33:36 | 19     | 1900  |
| 04:48:00 | 20     | 2000  |
| 05:02:24 | 21     | 2100  |
| 05:16:48 | 22     | 2200  |
| 05:31:12 | 23     | 2300  |
| 05:45:36 | 24     | 2400  |
| 06:00:00 | 25     | 2500  |
| 06:14:24 | 26     | 2600  |
| 06:28:48 | 27     | 2700  |
| 06:43:12 | 28     | 2800  |
| 06:57:36 | 29     | 2900  |
| 07:12:00 | 30     | 3000  |
| 07:26:24 | 31     | 3100  |
| 07:40:48 | 32     | 3200  |
| 07:55:12 | 33     | 3300  |
| 08:09:36 | 34     | 3400  |
| 08:24:00 | 35     | 3500  |
| 08:38:24 | 36     | 3600  |
| 08:52:48 | 37     | 3700  |
| 09:07:12 | 38     | 3800  |
| 09:21:36 | 39     | 3900  |
| 09:36:00 | 40     | 4000  |
| 09:50:24 | 41     | 4100  |
| 10:04:48 | 42     | 4200  |
| 10:19:12 | 43     | 4300  |
| 10:33:36 | 44     | 4400  |
| 10:48:00 | 45     | 4500  |
| 11:02:24 | 46     | 4600  |
| 11:16:48 | 47     | 4700  |
| 11:31:12 | 48     | 4800  |
| 11:45:36 | 49     | 4900  |
| 12:00:00 | 50     | 5000  |
| 12:14:24 | 51     | 5100  |
| 12:28:48 | 52     | 5200  |
| 12:43:12 | 53     | 5300  |
| 12:57:36 | 54     | 5400  |
| 13:12:00 | 55     | 5500  |
| 13:26:24 | 56     | 5600  |
| 13:40:48 | 57     | 5700  |
| 13:55:12 | 58     | 5800  |
| 14:09:36 | 59     | 5900  |
| 14:24:00 | 60     | 6000  |
| 14:38:24 | 61     | 6100  |
| 14:52:48 | 62     | 6200  |
| 15:07:12 | 63     | 6300  |
| 15:21:36 | 64     | 6400  |
| 15:36:00 | 65     | 6500  |
| 15:50:24 | 66     | 6600  |
| 16:04:48 | 67     | 6700  |
| 16:19:12 | 68     | 6800  |
| 16:33:36 | 69     | 6900  |
| 16:48:00 | 70     | 7000  |
| 17:02:24 | 71     | 7100  |
| 17:16:48 | 72     | 7200  |
| 17:31:12 | 73     | 7300  |
| 17:45:36 | 74     | 7400  |
| 18:00:00 | 75     | 7500  |
| 18:14:24 | 76     | 7600  |
| 18:28:48 | 77     | 7700  |
| 18:43:12 | 78     | 7800  |
| 18:57:36 | 79     | 7900  |
| 19:12:00 | 80     | 8000  |
| 19:26:24 | 81     | 8100  |
| 19:40:48 | 82     | 8200  |
| 19:55:12 | 83     | 8300  |
| 20:09:36 | 84     | 8400  |
| 20:24:00 | 85     | 8500  |
| 20:38:24 | 86     | 8600  |
| 20:52:48 | 87     | 8700  |
| 21:07:12 | 88     | 8800  |
| 21:21:36 | 89     | 8900  |
| 21:36:00 | 90     | 9000  |
| 21:50:24 | 91     | 9100  |
| 22:04:48 | 92     | 9200  |
| 22:19:12 | 93     | 9300  |
| 22:33:36 | 94     | 9400  |
| 22:48:00 | 95     | 9500  |
| 23:02:24 | 96     | 9600  |
| 23:16:48 | 97     | 9700  |
| 23:31:12 | 98     | 9800  |
| 23:45:36 | 99     | 9900  |

#### Time cycles

Since Metatime does not have any timezones it can be useful to define time cycles instead. This is, however, only a recommendation and not a formal specification. For example, an organization could define its online meeting window as a cycle from 45-65 clicks. Or a worker may define his sleep/"do not disturb" cycle from 5 to 30 clicks. This has the advantage that time is always absolute, 50 clicks is 50 clicks anywhere on the globe but cycles may differ. While people in the US might go to sleep around 20 clicks, in Asia they are at work already at the same time. Around 60 clicks, however, Asians might start their sleep cycles while Americans are on their commute to work.

## Reference library

This is a tiny and simplistic implementation of Metatime in Javascript. It makes use of Javascript's built in Datetime functionality and dynamically calculates the Metatime.

### Installation

To use the library in the browser import it from the unpkg CDN. This will expose a Metatime object in the global scope.

```html
<script src="https://unpkg.com/metatime/lib/browser.js"></script>

<script>
// A global object Metatime is available
const time = Metatime.now();
console.log(time) // { days: 8, clicks: 20, ticks: 95, blicks: 99 render: Fn }
</script>
```

You can also install it on your local machine to use in a custom build process or with Node JS.

```bash
npm install metatime --save
```

```javascript
// ES6
import { now, clock, stop } from 'metatime';
import * as Metatime from 'metatime'; // import all at once instead

// Node
const Metatime = require('metatime');
```

### Usage

The library exposes 3 methods: `now()`, `clock()` and `stop()`.

```javascript
// Get the current metatime
const now = Metatime.now();
console.log(now); // { days: 8, clicks: 20, ticks: 95, blicks: 99, render: Fn }

// Display the time as a formatted string
const now = Metatime.now();
console.log(now.render()); // 20.95

// Format the rendered string
console.log(now.render({ display: 'd.cc.tt', style: 'units' })) // 8dx 20cx 95tx 99bx

// Setup an interval that streams the time
const clock = Metatime.clock(time => {
    console.log(time); // { days: 8, clicks: 20, ticks: 95, blicks: 99 render: Fn }
});

// Stopping the interval
const button = document.querySelector('button');
button.addEventListener('click', e => {
    Metatime.stop(clock);
});
```

### Reference

#### **Metatime**

Main object that contains 3 methods `now()`, `clock()` and `stop()`.

#### **Metatime.now()**

A method that returns an object with the metatime.

`Metatime.now([MetatimeConfig])`

```javascript
const now = Metatime.now();
console.log(now); // { days: 8, clicks: 20, ticks: 95, blicks: 99, render: Fn }
```

##### Parameters

- [Optional] *{Object}* of the type MetatimeConfig to pass configuration options

#### **Metatime.clock()**

A method that returns an interval overload.

`Metatime.clock(Function, [MetatimeConfig])`

```javascript
const options = { precision: 1000 };
const clock = Metatime.clock(time => {
    console.log(time); // { days: 8, clicks: 20, ticks: 95, blicks: 99, render: Fn } ... { days: 8, clicks: 20, ticks: 96, blicks: 00 render: Fn } ... { days: 8, clicks: 20, ticks: 97, blicks: 00, render: Fn } ...
}, options);
```

##### Parameters

- *{Function}* a callback function that runs on every interval cycle.
    - The callback function gets passed 1 argument, an *{Object}* of the type MetatimeTime with the current time in metatime format.
- [Optional] *{Object}* of the type MetatimeConfig to pass configuration options

#### **Metatime.stop()**

A method that takes a reference to an interval overload and stops it immediately. This is a simple wrapper to the native clearInterval() function for convenience.

`Metatime.stop(ref)`

##### Parameters

- *{number}* a reference to an active interval overload

#### **MetatimeConfig**

An object to set configuration options.

```javascript
const options = {
    precision: 100
}
```

##### Properties

| Properties | type | possible values | description |
| ---------- | -----| --------------- | ----------- |
| precision [optional] | number | >= 1 (default = 1000) | Defines the precision of the clock in milliseconds. |

#### **MetatimeInterface**

An object that serves as a return value of the metatime now and clock methods.

##### Properties

| Properties | type | possible values | description |
| ---------- | -----| --------------- | ----------- |
| day | number | >= 1 | The day of the month in UTC timezone |
| clicks | number | 0-99 | Metatime clicks |
| ticks | number | 0-99 | Metatime ticks |
| blicks | number | 0-99 | Metatime blicks |
| render | Function | *optional* formatting {object} / available properties: display (metatime timestring), style: standard (default), units, bulky | A function that returns the metatime in a formatted string and takes an optional formatting object as an argument |

#### **render()**

A utility function that is part of the MetatimeInterface and returned by both now() and the clock() callback.

`render([formatting: MetatimeFormatting]): string`

##### Parameters

- [Optional] *{Object}* of the type MetatimeFormatting to pass formatting options

#### **MetatimeFormatting**

An object that can be passed to the render utility function to format the metatime timestring.

| Properties | type | possible values | description |
| ---------- | -----| --------------- | ----------- |
| display | string | Default value is 'cc.tt'. Accepts any valid metatime timestring that uses a combination 'd' for day, 'c' for clicks, 't' for ticks and 'b' for blicks and a full stop '.' to separate different units. The number of subsequent letters defines the number of forced digits rendered, for example 'cc' will render clicks always in double digit format (for example 09, 10 etc.). | A metatime timestring to define the units and digits rendered. |
| style | string | 'standard' (default), 'units', 'bulky' | Defines the display style of the rendered string. |

## License

Copyright 2022 Philipp S. Nueesch

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.