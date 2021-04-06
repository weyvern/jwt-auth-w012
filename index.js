import express from 'express';
import cookieParser from 'cookie-parser';
import 'dotenv/config.js';
import jwtRouter from './routes/jwtRouter.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(
  express.urlencoded({
    extended: true
  })
);
//Parses cookies from the headers and puts them in req.cookies as an object https://www.npmjs.com/package/cookie-parser
app.use(cookieParser());
app.use('/jwt', jwtRouter);

app.listen(port, () => console.log(`Server running on port: ${port}`));
