#! /usr/bin/env node
require("dotenv").config();

const { Client } = require("pg");

async function getItems() {
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();
  
    const items = data.products.map(product => ({
      title: product.title,
      category: product.category.charAt(0).toUpperCase() + product.category.slice(1).toLowerCase(),
      stock: product.stock,
      brand: product.brand||'',
      img: product.images[0],
    }));
  
    return items;
  }



async function stringifyItems() {
const items = await getItems();


const valuesArray = items.map(item => {
    const data = Object.values(item).map(val =>
      typeof val === 'string' ? `'${val.replace(/'/g, "''")}'` : val
    );
    return `(${data.join(',')})`;
  });

  return valuesArray.join(',\n');
}

async function main() {
    console.log("seeding...");
    const client = new Client({
      connectionString: process.env.CONNECTIONTOSTRING,
      ssl: false,
    });
  
const values = await stringifyItems();


const SQL = `

CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR ( 255 ),
  category VARCHAR ( 255 ),
  stock INTEGER,
  brand VARCHAR ( 255 ),
  img VARCHAR ( 255 )
);

INSERT INTO items(title,category,stock,brand,img) 
VALUES ${values};

`;

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();

