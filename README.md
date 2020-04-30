# covid19
A Typescript package to access up to date statistics on the 2019 Corona Virus. Data from this package is from the
[John Hopkins CSSE](https://github.com/CSSEGISandData/COVID-19) and made accessible by the
[covid19api.com](https://covid19api.com/). I have simply written a Typescript package that handles the networking from
the API. Everything is typesafe and properties have been restructured to make it a little easier to access the data
you need.

#### NOTE!
Call these methods as infrequently as possible to not strain the server that is graciously hosting all of this data
**FOR FREE**. Data is only updated daily so don't call more frequently than that. Cache your responses, don't recall
every time.


### Example
```typescript
import {Covid19} from "@elijahjcobb/covid19";

await Covid19.getAllCountries();
await Covid19.getSummary();
await Covid19.getDailyForCountry("united-states");
await Covid19.getDailyForRegionsInCountry("united-states");
await Covid19.getDailyForProvincesInCountry("united-states");
```

### Types
You can view all the actual types that I created for this package in the
[types.ts](https://github.com/elijahjcobb/covid19/tree/master/ts/types.ts) file.

### Documentation
Everything has been completely documented. You can view the
[source code](https://github.com/elijahjcobb/covid19/tree/master/ts) on GitHub.

### Bugs
If you find any bugs please [create an issue on GitHub](https://github.com/elijahjcobb/covid19/issues).

### Support
[Buy me a coffee! :)](https://www.buymeacoffee.com/elijahjcobb)