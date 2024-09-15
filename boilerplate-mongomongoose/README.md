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

#### Create Many Records with model.create()

Sometimes you need to create many instances of your models, e.g. when seeding a database with initial data. `Model.create()` takes an array of objects like `[{name: 'John', ...}, {...}, ...]` as the first argument, and saves them all in the db.

Modify the createManyPeople function to create many people using `Model.create()` with the argument `arrayOfPeople`.

Note: You can reuse the model you instantiated in the previous exercise.

#### User model.find() to Search Your Database

In its simplest usage, `Model.find()` accepts a query document (a JSON object) as the first argument, then a callback. It returns an array of matches. It supports an extremely wide range of search options. Read more in the docs.

Modify the `findPeopleByName` function to find all the people having a given name, using `Model.find() -> [Person]`

Use the function argument `personName` as the search key

#### Use model.findOne() to Return a Single Matching Document from Your Database

`Model.findOne()` behaves like `Model.find()`, but it returns only one document (not an array), even if there are multiple items. It is especially useful when searching by properties that you have declared as unique.

Modify the `findOneByFood` function to find just one person which has a certain food in the person's favorites, using `Model.findOne() -> Person`. Use the function argument `food` as search key.

#### Use model.findById() to Search Your Database By \_id

When saving a document, MongoDB automatically adds the field `_id`, and set it to a unique alphanumeric key. Searching by `_id` is an extremely frequent operation, so Mongoose provides a dedicated method for it.

Modify the `findPersonById` to find the only person having a given `_id`, using `Model.findById() -> Person`. Use the function argument `personId` as the search key.
