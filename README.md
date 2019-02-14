# now-jest

This package provides a
[builder](https://zeit.co/docs/v2/deployments/builders/overview#when-to-use-builders)
for Zeit's [Now 2.0](https://zeit.co/blog/now-2) that runs [Jest](https://jestjs.io/) tests

`now-static-build` always runs the `now-build` script, but we wanted to reuse our `package.json` for multiple builds

Based on https://github.com/zeit/now-builders/tree/master/packages/now-static-build

## Usage

Your `now.json` `"builds"` section should look something like this:

**Note**: don't forget to add `"version": 2` in your `now.json` file to use Now
2.0 explicitly.

```json
{
  "builds": [
    {
      "src": "jest.config.js",
      "use": "now-build-jest"
    }
  ]
}
```

Your `package.json` needs a script named `now-build-jest`. I'm sure we could remove this step and call jest directly

```json
{
  "scripts": {
    "now-build-jest": "jest --ci --bail"
  }
}
```
