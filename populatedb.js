const async = require("async");
const Product = require("./models/Product");
const Department = require("./models/Department");
const { username, password } = require("./variable");

// setting up mongoose
const mongoose = require("mongoose");
const mongoDB = `mongodb+srv://${username}:${password}@cluster0.gnjp9jg.mongodb.net/inventory_app?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const departments = [];
const products = [];

function createDepartment(name, callback) {
  const department = new Department({ name: name });

  department.save((err) => {
    if (err) {
      callback(err, null);
      return;
    }

    console.log(`New department: ${department}`);
    departments.push(department);
    callback(null, department);
  });
}

function createProduct(
  name,
  description,
  price,
  instock_count,
  department,
  image,
  callback
) {
  productDetail = {
    name,
    description,
    price,
    instock_count,
    department,
    image,
  };

  const product = new Product(productDetail);
  product.save((err) => {
    if (err) {
      callback(err, null);
      return;
    }

    console.log(`New product: ${product}`);
    products.push(product);
    callback(null, product);
  });
}

function departments_creator(callback) {
  async.series(
    [
      function (callback) {
        createDepartment("Men's clothing", callback);
      },
      function (callback) {
        createDepartment("Women's clothing", callback);
      },
      function (callback) {
        createDepartment("Electronics", callback);
      },
      function (callback) {
        createDepartment("Books", callback);
      },
    ],
    callback
  );
}

function products_creator(callback) {
  async.parallel([
    function (callback) {
      createProduct(
        "men's shirt",
        "nice shirt for men to wear in winter",
        9.99,
        3,
        departments[0],
        "/images/mensshirt.jpg",
        callback
      );
    },
    function (callback) {
      createProduct(
        "men's gloves",
        "nice gloves for men to wear in winter",
        9.99,
        6,
        departments[0],
        "/images/mensglove.jpg",
        callback
      );
    },
    function (callback) {
      createProduct(
        "men's vest",
        "nice vest for men to wear in winter",
        9.99,
        2,
        departments[0],
        "/images/mensvest.jpg",
        callback
      );
    },
    function (callback) {
      createProduct(
        "Women's tank",
        "tank for women to wear in summer",
        8.99,
        9,
        departments[1],
        "/images/womenstank.jpg",
        callback
      );
    },
    function (callback) {
      createProduct(
        "Women's hat",
        "hat for women to wear in winter",
        5.99,
        1,
        departments[1],
        "/images/womenshat.jpg",
        callback
      );
    },
    function (callback) {
      createProduct(
        "Women's gloves",
        "gloves for women to wear in winter",
        4.99,
        2,
        departments[1],
        "/images/womensglove.jpg",
        callback
      );
    },
    function (callback) {
      createProduct(
        "cool laptop",
        "great laptop for all your needs",
        500,
        10,
        departments[2],
        "/images/laptop.jpg",
        callback
      );
    },
    function (callback) {
      createProduct(
        "nice headphones",
        "great headphones for all your listening",
        50,
        5,
        departments[2],
        "/images/headphones.jpg",
        callback
      );
    },
    function (callback) {
      createProduct(
        "great speakers",
        "great speakers for all your listening",
        90,
        2,
        departments[2],
        "/images/speakers.jpg",
        callback
      );
    },
    function (callback) {
      createProduct(
        "programming book 0",
        "some programing book to read",
        70,
        12,
        departments[3],
        "/images/book1.jpg",
        callback
      );
    },
    function (callback) {
      createProduct(
        "programming book 1",
        "some programing book to read",
        60,
        13,
        departments[3],
        "/images/book2.jpg",
        callback
      );
    },
    function (callback) {
      createProduct(
        "programming book 2",
        "some programing book to read",
        50,
        16,
        departments[3],
        "/images/book3.jpg",
        callback
      );
    },
  ]);
}

async.series([departments_creator, products_creator], (err, results) => {
  if (err) {
    console.log(`Final Err: ${err}`);
  }

  mongoose.connection.close();
});
