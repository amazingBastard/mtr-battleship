// @TODO: add exceptions

Meteor.methods({
    createGame(creatorAttributes) {
        check(creatorAttributes, Object);

        try {
            var game = Games.insert(creatorAttributes);
            return game;
        } catch (exception) {
            return exception;
        }
    },
    joinGame(gameId) {
        check(gameId, String);

        var user = Meteor.user();

        try {
            var game = Games.update(gameId, {
                $set: {'destroyer': user.username, 'playerCount': 2}
            });
            return game;
        } catch (exception) {
            return exception;
        }
    },
    completeGame(gameId) {
        check(gameId, String);

        var now = new Date();

        try {
            var game = Games.update(gameId, {
                $set: {'completedAt': now}
            });
            return game;
        } catch (exception) {
            return exception;
        }
    },
    declareWinner(argument) {
        check(argument, Object);

        try {
            var game = Games.update(argument._id, {
                $set: {'key': argument.key}
            });
            return game;
        } catch (exception) {
            return exception;
        }
    }
});