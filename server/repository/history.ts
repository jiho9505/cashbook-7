import db from "../database/database";

const historyRepo = {
	// findAll: async () => {
	// 	const query = `SELECT location.pk, location.name FROM api_server.location;`;

	// 	return await selectQueryExecutor(query);
	// },

	// findOne: async (name) => {
	// 	const query = `SELECT location.pk, location.name FROM api_server.location where name='${name}';`;

	// 	return await selectQueryExecutor(query);
	// },

	create: async () => {
		const data = await main()
                            .catch((e) => {
                            throw e
                            })
                            .finally(async () => {
                            await db.$disconnect()
                            })

        console.log(data)
		return data;
	},
};

export { historyRepo };





async function main() {
    await db.user.create({
        data: {
          name: 'Aliace',
          email: 'aaexxzx@pr.iao',
          posts: {
            create: { title: 'Hello World' },
          },
          profile: {
            create: { bio: 'I like turtles' },
          },
        },
      })
    
      const allUsers = await db.user.findMany({
        include: {
          posts: true,
          profile: true,
        },
      })

      return allUsers;
      
}
