require('dotenv').config(); // Add this line at the top
//import
const express = require('express');
const userRouter = require('./routers/userRouter');
const sitemapRouter = require('./routers/siteMapRouter');
const feedbackRouter = require('./routers/feedbackRouter');
const cors = require('cors');

//initialize  the app and set it to run on port 
const app = express();
const port = 5500;

app.use(cors({
    origin: '*'
}))  //always at first

app.use(express.json());   //parse incoming requests of content type - application


app.use('/user', userRouter);
app.use('/sitemap', sitemapRouter);
app.use('/feedback', feedbackRouter);

app.use(express.static('./output'))

app.listen(port, () => {
    console.log('server started!!');
})