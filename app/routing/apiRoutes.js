const connection = require("./../public/javascript/connection")


module.exports = (app) => {

//===========================================================================
    // select all products from table

    app.get('/fromdatabase', (__, res) => {

        const query = "Select * FROM products";

        // query the products database
        connection.query(query, function (err, result) {

            if (err) {
                console.log(err);
                res.json({ "error": true });
            }
            else {
                // console.log("results displayed at /fromdatabase");
                res.json(result);
            }

        });

    });

//===========================================================================
    // select all products with stock quantity less than 20 units
    
    app.get('/fromdatabase20', (__, res) => {

        const query = "Select * FROM products WHERE stock_quantity <= 20";

        // query the products database
        connection.query(query, (err, result) => {

            if (err) {
                console.log(err);
                res.json({ "error": true });
            }
            else {
                // console.log("results displayed at /fromdatabase20");
                res.json(result);
            }

        });

    });

//===========================================================================
    // get new item, redirect with success page

    app.get('/posttodatabase/:name/:department/:price/:quantity', (request, result) => {
        
        // query for inserting new row into database
        const insert = "INSERT INTO products SET ?"

        // object of parameters to pass as the get request
        const params = request.params
        const items = [
            {
                product_name: params.name,
                department_name: params.department,
                price: params.price,
                stock_quantity: params.quantity
            }
        ]

        // query the database
        connection.query(insert, items, (err, __) => {

            // catch error
            if (err) {
                throw err
            };

        })
        
        result.redirect("/newItemSuccess");

    })

//===========================================================================
    // post new item to the database

    // post the form inputs to database
    app.post('/posttodatabase', (request, response) => {

        // variables from "name" of each input, need to pass a string over the wire
        const body = request.body
        const product = String(body.productname)
        const department = String(body.departmentname)
        const price = String(body.inputprice)
        const quantity = String(body.productquantity)
        // console.log(product, department, price, quantity)
        
        // redirect to the post new item to the database route
        response.redirect('/posttodatabase/' + product + '/' + department + '/' + price + '/' +  quantity)

    })

//===========================================================================
    // get the last row in the database 

    app.get('/fromdatabaselastrow', (__, res) => {
        const lastRow = "SELECT * FROM products ORDER BY id DESC LIMIT 1;";
        // query the products database
        connection.query(lastRow, (err, result) => {
            if (err) {
                console.log(err);
                res.json({ "error": true });
            }
            else {
                // console.log("results displayed at /fromdatabaselastrow");
                res.json(result);
            }
        });
    });

//===========================================================================
    // update a products quantity by id

    app.get('/addquantity/:id/:quantity', (request, result) => {

        const params = request.params

        //itemId to pass to the query
        const itemId = params.id

        // quantity to pass to the second query
        const quantity = params.quantity

        // console.log(itemId, quantity, "these are the params")

        // first we grab the input id# column so we can use the stock_quantity from that column
        const columnQuery = "SELECT * FROM products WHERE id = ?"

        // first query to get the column
        connection.query(columnQuery, [itemId], (err, res) => { 
            // catch any errors
            if (err) {
                throw err
            }
            // console.log(res, "this is the result")

            //stock_quantity from first connection.query is the first ?
            const updateQuery = "UPDATE products SET ? WHERE ?"

            // updateQuantity variable is for adding together the quantity is the second ?
            const updateQuantity = res[0].stock_quantity + parseFloat(quantity);

            // array to pass to the second query
            const updateObject = [
                {
                    stock_quantity: updateQuantity
                },
                {
                    id: itemId
                }
            ]

            // second query for adding the input quantity to the table
            connection.query(updateQuery, updateObject, (err) => {

                // catch any errors
                if (err) {

                    throw err

                };

            })

        })
        
        //redirect to the success page
        result.redirect('/addedinventorysuccess')
        // result.json(request.params)

    })

//===========================================================================
    // get form data and pass it to the addquantity get request

    app.post('/addquantity', (req, res) => {

        // variables from the form as strings
        const id = String(req.body.productid)
        const quantity = String(req.body.productquantity)

        // console.log(id, quantity, "inputs")

        // redirect the form inputs to the /addquantity get request
        res.redirect('/addquantity/' + id + '/' + quantity)

    })

//===========================================================================
    // most recent updated column


    app.get('/mostrecentitem', (request, result) => {

        const query = "SELECT * FROM products ORDER BY createdAt desc LIMIT 1"

        connection.query(query, (err, res) => {

            if (err) {
                console.log(err);
                res.json({ "error": true });
            }
            else {
                // console.log("results displayed at /fromdatabase");
                result.json(res);
            }

        })

    })       

}

