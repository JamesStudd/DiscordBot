import React from "react";
import Command from "./Command";
import axios from "axios";

class Commands extends React.Component {
	componentDidMount() {
		this.setState(() => {
			return {
				loading: true,
				commands: {},
			};
		});

		axios.get("/commands").then((res) => {
			const data = res.data;
			this.setState(() => {
				return {
					loading: false,
					commands: data,
				};
			});
		});
	}

	render() {
		return (
			<div className="container" id="commandsView">
				{this.state && this.state.loading && <p>TODO BETTER LOADING</p>}
				{this.state &&
					!this.state.loading &&
					Object.keys(this.state.commands).map((e, index) => (
						<div key={e}>
							<Command command={this.state.commands[e]} />
						</div>
					))}
			</div>
		);
	}
}

export default Commands;
