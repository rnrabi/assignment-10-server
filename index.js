const express = require('express');
const cors = require('cors')
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;


// middleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_pass}@cluster0.rjjtc94.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const craftCollection = client.db('painting').collection('craft');
        const categoryHeadingCollection = client.db('painting').collection('category-heading');
        const categoriesCollection = client.db('painting').collection('categories');



        app.get('/craft', async (req, res) => {
            const result = await craftCollection.find().toArray();
            res.send(result);
        })

        app.get('/myArtCrftItem/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await craftCollection.findOne(query);
            res.send(result);
        })

        app.get('/craft/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const result = await craftCollection.find(query).toArray()
            res.send(result)
        })

        app.get('/categoriesHeading' , async(req , res)=>{
            const result = await categoryHeadingCollection.find().toArray();
            res.send(result)
        })

        app.get('/subcategories/:subcategory' , async(req , res)=>{
            const subcategory = req.params.subcategory;
            const query = {subcategory_name : subcategory};
            const result = await categoriesCollection.find(query).toArray();
            res.send(result)
        })

        app.get('/subcategories/subcategory/:id' , async(req , res)=>{
            const id = req.params.id;
            // console.log(id)
            const query = {_id : new ObjectId(id)};
            const result = await categoriesCollection.findOne(query);
            res.send(result)
        })



        app.post('/craft', async (req, res) => {
            const addCraft = req.body;
            // console.log(addCraft);
            const result = await craftCollection.insertOne(addCraft);
            res.send(result)
        })

        app.put('/myArtCrftItem/:id', async (req, res) => {
            const updateInfo = req.body;
            // console.log(updateInfo)
            const id = req.params.id;
            // console.log(id)
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                  image:updateInfo.image,
                  item:updateInfo.item,
                  email:updateInfo.email,
                  name:updateInfo.name,
                  stock:updateInfo.stock,
                  time:updateInfo.time,
                  description:updateInfo.description,
                  customization:updateInfo.customization,
                  ratting:updateInfo.ratting,
                  price:updateInfo.price

                },
              };
              const result = await craftCollection.updateOne(filter, updateDoc, options);
              res.send(result);
        })

        app.delete('/myArtCrftItem/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id : new ObjectId(id)}
            const result = await craftCollection.deleteOne(query);
            res.send(result)
        })



        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);









app.get('/', (req, res) => {
    res.send('assaignment 10 server is opening')
})
app.listen(port, () => {
    console.log('post is running in', port)
})