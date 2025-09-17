# to create new database

    - use databaseName

# to create collection and insert document in collection

    - db.students.insertOne({name:'ram',age:12});

# to find the inserted data in colection

    - db.students.find()

# to add nested field in the document 
`one point to remember there is limit of nesting data the max size allowed per document is 16mb `
    - db.students.updateOne({name:'ram'},{$set:{idCards:{hasPanCard:false,hasAadharCard:true}}})
    - db.students.updateMany({},{$set:{hobbies:['anime','gym']}})

# to find nested fields in document
`we have to keep the nested field in qoutes to access any field from it`
`if its array then it will directly find from that list`
    - db.students.find({"idCards.hasPanCard" :true})
    - db.students.find({hobbies:'anime'})

# crud methods in mongoo
    - insertOne()
    - insertMany()

    - findOne() -> it return a single object if present if not it return `null`
    - find() -> it return a cursor --> basically we can use diffrent methods in chaining with find().count()/limit()/forEach(x=>{printjson()})
            example -> 
                db.students.find({age:{$lt:15}})  -->lt,lte,gt,gte
                db.students.find({age:{$gt:15,$lt:20}})  


    - updateOne() --> db.students.updateOne({age:12},{$set:{hasPanCard:true}}) --> update first matching record having age 12
    - updateMany() --> db.students.updateMany({age:{$gt:12,$lt:16}},{$set:{hasPanCard:true}})

    - deleteOne()
    - deleteMany()
