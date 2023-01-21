# Cleverbot

In order to use this package, you must obtain a Cleverbot API key <a href="https://cleverbot.com/api" target="_blank">here</a>.

### Installation

```shell
npm install --save @faurinfox/cleverbot
```

### Usage

There are a few ways to use this package. We'll start with a import style.

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
              // Same thing as above, just log it
                console.error(e);
            });
        }
    }
    example();
})();
```

The second way is importing it in CommonJS instead.

Note however, that importing this package this way requires the import to be within an async function!

For that, here's how you would import it:

```javascript
(async function() {
const Cleverbot = (await import('@faurinfox/cleverbot')).default;
    // And the code continues the same as in the first example above
    // ...
})();
```

So far these examples have been using promises to retrieve the value.

This package _does_ also support callbacks as the third argument to the query function. However, the use of them is **heavily discouraged**, i recommend using a promise method instead.

Nevertheless, to use it via a callback would be:

```javascript
// First import as normal, either like this
import Cleverbot from '@faurinfox/cleverbot';
// OR like this, though this must be inside an async function
const Cleverbot = (await import('@faurinfox/cleverbot')).default;
// Only one or the other. 

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
Do note though the these examples are just that, examples. They likely will not run as a standalone file on their own, apart from the first of them. 
You will need to adapt them to your needs.

#### [Back to top of Readme](#readme).