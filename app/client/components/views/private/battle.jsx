App.Battle = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        let gameId = FlowRouter.getParam('_id'),
            subscription = Meteor.subscribe('game', gameId);

        return {
            isLoading: !subscription.ready(),
            game: Games.findOne({_id: gameId})
        };
    },
    render() {
        if (this.data.isLoading) {
            return <App.Loading />;
        } else {
            return (
                <view className="animated fadeIn battle view">
                    <App.GameDetails />
                    <App.GameBoards game={this.data.game} />

                    <p>chat module</p>
                </view>
            );
        }
    }
});