# espn-ff-utilities

## Overview

A library for extracting useful metrics from ESPN's v3 fantasy football API. The API isn't well documented so it's mostly been figured out by inspecting network calls on the ESPN fantasy website. If you are looking to utilize this package you will need information using the following URL.
```http://fantasy.espn.com/apis/v3/games/ffl/seasons/<year>/segments/0/leagues/<leagueId>?view=mBoxscore&view=mMathcupScore&view=mTeams&view=mSettings```
### Some notes about the endpoint
 - League Id can be obtained by logging in to ESPN's fantasy website and finding it in the URL
 - To fetch responses from this URL you will need the `SWID` and `espn_s2` cookies from the .espn.com domain
 - For now this package only works with the information provided from the query parameters specified above _as well as_ a specified `scoringPeriodId` query parameter to fetch results for past weeks.
### Relevant Fields
This module uses information from the `settings` and `schedule` fields of the response. The `teams` and `scoringPeriodId` fields are not used directly by this module but are helpful for providing this module with the necessary information.

## Functions

- [adjustedVictories(scoringPeriodId, teamId, schedule)](#adjustedVictories)
- [bestWeeklyScore(scoringPeriodId, teamId, schedule, settings)](#bestWeeklyScore)
- [realWeeklyScore(scoringPeriodId, teamId, schedule)](#realWeeklyScore)
- [recordVersus(scoringPeriodId, teamId, opposingIds, schedule)](#recordVersus)
- [didWin(scoringPeriodId, teamId, schedule)](#didWin)

### adjustedVictories
```ts
adjustedVictories(
    scoringPeriodId: number,
    teamId: number,
    schedule: Array<Matchup>
) => number
```

Calculates the number of victories a team would have secured if they played every other team in the league that week. For example:
> Team 1: 105pts, Team 2: 110pts, Team 3: 100pts
>
> Team 1 adjusted victories = 1</br>Team 2 adjusted victories = 2</br>Team 3 adjusted victories = 0

### bestWeeklyScore
```ts
bestWeeklyScore(
        scoringPeriodId: number,
        teamId: number,
        schedule: Array<Matchup>,
        settings: Settings
) => number
```

Calculates the highest possible score a team could have achieved during a given week given the league's roster settings.

### realWeeklyScore
```ts
realWeeklyScore(
    scoringPeriodId: number,
    teamId: number,
    schedule: Array<Matchup>
) => number
```

Find a teams actual posted score for a given scoring period.

### recordVersus
```ts
recordVersus(
    scoringPeriodId: number,
    teamId: number,
    opposingIds: Array<number>,
    schedule: Array<Matchup>
) => { wins: number, losses: number }
```
Calculates a team's record against a given array of opponents up to a specified scoring period.
 - Note: Passing an empty array to `opposingIds` will calculate the team's record against all opponents up to the given scoring period

 ### didWin
```ts
didWin(
    scoringPeriodId: number,
    teamId: number,
    schedule: Array<Matchup>
) => boolean
```
Determines if a team won their matchup in a given scoring period.

## Initialization

All functions are provided in their raw form through the default import:
```js
import { adjustedVictories, bestWeeklyScore } from 'espn-ff-utilities';
...
adjustedVictories(scoringPeriodId, teamId, schedule);
bestWeeklyScore(scoringPeriodId, teamId, schedule, settings);
```

There are also different initialization options

### init
```ts
init(
    schedule: Array<Matchup>,
    settings: Settings
) => InitializedFns
```
This option pre-sets the **schedule and settings** for all future function calls.
```js
import { init as espnFfInit } from 'espn-ff-utilities';

const { 
    adjustedVictories, 
    bestWeeklyScore,
    realWeeklyScore,
    recordVersus,
    didWin,
} = espnFfInit(scoringPeriodId, schedule, settings);
...
adjustedVictories(scoringPeriodId, teamId);
bestWeeklyScore(scoringPeriodId, teamId);
realWeeklyScore(scoringPeriodId, teamId);
recordVersus(scoringPeriodId, teamId, opposingIds);
didWin(scoringPeriodId, teamId);
```

### initForScoringPeriod
```ts
initForScoringPeriod(
    scoringPeriodId: number,
    schedule: Array<Matchup>,
    settings: Settings
) => InitializedWithSpiFns
```
This option pre-sets the **schedule, setting, and scoring period** for all future function calls.
```js
import { initForScoringPeriod as espnFfInit } from 'espn-ff-utilities';

const { 
    adjustedVictories, 
    bestWeeklyScore,
    realWeeklyScore,
    recordVersus,
    didWin,
} = espnFfInit(scoringPeriodId, schedule, settings);
...
adjustedVictories(teamId);
bestWeeklyScore(teamId);
realWeeklyScore(teamId);
recordVersus(teamId, opposingIds);
didWin(teamId);
```