const path = require('path');

module.exports = (app) => {
    app.get('/', (__, res) => {
        console.log('This is the homepage\n')
        res.sendFile(path.join(__dirname, '/../public/html/index.html'))
    });

    app.get('/20ItemsOrLess', (__, res) => {
        console.log('items with 20 units or less\n')
        res.sendFile(path.join(__dirname, '/../public/html/20ItemsOrLess.html'))
    });
    app.get('/newItem', (__, res) => {
        console.log('add a new item page\n')
        res.sendFile(path.join(__dirname, '/../public/html/newItem.html'))
    });
    app.get('/addUnits', (__, res) => {
        console.log('add units to a item\n')
        res.sendFile(path.join(__dirname, '/../public/html/addUnits.html'))
    });
    app.get('/newitemsuccess', (__, res) => {
        console.log('new item added success page\n')
        res.sendFile(path.join(__dirname, '/../public/html/newItemSuccess.html'))
    });
    app.get('/addedinventorysuccess', (__, res) => {
        console.log('added inventory success page\n')
        res.sendFile(path.join(__dirname, '/../public/html/addedinventorysuccess.html'))
    });
    
};