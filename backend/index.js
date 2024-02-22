import searchAmazon from './amazon.js';
import cors from 'cors';
import express from 'express';
const app = express();
app.use(cors());
app.use(express.json());


app.post('/fetchResult', (req, res) => {
    const word = req.body.word
    console.log(word);
    searchAmazon(word).then((data) => {
        const amazonData = data;
        console.log(amazonData);
        res.send(amazonData);
    });
    // console.log(amazonData, "index.js");
    // res.send(`received ${word} `)
})

app.get('/', (req, res) => {
    res.send('Hello World')
})


app.listen(8000, () => { console.log('Server is running on 8000') });