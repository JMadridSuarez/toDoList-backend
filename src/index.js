const express = require('express');
const cors = require('cors');
const todoappRoutes = require('./V1/routes/todoappRoutes');
const app = express();
const PORT = process.env.DB_PORT ?? 8000;

//app listen
app.listen(PORT, ()=>{
    console.log(`Connection on port: ${PORT}`);
})
//

//app users
app.use(cors());
app.use(express.json());
app.use("/api/v1",todoappRoutes);
//
