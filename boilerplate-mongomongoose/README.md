# MongoDB and Mongoose Challenges

- [Setup MongoDB Atlas](https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/)
  - ```
    MONGO_URI="mongodb+srv://<db_user>:<db_password>@fccbackend.fk4wg.mongodb.net/<db_name>?retryWrites=true&w=majority&appName=FccBackend"
    ```

### CRUD Part 1 - CREATE

- [Reference Link](https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/)

- First of all, we need a Schema. Each schema maps to a MongoDB collection. It defines the shape of the documents within that collection. Schemas are building blocks for Models. They can be nested to create complex models, but in this case, we'll keep things simple. A model allows you to create instances of your objects, called documents.

- Gitpod is a real server, and in real servers, the interactions with the database happen in handler functions. These functions are executed when some event happens (e.g. someone hits an endpoint on your API). We’ll follow the same approach in these exercises. The `done()` function is a callback that tells us that we can proceed after completing an asynchronous operation such as inserting, searching, updating, or deleting. It's following the Node convention, and should be called as `done(null, data)` on success, or `done(err)` on error.

- Warning - When interacting with remote services, errors may occur!

```js
/* Example */

const someFunc = function (done) {
  //... do something (risky) ...
  if (error) return done(error);
  done(null, result);
};
```

#### Create and Save a Record of a Model

Within the `createAndSavePerson` function, create a document instance using the Person model constructor you built before. Pass to the constructor an object having the fields `name`, `age`, and `favoriteFoods`. Their types must conform to the ones in the `personSchema`. Then, call the method `document.save()` on the returned document instance. Pass to it a callback using the Node convention. This is a common pattern; all the following CRUD methods take a callback function like this as the last argument.

```js
/* Example */

// ...
person.save(function (err, data) {
  // ...do your stuff here...
});
```
