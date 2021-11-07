import React from "react";

class Command extends React.Component {
	render() {
		return (
			<div className="container" id="commandView">
				<p>Command Name: {this.props.command.name} </p>
			</div>
		);
	}
}

export default Command;
