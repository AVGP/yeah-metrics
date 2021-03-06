# Yeah, Metrics!
## Quick & easy metrics

## Setup
You need at least node.js 0.8.
To install all the dependencies, just run

    $ npm install
next up you need to create a config.js in the root directory to provide the database connection for the app.
Please note, that you'll need a MongoDB instance with a collection called ```user```.
The ```config.js``` should look like this:

    exports.BASE_URL = "http://example.org";
    exports.MONGO_URL = "user:password@your.dbserver.com/yourdb";
    exports.KEENIO = {
        projectId: "PROJECT_ID_FROM_KEEN_IO",
        apiKey: "API_KEY_FROM_KEEN_IO"
      };
Then run it with

    $ node app.js
and point your browser to [http://localhost:8080](http://localhost:8080) and you should see the home page of Yeah, Metrics!

## Restricting login to your domain
If you want to restrict login to users with an email address of your domain, say example.org, you can set this via the config.js:

    exports.RESTRICT_DOMAIN = "example.org";
This setting allows only users with an "@example.org" email address to login into the application.

## Feeding data into the application
You'll find the available reporters at the [yeah-metrics-reporters repository](https://github.com/avgp/yeah-metrics-reporters).

## Heroku deployment
If you want to deploy to Heroku, you can set environment variables instead of creating a config.js.
It works like this:

    $ heroku config:set MONGO_URL=user:password@example.host.com:123/database_name
    $ heroku config:set BASE_URL=http://example.herokuapp.com
    $ heroku config:set KEENIO='{"projectId:" : "YOUR_PROJECT_ID", "apiKey": "YOUR_API_KEY"}'
and optionally

    $ heroku config:set RESTRICT_DOMAIN="example.org"
and you should see your application running on Heroku.
