App.GameBoardTarget = React.createClass({
    mixins: [ReactMeteorData],
    propTypes: {
        boardProps: React.PropTypes.object,
        targetProps: React.PropTypes.object
    },

    shouldComponentUpdate() {
        return true;
    },

    getMeteorData() {
        return {
            gameId: this.props.boardProps.gameId,
            boardId: this.props.boardProps.boardId,
            boardStatus: this.props.boardProps.status,
            boardOwner: this.props.boardProps.owner,
            targetId: this.props.targetProps.id,
            targetStatus: this.props.targetProps.status,
            isTarget: this.props.targetProps.isTarget
        };
    },

    // @TODO: break this up and move into a separate module
    // see /client/modules/game_create.js for reference

    handleTargetClick(event) {
        event.preventDefault();

        let user = Meteor.user(),
            isBoardOwner = user.username === this.data.boardOwner,
            noUnitsDeployed = this.data.boardStatus === null,
            isTarget = this.data.isTarget,
            ready = this.data.boardStatus === 'ready',
            offensive = this.data.boardStatus === 'offense',
            defensive = this.data.boardStatus === 'defensive',
            targetEmpty = this.data.targetStatus === 'empty';

        if (isBoardOwner) {
            if (noUnitsDeployed) {
                let targetAttributes = {
                    boardId: this.data.boardId,
                    targetId: this.data.targetId
                };

                if (targetEmpty) {
                    Meteor.call('placeUnit', targetAttributes, (error) => {
                        if (error) {
                            Bert.alert(error.reason, 'warning');
                        } else {
                            Bert.alert('Unit placed on ' + targetAttributes.targetId, 'success');
                        }
                    });
                } else {
                    Meteor.call('removeUnit', targetAttributes, (error) => {
                        if (error) {
                            Bert.alert(error.reason, 'warning');
                        } else {
                            Bert.alert('Unit removed from ' + targetAttributes.targetId, 'warning');
                        }
                    });
                }
            }
            if (defensive) {
                Bert.alert('You are on the defensive, wait for your opponent to make their move.', 'warning');
            } else {
                Bert.alert('You cannot change unit positions when game is in progress', 'warning');
            }
        } else {
            if (ready || offensive) {
                let targetAttributes = {
                    boardId: this.data.boardId,
                    targetId: this.data.targetId
                };

                console.log(targetAttributes);
                console.log(isTarget);

                // return data.isTarget from props.isTarget

                // if noTarget call chooseTarget
                // else call removeTarget

                if (!isTarget) {
                    Meteor.call('chooseTarget', targetAttributes, (error) => {
                        if (error) {
                            Bert.alert(error.reason, 'warning');
                        } else {
                            Bert.alert('Selected target ' + targetAttributes.targetId, 'success');
                        }
                    });
                } else {
                    Meteor.call('removeTarget', targetAttributes, (error) => {
                        if (error) {
                            Bert.alert(error.reason, 'warning');
                        } else {
                            Bert.alert('Removed target ' + targetAttributes.targetId, 'warning');
                        }
                    });
                }
            } else {
                Bert.alert('Your opponent is a little slow, give them more time.', 'warning');
            }
        }
    },

    render() {
        let className = 'cell',
            idName = this.data.targetId,
            isBoardOwner = Meteor.user().username === this.data.boardOwner,
            isSelected = this.data.targetStatus === 'selected',
            isTarget = this.data.isTarget,
            missed = this.data.targetStatus === 'missed',
            destroyed = this.data.targetStatus === 'destroyed';

        // @TODO: refactor - micro-branching

        if (isSelected && isBoardOwner) {
            className += ' selected';
        }
        if (isTarget) {
            className += ' target'
        }
        if (missed) {
            className += ' missed'
        }
        if (destroyed) {
            className += ' destroyed'
        }

        return (
            <div className={className} id={idName} onClick={this.handleTargetClick}></div>
        );
    }
});