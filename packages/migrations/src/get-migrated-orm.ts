import { getCampaignOrm, getMainOrm, ORM } from './db-configs';

export const getMigratedCampaignORM = async (campaignDbPath: string) => {
	const orm = await getCampaignOrm(campaignDbPath);
	return await migrate(orm);
};

export const getMigratedMainORM = async (production: boolean, dbPath: string) => {
	const orm = await getMainOrm(production, dbPath);
	return await migrate(orm);
};

const migrate = async (orm: ORM) => {
	try {
		const migrator = orm.getMigrator();
		await migrator.up();
	} catch (e) {
		console.error(`Error migrating database ${orm.config.get('dbName')}`, e);
	}
	return orm;
};
