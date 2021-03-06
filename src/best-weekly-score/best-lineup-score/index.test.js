import bestLineupScore from '.';
import bestLineup from '../best-lineup';

// setup mocks
jest.mock('../best-lineup');

const mockSettings = {};
const mockPlayers = [];

const mockPlayer1 = {
    playerPoolEntry: {
        appliedStatTotal: 10,
    },
};
const mockPlayer2 = {
    playerPoolEntry: {
        appliedStatTotal: 15,
    },
};
const mockPlayer3 = {
    playerPoolEntry: {
        appliedStatTotal: 25,
    },
};

describe('Best Lineup Score', () => {
    beforeEach(() => {
        bestLineup.mockReturnValue([]);
    });

    it('should get best possible lineup', () => {
        bestLineupScore(mockSettings, mockPlayers);
        expect(bestLineup).toHaveBeenCalledWith(mockSettings, mockPlayers);
    });

    it('should sum up appliedStatTotal for each player returned', () => {
        bestLineup.mockReturnValue([mockPlayer1, mockPlayer2, mockPlayer3]);
        expect(bestLineupScore(mockSettings, mockPlayers)).toBe(50);
    });
});
