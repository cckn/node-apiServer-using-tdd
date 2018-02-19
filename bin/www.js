const app = require('../index');
const syncDb = require('./sync-db.js');

syncDb().then(() => {
    console.log("Sync DB");
    
    const port = 3000;
    app.listen(port, () => {
        console.log(`Server Started :: port - ${port}`);
    });
});
