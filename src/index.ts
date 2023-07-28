import express from 'express';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(cors({
    credentials: true
}));
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

app.listen(port, () => {
    console.log(`🚀 Server airs on http://localhost:${port}`)
});

app.get('/', (req, res) => {
    res.send('Shot API already on air 🚀')
});