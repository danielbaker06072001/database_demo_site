const mysql = require('mysql2');

/*module.exports = mysql.createConnection({
    host : 'brynikglqwpbdrnw1eak-mysql.services.clever-cloud.com',
    user: 'u6fnkpqowy4jrcly',
    password : 'CeIXTM6WjPOFDrK8A5z2',
    database : 'brynikglqwpbdrnw1eak',
});

var connect = function() { 
    connection.connect(function(err){
        if(!err) { 
            console.log("Database is connected!")
        }
        else { 
            console.log("Database is not connected!")
        }
    })
};*/

module.exports = mysql.createPool({
    host : 'brynikglqwpbdrnw1eak-mysql.services.clever-cloud.com',
    user: 'u6fnkpqowy4jrcly',
    password : 'CeIXTM6WjPOFDrK8A5z2',
    database : 'brynikglqwpbdrnw1eak',
});
