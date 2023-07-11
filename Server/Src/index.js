import express from 'express';
import { exec } from 'child_process';
import { gameRouter } from './modules/routes/game.routes.js';
import { userRouter } from './modules/routes/user.routes.js';
import { verifyToken } from './modules/middleware/auth.js';

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Routes
app.use('/game', verifyToken, gameRouter);
app.use('/user', userRouter);

// Start the migration process
const migrateDatabase = () => {
    return new Promise((resolve, reject) => {
        const migrationCommand = 'npx sequelize-cli db:migrate';

        exec(migrationCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Migration failed: ${error.message}`);
                reject(error);
            } else {
                console.log('Migration completed successfully');
                resolve();
            }
        });
    });
};

// Start the seeder process
const seedDatabase = () => {
    return new Promise((resolve, reject) => {
        const seederCommand = 'npx sequelize-cli db:seed:all';

        exec(seederCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Seeder failed: ${error.message}`);
                reject(error);
            } else {
                console.log('Seeder completed successfully');
                resolve();
            }
        });
    });
};

// Start the server after running the migration and seeder
const startServer = async () => {
    try {
        await migrateDatabase();
        await seedDatabase();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start the server', error);
    }
};

startServer();
