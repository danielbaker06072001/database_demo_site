const express = require('express');

const router = express.Router();

const db = require('../database')

router.post('/createSampleListing/', (req, res) =>{
    console.log(req.body)
    try {
        count = 0
        req.body.map((item, index) => {
            
            db.promise().query(`INSERT INTO Listing VALUES ('${item.LISTING_ID}', '${item.USER_ID}', '${item.ITEM_ID}', '${item.ITEM_COST}');`);
        })
        res.status(201).send({msg: "INSERT_SUCCESSFULLY"})
        
    }catch (err){
        console.log(err);
    }
});


router.post('/createSampleShipment/', (req, res) =>{
    console.log(req.body)
    try {
        count = 0
        req.body.map((item, index) => {
            console.log("count : " , count);
            console.log(`${item.SHIPMENT_ID}', '${item.TRANSACTION_TOTAL_COST}', '${item.SHIPMENT_PRICE}', '${item.SHIPMENT_ADDRESS}`)
            count +=1 ;
            db.promise().query(`INSERT INTO Shipments VALUES ('${item.SHIPMENT_ID}', '${item.TRANSACTION_TOTAL_COST}', '${item.SHIPMENT_PRICE}', '${item.SHIPMENT_ADDRESS}');`);
        })
        res.status(201).send({msg: "INSERT_SUCCESSFULLY"})
        
    }catch (err){
        console.log(err);
    }
});

router.post('/createSampleInventory/', (req, res) =>{
    console.log(req.body)
    try {
        count = 0
        req.body.map((item, index) => {
            
            db.promise().query(`INSERT INTO Inventory VALUES ('${item.ITEM_ID}', '${item.ITEM_NAME}', '${item.ITEM_CATEGORY}', '${item.ITEM_STOCK_QUANTITY}');`);
        })
        res.status(201).send({msg: "INSERT_SUCCESSFULLY"})
        
    }catch (err){
        console.log(err);
    }
});

router.post('/createSampleTransaction/', (req, res) =>{
    console.log(req.body)
    try {
        count = 0
        req.body.map((item, index) => {
            db.promise().query(`INSERT INTO Transaction VALUES ('${item.TRANSACTION_ID}', '${item.BUYER_ID}', '${item.TRANS_COST}', '${item.LISTING_ID}', '${item.ITEM_QUANTITY}');`);
        })
        res.status(201).send({msg: "INSERT_SUCCESSFULLY"})
        
    }catch (err){
        console.log(err);
    }
});

router.post('/createSampleUser/', (req, res) =>{
    console.log(req.body)
    try {
        count = 0
        req.body.map((item, index) => {
            console.log(`${item.USER_ID}', '${item.USER_LNAME}', '${item.USER_FNAME}', '${item.USER_EMAIL}, '${item.USER_DOB}', '${item.USER_ADDRESS}', '${item.USER_ZIPCODE}'`)
            db.promise().query(`INSERT INTO Users VALUES ('${item.USER_ID}', '${item.USER_LNAME}', '${item.USER_FNAME}','${item.USER_EMAIL}', '${item.USER_DOB}', '${item.USER_ADDRESS}', '${item.USER_ZIPCODE}');`);
        })
        res.status(201).send({msg: "INSERT_SUCCESSFULLY"})
        
    }catch (err){
        console.log(err);
    }
});

// API to get the item in db
router.get('/getInventoryItems', async function(req, res)  { 
    console.log(req.body)
    try { 
        const result = await(db.promise().query(`SELECT Listing.LISTING_ID, USER_FNAME, Inventory.*, Listing.ITEM_COST, (SELECT COUNT(*) FROM Transaction WHERE Listing.LISTING_ID = Transaction.LISTING_ID AND BUYER_ID = 3) > 0 AS CART_ADDED
        FROM brynikglqwpbdrnw1eak.Listing LEFT JOIN brynikglqwpbdrnw1eak.Inventory
        ON brynikglqwpbdrnw1eak.Listing.ITEM_ID = brynikglqwpbdrnw1eak.Inventory.ITEM_ID 
        LEFT JOIN brynikglqwpbdrnw1eak.Users
         ON brynikglqwpbdrnw1eak.Users.USER_ID = brynikglqwpbdrnw1eak.Listing.USER_ID;`))
        console.log(result)
        res.status(200).send({msg: result[0]})
    }
    catch (err){ 
        console.log(err);
    }
});

