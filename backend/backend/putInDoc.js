// GET ITEMS IN DATABASE TO DISPLAY THE HOME PAGE (ALL ITEMS) 
`SELECT Listing.LISTING_ID, USER_FNAME, Inventory.*, Listing.ITEM_COST, (SELECT COUNT(*) FROM Transaction WHERE Listing.LISTING_ID = Transaction.LISTING_ID AND BUYER_ID = 3) > 0 AS CART_ADDED
FROM brynikglqwpbdrnw1eak.Listing LEFT JOIN brynikglqwpbdrnw1eak.Inventory
ON brynikglqwpbdrnw1eak.Listing.ITEM_ID = brynikglqwpbdrnw1eak.Inventory.ITEM_ID 
LEFT JOIN brynikglqwpbdrnw1eak.Users
 ON brynikglqwpbdrnw1eak.Users.USER_ID = brynikglqwpbdrnw1eak.Listing.USER_ID;`

// GET ITEMS IN DATABASE THROUGH SEARCH, EX : type "Mo" then return item has name like that
`SELECT Listing.LISTING_ID, USER_FNAME, Inventory.*, Listing.ITEM_COST, (SELECT COUNT(*) FROM Transaction WHERE Listing.LISTING_ID = Transaction.LISTING_ID AND BUYER_ID = 3 ) > 0 AS CART_ADDED
FROM brynikglqwpbdrnw1eak.Listing LEFT JOIN brynikglqwpbdrnw1eak.Inventory
ON brynikglqwpbdrnw1eak.Listing.ITEM_ID = brynikglqwpbdrnw1eak.Inventory.ITEM_ID 
LEFT JOIN brynikglqwpbdrnw1eak.Users
 ON brynikglqwpbdrnw1eak.Users.USER_ID = brynikglqwpbdrnw1eak.Listing.USER_ID
WHERE ITEM_NAME LIKE "%Mo%";`

// Get the items that's in cart (added items), in this case the buyer has ID of 3
`SELECT TRANSACTION_ID, BUYER_ID, TRANS_COST, Listing.LISTING_ID, ITEM_QUANTITY,ITEM_COST, ITEM_NAME, ITEM_CATEGORY, USER_FNAME
            FROM Transaction LEFT JOIN Listing ON Transaction.LISTING_ID = Listing.LISTING_ID 
            LEFT JOIN Inventory ON Listing.ITEM_ID = Inventory.ITEM_ID 
            LEFT JOIN Users ON Listing.USER_ID = Users.USER_ID
            WHERE BUYER_ID = 3  ;`

// GET ORDERS THAT'S HAS BEEN SHIPPED
`SELECT * FROM Shipments LEFT JOIN brynikglqwpbdrnw1eak.Transaction ON Transaction.SHIPMENT_ID = Shipments.SHIPMENT_ID
        LEFT JOIN brynikglqwpbdrnw1eak.Listing ON Transaction.LISTING_ID = Listing.LISTING_ID	
        LEFT JOIN brynikglqwpbdrnw1eak.Inventory ON Listing.ITEM_ID = Inventory.ITEM_ID
        WHERE Transaction.SHIPMENT_ID IS NOT NULL AND BUYER_ID = 3;`

// GET ORDERS THAT'S HAD NOT BEEN SHIPPED, WAITING TO BE PAID
`SELECT TRANSACTION_ID, BUYER_ID, TRANS_COST, Listing.LISTING_ID, ITEM_QUANTITY,ITEM_COST, ITEM_NAME, ITEM_CATEGORY, USER_FNAME , ITEM_STOCK
        FROM Transaction LEFT JOIN Listing ON Transaction.LISTING_ID = Listing.LISTING_ID 
        LEFT JOIN Inventory ON Listing.ITEM_ID = Inventory.ITEM_ID 
        LEFT JOIN Users ON Listing.USER_ID = Users.USER_ID
        WHERE BUYER_ID = 3 and SHIPMENT_ID IS NULL;`

// ADD ITEM INTO CART 
`INSERT INTO brynikglqwpbdrnw1eak.Transaction ( BUYER_ID, TRANS_COST, LISTING_ID, ITEM_QUANTITY) 
        VALUES (3, (SELECT ITEM_COST FROM brynikglqwpbdrnw1eak.Listing WHERE LISTING_ID = LISTING_ID)*0.1,LISTING_ID, 1)`