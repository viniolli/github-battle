import React from 'react'
import Prompt from '../components/Prompt'

const PromptContainer = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function() {
		return {
			username: ''
		}
	},
	handleUpdateUder: function(e) {
		this.setState({
			username: e.target.value
		})
	},
	handeSubmitUser: function(e) {
		e.preventDefault();
		const { username } = this.state
		this.setState({
			username: ''
		});

		if(this.props.routeParams.playerOne) {
			this.context.router.push({
				pathname: '/battle',
				query: {
					playerOne: this.props.routeParams.playerOne,
					playerTwo: username
				}
			})
		} else {
			this.context.router.push('/playerTwo/' + username);
		}
	},
	render: function() {
		return (
			<Prompt
				onSubmitUser={ this.handeSubmitUser }
				onUpdateUser={ this.handleUpdateUder}
				header={ this.props.route.header }
				username={ this.state.username } />
		)
	}
});

export default PromptContainer
