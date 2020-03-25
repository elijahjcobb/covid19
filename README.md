# covid19
A typescript networking library to access WHO data about the 2019 covid19 virus.

## Credit
[https://github.com/javieraviles/covidAPI]()

This library internally calls an API setup by [`javieraviles`](https://github.com/javieraviles) that I found in their
repository [`covidAPI`](https://github.com/javieraviles/covidAPI).


## Example
```typescript
import {Covid19, Global, Country, Report} from "@elijahjcobb/covid19";

const global: Global = await Covid19.getGlobal();
const country1: Country = await Covid19.getCountry("China");
const country2: Country = await Covid19.getUnitedStates();
const countries: Country[] = await Covid19.getAllCountries();
const report: Report = await Covid19.get();
```

## Types
```typescript
interface Country {
    country: string;
    cases: number;
    todayCases: number;
    deaths: number;
    todayDeaths: number;
    recovered: number;
    active: number;
    critical: number;
    casesPerOneMillion: number;
    deathsPerOneMillion: number;
}

interface Global {
    cases: number;
    deaths: number;
    recovered: number;
}

interface Report {
    countries: Country[];
    global: Global;
    timestamp: number;
}
```

## Documentation
Everything is completely documented. You can view the
[source code](https://github.com/elijahjcobb/covid19/tree/master/ts) on GitHub.

## Bugs
If you find any bugs please [create an issue on GitHub](https://github.com/elijahjcobb/covid19/issues) or if you are old
fashioned email me at [elijah@elijahcobb.com](mailto:elijah@elijahcobb.com).