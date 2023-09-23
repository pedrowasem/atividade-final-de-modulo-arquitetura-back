import { DataSource } from 'typeorm';
import { appEnvs, postgresEnvs } from '../../app/envs';
import { NoteEntity } from '../../app/shared/database/entities/note.entity';
import { UserEntity } from '../../app/shared/database/entities/user.entity';

const isProduction = appEnvs.ambiente?.toLocaleLowerCase() === 'production';
const rootDir = isProduction ? 'dist' : 'src';

export const typeorm = new DataSource({
	type: 'postgres',
	url: postgresEnvs.url,
	synchronize: false,
	logging: false,
	ssl: {
		rejectUnauthorized: false,
	},
	entities: [UserEntity, NoteEntity],
	migrations: [rootDir + '/app/shared/database/migrations/**/*'],
});
