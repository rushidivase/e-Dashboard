const express = require('express');
const cors = require("cors");

require('./db/config')
const User = require("./db/User");
const Product = require('./db/Product');

const Jwt = require('jsonwebtoken');//jwt
const jwtKey = 'e-com'; //jwt

const app = express();

app.use(express.json());
app.use(cors());


app.post("/register", async (req, resp) => {
    let user = new User(req.body)
    let result = await user.save();
    resp.send(result);
})

app.post("/login", async (req, resp) => {

    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.send({ result: "Something Went wrong, Please try after some time..!" })
                }
                resp.send({ user, auth: token })
            })
        }
        else {
            resp.send({ result: "Not Found" })
        }
    }
    else {
        resp.send({ result1: "Not Found" })
    }

});

app.post("/add-product", verifyToken, async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

app.get('/products', verifyToken, async (req, resp) => {
    let products = await Product.find();
    if (products.length > 0) {
        resp.send(products);
    }
    else {
        resp.send({ result: "No Products Found.." })
    }
});

app.delete("/products/:id", verifyToken, async (req, resp) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);
})

app.get("/product/:id", verifyToken, async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result);
    }
    else {
        resp.send({ result: "No Record Found..!" });
    }
});

app.put("/product/:id", verifyToken, async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result);
});

app.get("/search/:key", verifyToken, async (req, resp) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }

        ]
    });
    resp.send(result);
});

function verifyToken(req, resp, next) {
    let token = req.headers['authorization'];
    //  console.warn("Middleware Called..!", token);
    if (token) {
        token = token.split(' ')[1];
        // console.warn("middleware called if", token);
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                resp.status(401).send({ result: "Please Provide Valid Token...!" })
            }
            else {
                next();
            }
        })
    }
    else {
        resp.status(403).send({ result: "Please Add token with header...!" })
    }

}
app.listen(5000);