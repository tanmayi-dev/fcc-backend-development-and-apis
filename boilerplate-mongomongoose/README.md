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

#### Perform Classic Updates by Running Find, Edit, then Save

In the good old days, this was what you needed to do if you wanted to edit a document, and be able to use it somehow (e.g. sending it back in a server response). Mongoose has a dedicated updating method: `Model.update()`. It is bound to the low-level mongo driver. It can bulk-edit many documents matching certain criteria, but it doesn’t send back the updated document, only a 'status' message. Furthermore, it makes model validations difficult, because it just directly calls the mongo driver.

Modify the `findEditThenSave` function to find a person by `_id` (use any of the above methods) with the parameter `personId` as search key. Add `"hamburger"` to the list of the person's `favoriteFoods` (you can use `Array.push()`). Then - inside the find callback - `save()` the updated `Person`.

**Note**: This may be tricky, if in your Schema, you declared `favoriteFoods` as an Array, without specifying the type (i.e. `[String]`). In that case, favoriteFoods defaults to Mixed type, and you have to manually mark it as edited using `document.markModified('edited-field')`. See our [Mongoose article](https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/).

#### Perform New Updates on a Document Using model.findOneAndUpdate()

Recent versions of Mongoose have methods to simplify documents updating. Some more advanced features (i.e. pre/post hooks, validation) behave differently with this approach, so the classic method is still useful in many situations. `findByIdAndUpdate()` can be used when searching by id.

Modify the `findAndUpdate` function to find a person by `Name` and set the person's age to `20`. Use the function parameter `personName` as the search key.

**Note**: You should return the updated document. To do that, you need to pass the options document `{ new: true }` as the 3rd argument to `findOneAndUpdate()`. By default, these methods return the unmodified object.

#### Delete One Document Using model.findByIdAndRemove

`findByIdAndRemove` and `findOneAndRemove` are like the previous update methods. They pass the removed document to the db. As usual, use the function argument personId as the search key.

Modify the `removeById` function to delete one person by the person's `_id`. You should use one of the methods `findByIdAndRemove()` or `findOneAndRemove()`.

#### Delete Many Documents with model.remove()

`Model.remove()` is useful to delete all the documents matching given criteria.

Modify the `removeManyPeople` function to delete all the people whose name is within the variable `nameToRemove`, using `Model.remove()`. Pass it to a query document with the `name` field set, and a callback.

Note: The `Model.remove()` doesn’t return the deleted document, but a JSON object containing the outcome of the operation, and the number of items affected. Don’t forget to pass it to the `done()` callback, since we use it in tests.
