App.RecoverPassword = React.createClass({
    componentDidMount() {
        Modules.client.recoverPassword({
            form: '#recoverPassword'
        });
    },
    handleSubmit(event) {
        event.preventDefault();
    },
    render() {
        return (
            <view className="recover password view">
                    <h2 className="title">Recover Password</h2>

                    <form id="recoverPassword" className="recover password form" onSubmit={this.handleSubmit}>
                        <p className="info alert">Enter your email address below to receive a link to reset your password.</p>

                        <div className="input group">
                            <label className="label" htmlFor="emailAddress">Email Address</label>
                            <input type="email" name="emailAddress" className="email input" placeholder="Email Address"/>
                        </div>
                        <button type="submit" className="primary button">Recover Password</button>
                    </form>
            </view>
        );
    }
});