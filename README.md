# carbon-validate
The `carbon-validate` module provides Zend-like set of commonly used data validators. This means you can check your data with  a set of validators after you've received user's input or before you insert data into your database. You can use it as a stand-alone module or most commonly with `carbon-form` module which validates form data automatically for you.

If you've ever worked with any of `Zend_Validate` filters from the Zend Framework you will be familiar with it's sintax and if you haven't then scroll down to the "Usage" section and you'll be up-and-running in no time.


## Installation
```
npm install carbon-validate [--save]
```

## Usage
The `carbon-validate` module packs some of the most used validators which share the same interface. Each validator provides public access to the function `isValid` which does the actual validation check and then calls the callback function letting you know whether input data was successfully validated or not. Some validators have options so that you can customize it to your needs.

#### Stand-alone
```js
var Validate = require("carbon-validate");

var between = new Validate.Between({
    min: 5,
    max: 25
});

var inputValue = "...";

between.isValid(inputValue, {}, function(err, value) {
    if (err)
        console.log(err); // By default it outputs: "'...' is not between '5' and '25'"
    else
        console.log("Input value is between 5 and 25");
});

```

#### With `carbon-form`
```js
var Form = require("carbon-form");
var Validate = require("carbon-validate");

var form = new Form();

form.addElements([
    new Form.Element.Text("email_address", {
        label: "Email address",
        validators: [
            new Validate.NotEmpty({
                messages: {
                    "is_empty": "Please type in your email address" 
                }
            }),
            new Validate.EmailAddress()
        ]
    });
]);
```

## Validators
#### Between
Checks if the input value is between two integer values.

**Options**
* `inclusive` [`Boolean`] - Defines whether `min` and `max` values represent minimal and maximal values allowed, respectively.
* `min` [`Integer`] - Minimum value.
* `max` [`Integer`] - Maximum value.
* `messages`
 * `not_between` - Message which is returned if the input value isn't between `min` and `max` values.

#### Callback
If you don't want to make your own validator but you still need to do some custom validation check then this validator is for you.

**Options**
* `callback` [`Function`] - A function that receives two arguments: the value and validator options and which returns either `true` or `false` depending whether you've successfully validated input data.

#### DbNoRecordExists
Checks if the value already exists in the database. This means that the validation check will fail if there is already a matching record in the database. Typical example is when you want to check if username is already taken or if email address is already registered in the database.

**Options**
* `adapter` [`String`] - Name of the database adapter to be used (currently only `mongoose` is supported).
* `collection` [`String`] - Name of the collection/table in the database which possibly contains the value.
* `field` [`String`] - Name of the field/column in the collection/table which possibly contains the value.
* `messages`
 * `record_found` - Messages which is returned if the input value already exists in the database.

#### DbRecordExists

#### EmailAddress

#### Identical

#### NotEmpty

#### StringLength

#### Url

## Who is using it
The `carbon-validate` module is one of many that is running behind our web application: [Timelinity](https://www.timelinity.com)

## Contributing
If you're willing to contribute to this project feel free to report issues, send pull request, write tests or simply contact me - [Amir Ahmetovic](https://github.com/choxnox)
