import express from 'express';
import path from 'path';
import * as config from './config';

// TypeORM imports
import 'reflect-metadata';
import { createConnection } from 'typeorm';

// Router imports
import { apiRouter } from './routes/api-router';
import { pagesRouter } from './routes/pages-router';
import { staticsRouter } from './routes/statics-router';

// Connect to Database
createConnection(config.DB_CONFIG)
  .then(connection => {
    // Instantiate the server if DB connection is successful
    console.log(`*******************************************`);
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`config: ${JSON.stringify(config, null, 2)}`);
    console.log(`*******************************************`);

    const app = express();
    app.set('view engine', 'ejs');
    app.use('/assets', express.static(path.join(process.cwd(), 'assets')));
    app.use(apiRouter());
    app.use(staticsRouter());
    app.use(pagesRouter());

    app.listen(config.SERVER_PORT, () => {
      console.log(`App listening on port ${config.SERVER_PORT}!`);
    });
  })
  .catch(error => console.log(error));
