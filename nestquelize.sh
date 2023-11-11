#!/bin/sh

# @nestjs/config internally uses dotenv
# works like angular's app initializer, to load dynamic configuration at runtime
npm i --save @nestjs/config

# using postgres because it:
## + is arguably better than mysql for read-write ops
## + offers more features
## + fully supported ACID compliance
## + is optimal for UNIX based system. we're going to use linux anyway
## + support Foreign Keys
## + compatible with many different NoSQL formats
## + supports all mysql data types and more

DATABASE_LIB='pg'

# installing database library
npm i --save "$DATABASE_LIB" "pg-hstore"

# using sequelize because it:
## + is a well established ORM
## + works using Query Builder approach. This is a no brainer logical approach, i.e.: just do looping over an object props and construct a query string!
## + has wide database compatibility and strong community support

# installing sequelize
npm i --save @nestjs/sequelize sequelize-typescript

#installing sequelize type
npm i --save-dev @types/sequelize

# going to need this for sequelize migration
npm i --save sequelize sequelize-cli