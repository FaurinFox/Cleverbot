# Cleverbot

In order to use this package, you need to first obtain a Cleverbot API key [here](https://cleverbot.com/api).

### Installation

```shell
npm install --save @faurinfox/cleverbot
```

### Usage

There are a few ways to use this package. We'll start with a `import` style, which i recommend using whenever possible.

The example below will be a full script, the other examples after it will be modifications, but not include the entire thing every time.

This example script will use both async/await as well as .then() methods.

```javascript
import Cleverbot from '@faurinfox/cleverbot';

(function() {
    const apiKey = "YOUR_API_KEY";
    const CB = new Cleverbot({
        key: apiKey
    });
    // Hardcoded input just because this is an example
    let inputMsg = "Hi there!";
    // Use this variable to keep track of cs, in order to carry on a conversation
    let csStr = undefined;
    // If using within a function, that function should be a async one
    async function example() {
      // Check if csStr is undefined or not
        if (csStr !== undefined) {
          // It is not, so continue and pass it to the query
          // This is also demonstrating how to use this with async function and await
            try {
                let reply = await CB.query(inputMsg, {cs: csStr});
                // CB.query here will return a JSON with the reply received from Cleverbot API, as well as an added 'URL' property should you need to know the URL that was called to receive that response
                // We do not need the entire JSON, only the reply, thus use .output
                console.log("Reply: "+reply.output);
                // If you need the URL that was called, you would get it as such:
                console.log(reply.URL);
            } catch (error) {
              // We'll just log the error if one happens
                console.error(error);
            }
        }else if (csStr === undefined) {
          // csStr is undefined, therefore we don't have conversation to continue
          // This part is essentially the same as async/await above, but using a then() instead. As such, i will not comment it specifically.
            CB.query(inputMsg)
            .then(function(response) {
                console.log(response.output);
                console.log(response.URL)
                csStr = response.cs;
                // We run the function again here so that the change to csStr is registered, and the first if statement can therefore run. Again, this is for demonstration purposes.
                example();
            })
            .catch((e) => {
                console.error(e);
            });
        }
    }
    example();
})();
```

Another way is importing it in CommonJS instead, though this import differs from our recommended one.

Note however, that importing this package this way requires the import to be within an async function!

For that, here's how you would import it:

```javascript
(async function() {
const Cleverbot = (await import('@faurinfox/cleverbot')).default;
    // And the code continues the same as in the first example above
    // ...
})();
```

Alternatively, you could also:

```javascript
const apiKey = "YOUR_API_KEY";
(async function() {
    return new Promise(async (resolve, reject) => {
        try {
            const Clever = (await import('@faurinfox/cleverbot')).default;
            resolve(new Clever({
                key: apiKey
            }));
        } catch (error) {
            reject(error);
        }
    });
})().then((c) => {
    // And carry on the code from there, wrapped in this .then
  const Cleverbot = c;
  Cleverbot.query(...).then(...)
  // ^ Placeholder for your actual query
}).catch((err) => {
  console.error(err);
});
```

Or you could use _let_ instead of a _const_ to avoid wrapping everything in the .then

```javascript
const apiKey = "YOUR_API_KEY";
let Cleverbot;
(async function() {
  const Clever = (await import('@faurinfox/cleverbot')).default;
  Cleverbot = new Clever({
    key: apiKey
  });
})();
// This, however, does mean that you need to wait until Cleverbot variable is assigned before using it
```

But that shall be the end of CommonJS method guidance. I would prefer for you to use the `import Cleverbot from '@faurinfox/cleverbot';`, but i also want you to be able to use this package in CommonJS as well, and as such, i hope at least one of these examples helped you to do so.

### Avoid this

This package _does_ also support callbacks as the third argument to the query function. However, the use of them is **heavily discouraged**, i recommend using any of the previously shown methods instead.

Nevertheless, to use it via a callback would be:

```javascript
// First import as normal
import Cleverbot from '@faurinfox/cleverbot';
// Once imported, we can send a query without having a 'cs' key to pass to it, using a callback
const apiKey = "YOUR_API_KEY";
const CB = new Cleverbot({
  key: apiKey
});
// Again, hardcoded input just because this is an example
let inputMsg = "Hi there!";

CB.query(inputMsg, null, function(response) {
  console.log(response.output)
});
// The null passed to query above is where you would put your object with the 'cs' key
// if you have one to pass, it would instead look like this
CB.query(inputMsg, {cs: "YOUR_CS_KEY"}, function(response) {
  console.log(response.output)
});
```

Do note though that these examples are just that, examples. Most of them likely will not run as a standalone file on their own. 
You will need to adapt them to your needs.

#### [Back to top of Readme](#readme).