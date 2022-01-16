## SLS Private files

Here we can se how a serverless application can manage S3 objects and even create resources in aws e.g S3 bucket that we are using here.

## How it works?

In `serverless.ts` we declare:

```
  resources: {
    Resources: ...
  }

```

Here we are saying to AWS wich resources we will need, that's raw CloudFormation template that will be inserted in our sls deploy already pre-existing template.

But the aplication concept is simple.

## What the aplication does?

Route `new-doc`:

- We create a object in the specified bucket at the start in `serverless.ts` with a specified UUID as key.
- We then return the UUID object key in HTTP response.

Route `get-doc`:

- We get a pre-signed URL from our bucket and return it to the user.

## Warnings

This concept is cool but it's not safe to just release the pre-signed URL for everyone. So, first we would have to check if user is allowed to create this a pre-signed URL for this specific object.

Just letting the randomity of RFC 4122 being our only security method is not a cool practive 😉

We sure can apply this in a basic project with an Auth method, checking if user it's logged before creating this URL or something else, but this is just a proof of concept for managing those objects inside S3 through Lambda functions 😄.
