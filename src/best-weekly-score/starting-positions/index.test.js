import startingPositions from '.';

// setup test data
const mockSettings = {
    rosterSettings: {
        lineupSlotCounts: {
            0: 1,
        },
    },
};

describe('Starting Positions', () => {
    it('should return a single starting position in array', () => {
        expect(startingPositions(mockSettings)).toInclude(0);
    });

    it('should not return a starting position if it has a 0 value', () => {
        mockSettings.rosterSettings.lineupSlotCounts = {
            1: 0,
        };
        expect(startingPositions(mockSettings)).toBeArrayOfSize(0);
    });

    it('should return number of starting positions as indicated in settings', () => {
        mockSettings.rosterSettings.lineupSlotCounts = {
            2: 2,
        };
        expect(startingPositions(mockSettings)).toIncludeSameMembers([2, 2]);
    });

    it('should remove known bench position ids', () => {
        mockSettings.rosterSettings.lineupSlotCounts = {
            20: 6,
            21: 1,
        };
        expect(startingPositions(mockSettings)).toBeArrayOfSize(0);
    });

    it('should work for all above scenarios at once', () => {
        mockSettings.rosterSettings.lineupSlotCounts = {
            0: 1,
            1: 0,
            2: 2,
            3: 3,
            6: 1,
            16: 1,
            17: 1,
            20: 6,
            21: 1,
            23: 1,
        };
        expect(startingPositions(mockSettings)).toIncludeSameMembers(
            [0, 2, 2, 3, 3, 3, 6, 16, 17, 23],
        );
    });
});
