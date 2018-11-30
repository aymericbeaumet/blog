# aymericbeaumet.com

## Todo

- Reduce class names size https://medium.freecodecamp.org/reducing-css-bundle-size-70-by-cutting-the-class-names-and-using-scope-isolation-625440de600b

## Development

```
yarn
yarn develop
```

## CI/CD

The following variables must be set in the [GitLab interface](https://gitlab.com/aymericbeaumet/aymericbeaumet.com/settings/ci_cd):

- `NETLIFY_SITE_ID`: get the _API ID_ [here](https://app.netlify.com/sites/aymericbeaumet/settings/general)
- `NETLIFY_AUTH_TOKEN`: generate a _Personal access token_ [here](https://app.netlify.com/account/applications)
- `ALGOLIA_APPLICATION_ID`: get it [here](https://www.algolia.com/apps/O8NJP2H5DA/api-keys/all)
- `ALGOLIA_ADMIN_API_KEY`: _see above_
- `ALGOLIA_SEARCH_ONLY_API_KEY`: _see above_
- `ALGOLIA_INDEX_NAME`: get it [here](https://www.algolia.com/apps/O8NJP2H5DA/explorer/browse)
