import bestPlayer from '.';

// setup test data

// -- applied stat totals
const highestAppliedStatTotal = 12.5;
const eligibilePlayerSlotId = 0;
const ineligiblePlayerSlotId = 1;

// -- eligible and ineligible players
const eligiblePlayer = {
    playerPoolEntry: {
        player: {
            eligibleSlots: [eligibilePlayerSlotId],
        },
        appliedStatTotal: highestAppliedStatTotal,
    },
};
const ineligiblePlayer = {
    playerPoolEntry: {
        player: {
            eligibleSlots: [ineligiblePlayerSlotId],
        },
        appliedStatTotal: 0,
    },
};
const eligiblePlayerWithLowerScore = {
    playerPoolEntry: {
        player: {
            eligibleSlots: [eligibilePlayerSlotId],
        },
        appliedStatTotal: 0,
    },
};

// -- differing player arrays
const playersWithOnlyEligiblePlayer = [eligiblePlayer];
const playersWithIneligiblePlayer = [
    ineligiblePlayer,
    eligiblePlayer,
];
const playersWithTwoEligiblePlayers = [
    eligiblePlayerWithLowerScore,
    eligiblePlayer,
];

describe('Best Player', () => {
    it('sould be a function', () => {
        expect(bestPlayer).toBeInstanceOf(Function);
    });

    it('should return a player', () => {
        expect(bestPlayer(eligibilePlayerSlotId, playersWithOnlyEligiblePlayer))
            .toBe(eligiblePlayer);
    });

    it('should return a player with the given eligibility id', () => {
        expect(bestPlayer(eligibilePlayerSlotId, playersWithIneligiblePlayer))
            .toBe(eligiblePlayer);
    });

    it('should return the player with the heighest score if multiple players have same eligibility id', () => {
        expect(bestPlayer(eligibilePlayerSlotId, playersWithTwoEligiblePlayers))
            .toBe(eligiblePlayer);
    });
});
