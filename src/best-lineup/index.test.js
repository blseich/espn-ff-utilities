import bestPlayer from '../best-player';
import startingPositions from '../starting-positions';
import bestLineup from '.';

// setup mocks
jest.mock('../best-player');
jest.mock('../starting-positions');

// extract jest matchers
const {
  arrayContaining,
  toIncludeSameMembers,
  toSatisfy,
} = expect;

// setup test data
const mockSettings = {};
const player1 = 'player1';
const player2 = 'player2';
const player3 = 'player3';
const player4 = 'player4';
const players = [
  player1,
  player2,
  player3,
  player4,
];


describe('Best Lineup', () => {
  beforeEach(() => {
    startingPositions.mockReturnValue([]);

    // returning empty string from bestPlayer prevents
    // any player from being removed from the players copy
    // which hallows us to properly capture the mock's params
    bestPlayer.mockReturnValue('');
  });

  it('should get starting positions with provided settings', () => {
    bestLineup(mockSettings, players);
    expect(startingPositions).toHaveBeenCalledWith(mockSettings);
  });

  it('should call best available player for each slot id provided from starting positions', () => {
    startingPositions.mockReturnValue([0, 2, 3]);

    bestLineup(mockSettings, players);
    expect(bestPlayer).toHaveBeenCalledTimes(3);
  });

  it('should call best available player with starting position id and players array', () => {
    startingPositions.mockReturnValue([0]);

    bestLineup(mockSettings, players);
    expect(bestPlayer).toHaveBeenCalledWith(0, arrayContaining(players));
  });

  it('should not pass exact players array to get best available player', () => {
    startingPositions.mockReturnValue([0]);

    bestLineup(mockSettings, players);
    expect(bestPlayer).not.toHaveBeenCalledWith(0, toSatisfy((param) => players === param));
  });

  it('should remove player returned from bestPlayer from available players for next call', () => {
    const arrWithoutPlayer1 = [player2, player3, player4];

    startingPositions.mockReturnValue([0, 2]);
    bestPlayer.mockReturnValueOnce(player1)
      .mockReturnValueOnce('');

    bestLineup(mockSettings, players);
    expect(bestPlayer).toHaveBeenNthCalledWith(2, 2, toIncludeSameMembers(arrWithoutPlayer1));
  });

  it('should return array of players returned by bestPlayer', () => {
    const expectedBestLineup = [player1, player2, player4];

    startingPositions.mockReturnValue([0, 2, 3]);
    bestPlayer.mockReturnValueOnce(player1)
      .mockReturnValueOnce(player2)
      .mockReturnValueOnce(player4);

    expect(bestLineup(mockSettings, players)).toIncludeSameMembers(expectedBestLineup);
  });
});
