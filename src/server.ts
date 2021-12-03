import { PORT } from './common/config';
import DBConnection from './loaders/ormconfig';

import app from './app';
DBConnection()
  .then((connect) => {
    if (connect.isConnected) {
      console.log('DB is connected');
      app.listen(PORT, () =>
        console.log(`App is running on http://localhost:${PORT}`)
      );
    }
  })
  .catch((err) => {
    console.log(err);
  });
