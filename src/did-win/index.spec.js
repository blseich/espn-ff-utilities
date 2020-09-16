import didWin from '.';

const testData = {
    schedule: [
        {
            away: {
                teamId: 4,
            },
            home: {
                teamId: 1,
            },
            winner: 'AWAY',
            matchupPeriodId: 1,
        },
        {
            away: {
                teamId: 4,
            },
            home: {
                teamId: 1,
            },
            winner: 'HOME',
            matchupPeriodId: 2,
        },
    ],
};


describe('Did Win', () => {
    it('should return true if team was away team and away team was the winner', () => {
        expect(didWin(1, 4, testData.schedule)).toBe(true);
    });

    it('should return false if team was home team and away team was the winner', () => {
        expect(didWin(1, 1, testData.schedule)).toBe(false);
    });

    it('should return true if team was home team and home team was the winner', () => {
        expect(didWin(2, 1, testData.schedule)).toBe(true);
    });

    it('should return false if team was away team and home team was the winner', () => {
        expect(didWin(2, 4, testData.schedule)).toBe(false);
    });
});
