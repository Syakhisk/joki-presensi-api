const prisma = require("./prisma");
let currentDate = new Date();
currentDate.setHours(currentDate.getHours() + 7);
module.exports = async function ({ nrp, name }) {
	const prismaResponse = await prisma.users.upsert({
		where: { nrp: nrp },
		update: { last_activity: currentDate, usage: { increment: 1 } },
		create: {
			nrp: nrp,
			last_activity: currentDate,
			usage: 1,
			name: name,
		},
	});

	return prismaResponse;
};
