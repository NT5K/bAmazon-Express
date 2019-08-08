
//===========================================================================
    // populate departments drop down

// array to populate the department drop down
const departmentsArray = [ "Automotive", "Electronics & Accessories", "Furniture", "Home", "Office & Small Business", 
                          "Lighting & Decor", "Women's Apparel", "Men's Apparel", "Boy's Clothing", "Girl's Clothing", 
                          "Baby", "Pets", "Food and Beverages", "Beauty & Personal Care", "Health & Wellness", 
                          "Household Essentials", "Luggage & Travel", "Sports & Outdoors" ]
// console.log(departmentsArray)

// populate the department drop down with data from departmentsArray
departmentsArray.forEach(data => {
    // console.log(data)
    $("#departmentname").prepend('<option value="' + data + '">' + data + '</option>')
});

//===========================================================================
    // make the table, append it to a div

// pass the tableData function data from ajax query, 
// then pass the function to the div append function
const tableData = (data) => {

    return '<tr>' +
    '<th scope="row">' + data.id + '</th>' +
    '<td>' + data.product_name + '</td>' +
    '<td>' + data.department_name + '</td>' +
    '<td>$' + data.price + '</td>' +
    '<td>' + data.stock_quantity + '</td>' +
    '</tr>'
}
    
//===========================================================================
    // append json to specific div

// display all items table append
const appendToIndexTable = (request) => {
    request.forEach(data => {
        // console.log(data)
        $("#ItemsDiv").append(tableData(data))
    });
}

// less than 20 table append
const appendToLessThan20Table = (request) => {
    request.forEach(data => {
        // console.log(data)
        $("#ItemsDiv2").append(tableData(data))
    });
}

// last column in database append
const appendToLastItemRow = (request) => {
    request.forEach(data => {
        // console.log(data)
        $("#ItemsDiv3").append(tableData(data))
    });
}

const mostRecentItemUpdated = (request) => {
    request.forEach(data => {
        // console.log(data)
        $("#ItemsDiv4").append(tableData(data))
    });
}

//===========================================================================
    // ajax query for json data

// get rest json data from database query's
const currentURL = window.location.origin;

// all products json
$.get(currentURL + "/fromdatabase", (request) => {
    appendToIndexTable(request)
})

// items with less than 20 json
$.get(currentURL + "/fromdatabase20", (request) => {
    appendToLessThan20Table(request)
})

// last row in the database json
$.get(currentURL + "/fromdatabaselastrow", (request) => {
    appendToLastItemRow(request)
})

// most recent updated item json
$.get(currentURL + "/mostrecentitem", (request) => {
    mostRecentItemUpdated(request)
})

//===========================================================================