router.get('/getSearchInventoryItems', async function (req, res) { 
    console.log(req.query)
    try{
        const result = await(db.promise().query(`SELECT Listing.LISTING_ID, USER_FNAME, Inventory.*, Listing.ITEM_COST, (SELECT COUNT(*) FROM Transaction WHERE Listing.LISTING_ID = Transaction.LISTING_ID AND BUYER_ID = 3 ) > 0 AS CART_ADDED
        FROM brynikglqwpbdrnw1eak.Listing LEFT JOIN brynikglqwpbdrnw1eak.Inventory
        ON brynikglqwpbdrnw1eak.Listing.ITEM_ID = brynikglqwpbdrnw1eak.Inventory.ITEM_ID 
        LEFT JOIN brynikglqwpbdrnw1eak.Users
         ON brynikglqwpbdrnw1eak.Users.USER_ID = brynikglqwpbdrnw1eak.Listing.USER_ID
        WHERE ITEM_NAME LIKE "%${req.query.ITEM_NAME}%"; `))
        console.log(result)
        res.status(200).send({msg : result[0]})
    }catch(err){ 
        console.log(err)
    }
});


router.get("/getCartItems" , async function (req,res) {
    try {
        //const result = await(db.promise().query(`SELECT * FROM Listing LEFT JOIN brynikglqwpbdrnw1eak.Inventory ON Inventory.ITEM_ID = Listing.ITEM_ID LEFT JOIN brynikglqwpbdrnw1eak.Transaction ON Transaction.LISTING_ID = Listing.LISTING_ID`))
        const result  = await(db.promise().query(`SELECT TRANSACTION_ID, BUYER_ID, TRANS_COST, Listing.LISTING_ID, ITEM_QUANTITY,ITEM_COST, ITEM_NAME, ITEM_CATEGORY, USER_FNAME, Inventory.ITEM_STOCK
            FROM Transaction LEFT JOIN Listing ON Transaction.LISTING_ID = Listing.LISTING_ID 
            LEFT JOIN Inventory ON Listing.ITEM_ID = Inventory.ITEM_ID 
            LEFT JOIN Users ON Listing.USER_ID = Users.USER_ID
            WHERE BUYER_ID = 3;`));
        console.log(result);
        res.status(200).send({msg: result[0]})
    }catch (err) { 
        console.log(err)
    }
});

// GET SHIPMENT THAT ALREADY SHIPPED
router.get("/getShipmentsInfo", async function(req, res) {
    try{
        const result = await(db.promise().query(`SELECT BUYER_ID, ITEM_CATEGORY, ITEM_NAME,
        TRANS_COST, SHIPMENT_PRICE, USER_FNAME, SHIPMENT_ADDRESS, Shipments.SHIPMENT_ID,
        ITEM_COST, DELIVERY_DATE FROM Shipments
        LEFT JOIN brynikglqwpbdrnw1eak.Transaction ON Transaction.SHIPMENT_ID = Shipments.SHIPMENT_ID
        LEFT JOIN brynikglqwpbdrnw1eak.Listing ON Transaction.LISTING_ID = Listing.LISTING_ID	
        LEFT JOIN brynikglqwpbdrnw1eak.Inventory ON Listing.ITEM_ID = Inventory.ITEM_ID
        LEFT JOIN Users ON Listing.USER_ID = Users.USER_ID
        WHERE Transaction.SHIPMENT_ID IS NOT NULL AND BUYER_ID = 3;`));
        console.log(result)
        res.status(200).send({msg: result[0]});
    }catch(err){
        console.log(err)
    }
});

// GET SHIPMENT THAT's NOT SHIPPED
router.get("/getShipmentsInProgess", async function(req, res) {
    try{
        const result = await(db.promise().query(`SELECT TRANSACTION_ID, BUYER_ID, TRANS_COST, Listing.LISTING_ID, ITEM_QUANTITY,ITEM_COST, ITEM_NAME, ITEM_CATEGORY, USER_FNAME , ITEM_STOCK
        FROM Transaction LEFT JOIN Listing ON Transaction.LISTING_ID = Listing.LISTING_ID 
        LEFT JOIN Inventory ON Listing.ITEM_ID = Inventory.ITEM_ID 
        LEFT JOIN Users ON Listing.USER_ID = Users.USER_ID
        WHERE BUYER_ID = 3 and SHIPMENT_ID IS NULL;`));
        console.log(result)
        res.status(200).send({msg: result[0]});
    }catch(err){
        console.log(err)
    }
});

router.post("/addedToCart", (req, res) => { 
    console.log(req.body.LISTING_ID)
    try{
        db.promise().query(`INSERT INTO brynikglqwpbdrnw1eak.Transaction ( BUYER_ID, TRANS_COST, LISTING_ID, ITEM_QUANTITY) 
        VALUES (3, (SELECT ITEM_COST FROM brynikglqwpbdrnw1eak.Listing WHERE LISTING_ID = ${req.body.LISTING_ID})*0.1, ${req.body.LISTING_ID}, 1)`)
        res.status(201).send(JSON.stringify({msg: "INSERTED"}))
    }catch(err) { 
        console.log(err)
    }
})

module.exports = router;
