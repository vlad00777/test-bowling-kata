const Game = require('./app.js');

describe('Test Bowling Game', () => {

    let game;

    beforeEach(() => {
        game = new Game();
    });

    test('random game', () => {
        game.roll(5);
        game.roll(5);

        game.roll(7);
        game.roll(1);

        game.roll(2);
        game.roll(3);

        game.roll(0);
        game.roll(3);

        game.roll(10);
        
        game.roll(10);
        
        game.roll(10);
        
        game.roll(2);
        game.roll(5);

        game.roll(3);
        game.roll(7);

        game.roll(8);
        game.roll(1);
        
        expect(game.score()).toEqual(136);
    });

    test('score returns sum of rolls', () => {
        game.roll(2);
        game.roll(5);

        expect(game.score()).toEqual(7);
    });

    test('properly counts strikes', () => {
        game.roll(10);

        game.roll(5);
        game.roll(3);

        const expectedScore = 26; // (10 + 5 [bonus] + 3 [bonus]) + (5 + 3);

        expect(game.score()).toEqual(expectedScore);
    });

    test('properly counts spares', () => {
        game.roll(4);
        game.roll(6);

        game.roll(5);
        game.roll(2);

        const expectedScore = 22; // (4 + 6 + 5 [bonus]) + (5 + 2)

        expect(game.score()).toEqual(expectedScore);
    });

    test('handles perfect game', () => {
        for (let index = 0; index < 12; index += 1) {
            game.roll(10);
        }

        const expectedScore = 300; // maximum score
        expect(game.score()).toEqual(expectedScore);
    });

    test('handles worst game', () => {
        for (let index = 0; index < 20; index += 1) {
            game.roll(0);
        }

        const expectedScore = 0; // minimum score

        expect(game.score()).toEqual(expectedScore);
    });

    test('will not allow more rolls than it should in normal game', () => {
        for (let index = 0; index < 20; index += 1) {
            game.roll(3);
        }

        expect(() => game.roll(3)).toThrow('End of game');
    });

    test('will not allow more rolls than it should in perfect game', () => {
        for (let index = 0; index < 12; index += 1) {
            game.roll(10);
        }

        expect(() => game.roll(10)).toThrow('End of game');
    });

    test('handles sample game', () => {
        game.roll(10);
        game.roll(7);
        game.roll(3);
        game.roll(9);
        game.roll(0);
        game.roll(10);
        game.roll(0);
        game.roll(8);
        game.roll(8);
        game.roll(2);
        game.roll(0);
        game.roll(6);
        game.roll(10);
        game.roll(10);
        game.roll(10);
        game.roll(8);
        game.roll(1);

        const expectedScore = 167;

        expect(game.score()).toEqual(expectedScore);
    });

});
