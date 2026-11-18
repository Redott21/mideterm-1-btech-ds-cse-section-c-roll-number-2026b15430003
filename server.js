
const http = require('http');

// Product object
let products = [
    {
        id: 1,
        name: "Wireless Mouse",
        price: 500,
        category: "Electronics"
    }
];

// Create server
const server = http.createServer((req, res) => {

    res.setHeader("Content-Type", "application/json");

    // GET - Show all products
    if (req.method === "GET" && req.url === "/products") {
        res.end(JSON.stringify(products));
    }

    // POST - Add product
    else if (req.method === "POST" && req.url === "/products") {
        let body = "";

        req.on("data", chunk => body += chunk);

        req.on("end", () => {
            let data = JSON.parse(body);

            let newProduct = {
                id: products.length + 1,
                name: data.name,
                price: data.price,
                category: data.category
            };

            products.push(newProduct);

            res.end(JSON.stringify({
                message: "Product Added",
                product: newProduct
            }));
        });
    }

    // PUT - Update product
    else if (req.method === "PUT" && req.url === "/products/1") {
        let body = "";

        req.on("data", chunk => body += chunk);

        req.on("end", () => {
            let data = JSON.parse(body);

            products[0].name = data.name;
            products[0].price = data.price;
            products[0].category = data.category;

            res.end(JSON.stringify({
                message: "Product Updated",
                product: products[0]
            }));
        });
    }

    // DELETE - Delete product
    else if (req.method === "DELETE" && req.url === "/products/1") {
        products = products.filter(p => p.id !== 1);

        res.end(JSON.stringify({
            message: "Product Deleted"
        }));
    }

    else {
        res.end(JSON.stringify({
            message: "Route Not Found"
        }));
    }
});

// Start server
server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
