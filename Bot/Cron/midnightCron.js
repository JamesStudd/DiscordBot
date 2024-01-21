const cron = require("node-cron");

function MidnightCron(client) {
	cron.schedule("0 0 * * *", () => {
		RunMidnightTasks(client);
	});
}

function RunMidnightTasks(client) {

}

module.exports = {
	MidnightCron,
};
