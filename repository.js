/******************************************************************
 *
 * [Description]
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE 
 * OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 * @file	:   .js
 * @author  :   Rick Kock
 * @version	:	V1.0
 *
 ******************************************************************/

const {graphqlExpress, graphiqlExpress} = require('apollo-server-express')
const {makeExecutableSchema} = require('graphql-tools')
const bodyParser = require('body-parser')
const express = require('express') 
var cors = require('cors') 
const MongoClient = require('mongodb').MongoClient
var ObjectID = require("bson-objectid")
const assert = require('assert')
var bcrypt = require('bcrypt');

// --------------------------------------------------------
var corsOptions = {origin: 'http://localhost:5100'}
var app = express()
var port = process.env.API_PORT || 3001
app.use(cors(corsOptions))
const MONGO_URL = 'mongodb://rick127:tempPassFor_plan5!@ds113915.mlab.com:13915/db_temp'
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json()) // Changed
const saltRounds = 10 //
// --------------------------------------------------------
const typeDefs = `
    type User {
        _id: ID!
        email: String!
        password: String!
        remember: Boolean
        type: String
    }

    type Product {
        name: String
        category: String
        description: String
        price: Float
        isOffer: Boolean
    }

    type UserInfo {
        user: User
        address: String
    }

    type Query {
        getUser(_id: ID): User
        allUsers : [User]
        userInfo(_id: ID) : UserInfo
        allCategories : [Category]
        allProducts : [Product]
    } 

    type Category {
        _id: ID
        parent: String
        category: String
    }

    type Cart {
        _id: ID
        productId: ID
        userId: ID
        amount: Int
    }

    type Mutation {
        login(email: String, password: String): User
        signUp(email: String, password: String): User
        createCategory(category: String!, parent: ID): Category
        createProduct(name: String!, category: String, description: String, price: Float, isOffer: Boolean): Product
        searchProduct(input: String): [Product]
        filterProduct(input: String): [Product]
        filterCart(input: String): [Cart]
    }

`

// --------------------------------------------------------

/**
 * Retreives all documents contained in a mongodb collection. ddd
 * 
 * @param {String} collection The name of the collection to retrieve data from. 
 */
function getAllDocuments(collection) {
    return new Promise((resolve, reject) => {
        collection.find({}).toArray(function(err, data) {
            assert.equal(err, null);
            resolve(data)
        })
    }).then((data) => { return data })
}

/**
 * Retreive a document contained in a mongodb collection.
 * 
 * @param {Int} id The id of the document to retreive.
 * @param {Object} collection The name of the collection to retrieve data from. 
 */
function getDocument(collection, prop) {
    return new Promise((resolve, reject) => {
        collection.findOne(prop, function(err, data) {
            assert.equal(err, null);
            resolve(data)
            console.log(data)
        })
    }).then((data) => { return data })
}

function getDocuments(collection, prop) {
    return new Promise((resolve, reject) => {
        collection.find(prop).toArray(function(err, data) {
            assert.equal(err, null);
            resolve(data)
            console.log(data)
        })
    }).then((data) => { return data })
}

function insertDocument(collection, prop) {
    return new Promise((resolve, reject) => {
        collection.insertOne(prop, function(err, data) {
            assert.equal(err, null);
            resolve(data)
        })
    }).then((data) => { return data.ops[0]})
}

/**
 * Retreive a document contained in a mongodb collection.
 * 
 * @param {Int} id The id of the document to retreive.
 * @param {Object} collection The name of the collection to retrieve data from. 
 */
function authenticateUser(collection, prop) {
    return new Promise((resolve, reject) => {
        // Check to see if passwords match
        collection.findOne({email: prop.email}, function(err, data) {
            assert.equal(err, null)
            bcrypt.compare(prop.password, data.password, function(err, res) {
                if (res == true) {
                    resolve(data)
                } else {
                    resolve(null)
                }
            })
        })
    }).then((data) => { return data})
}

function registerUser(collection, prop) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(prop.password, saltRounds, function(err, hash) {
            prop.password = hash
            collection.insertOne(prop, function(err, data) {
                assert.equal(err, null);
                resolve(data)
            })
        })
    }).then((data) => { return data.ops[0]})
}

// --------------------------------------------------------

MongoClient.connect(MONGO_URL,  (err, mLab) => {
    try {
        const db = mLab.db('db_temp')
        const users =  db.collection('users')
        const categories =  db.collection('categories')
        const products =  db.collection('products')

        const resolvers = {
            // --------------------------------------------------------
            Query: {
                allUsers: () => {
                    return getAllDocuments(users)
                },
                allCategories: () => {
                    return getAllDocuments(categories)
                },
                allProducts: () => {
                    console.log("Hello world!")
                    return getAllDocuments(products)
                },
                userInfo: (_, cred) => {
                    let id = ObjectID(cred._id)
                    let user = getDocument(users, {_id: id})
                    // TODO: Create documents and forms to create user info
                    const obj = {user: user, address: "Abel tasmanstraat"}
                    console.log(obj)
                    return obj
                },
                getUser: (_, cred) => {
                    let id = ObjectID(cred._id)
                    let user = getDocument(users, {_id: id})
                    return user
                }
            },
            // --------------------------------------------------------
            Mutation: {
                login: (_, cred) => {
                    console.log(cred)
                    return authenticateUser(users, cred)
                },
                signUp: (_, cred) => {
                    console.log(cred)
                    return registerUser(users, cred)
                },
                createCategory: (_, cred) => {
                    if (cred.parent === "null") {
                        cred.parent = null
                    }
                    return insertDocument(categories, cred)
                },
                createProduct: (_, cred) => {
                    console.log(cred)
                    return insertDocument(products, cred)
                },
                searchProduct: (_, cred) => {
                    console.log(cred)
                    let input = {}
                    if (cred.input !== '') {
                       input = {name: cred.input}
                    }
                    return getDocuments(products, input)
                },
                filterProduct: (_, cred) => {
                    console.log(cred)
                    let input = {}
                    if (cred.input !== '') {
                       input = {category: cred.input}
                    }
                    return getDocuments(products, input)
                },
                filterCart: (_, cred) => {
                    console.log(cred)                 
                }
            }
        }

        const schema = makeExecutableSchema({typeDefs, resolvers});
        app.use('/graphql', bodyParser.json(), graphqlExpress({
            schema,
        }))
        /* This server assumes you have a mongodb collection in mLab named
         * 'users' with documents containing properties: email and password.
         * Test the query by pasting the following code and running:
          
          {
            allUsers {
                email
                password
            }
         }

         * in http://localhost:3001/graphiql
         */
        app.use('/graphiql', graphiqlExpress({
            endpointURL: '/graphql',
        }))
        app.listen(port, () => {
            console.log("Connected successfully")
        })
    } catch (e) {
        console.log(e)
    }
})