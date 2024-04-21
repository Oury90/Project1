import express, { response } from "express";
import bodyParser from "body-parser";
import axios from "axios";


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded ({ extended: true}));
app.use(express.static( 'public'));


app.get("/", async(req, res) =>{
    try {
        const response = await axios.get("https://bored-api.appbrewery.com/random");
        const dataRandom = response.data;
        res.render("index.ejs", { dataEl: dataRandom})
    } catch (error) {
        console.error("This data is not found", error.message)
    }
})

app.post("/post", async(req, res) =>{
    try {
        const nameEducation = req.body.education;
        const number = req.body.number;
        
        const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${nameEducation}&participants=${number}`);
        const numData = response.data.length;
        const randomData = Math.floor(Math.random(response.data) * numData);
        const datas = response.data[randomData];
        // console.log(response.data[randomData]);
        res.render("index.ejs", {dataEl : datas})
    } catch (error) {
        console.error("Message not found", error.message);
        res.render("index.ejs", {error : "Not activities to found"})
    }
})

app.listen(port, ()=>{
    console.log(`This server is running on port ${port}`);
})