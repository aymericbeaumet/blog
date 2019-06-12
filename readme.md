# aymericbeaumet.com

## Tests

### Tools

- [Google Search Console](https://search.google.com/search-console?resource_id=https%3A%2F%2Faymericbeaumet.com%2F)

### Performance / Accessibility

- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse/run)
- [Google Mobile-Friendly](https://search.google.com/test/mobile-friendly?url=https%3A%2F%2Faymericbeaumet.com%2F)
- [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Faymericbeaumet.com)
- [GTmetrix](https://gtmetrix.com/reports/aymericbeaumet.com/0dYIusp6)
- [Pingdom](https://tools.pingdom.com/#59da531f00400000)

### Security

- [Sophos Security Headers](https://securityheaders.com/?q=https%3A%2F%2Faymericbeaumet.com&followRedirects=on)

### DNS

| Domain             | GSuite Toolbox Check MX                                                                             |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| aymericbeaumet.me  | [check](https://toolbox.googleapps.com/apps/checkmx/check?domain=aymericbeaumet.me&dkim_selector=)  |
| aymericbeaumet.com | [check](https://toolbox.googleapps.com/apps/checkmx/check?domain=aymericbeaumet.com&dkim_selector=) |
| beaumet.fr         | [check](https://toolbox.googleapps.com/apps/checkmx/check?domain=beaumet.fr&dkim_selector=)         |
| beaumet.me         | [check](https://toolbox.googleapps.com/apps/checkmx/check?domain=beaumet.me&dkim_selector=)         |

## Commands

### Development

```
yarn
yarn develop
```

### Deploy

_The `master` branch is automatically built and deployed via the Netlify CI._

## Environment variables

The following variables must be set in [Netlify](https://app.netlify.com/sites/aymericbeaumet/settings/deploys):

- `ALGOLIA_APPLICATION_ID`: get it [here](https://www.algolia.com/apps/O8NJP2H5DA/api-keys/all)
- `ALGOLIA_ADMIN_API_KEY`: _see above_
- `ALGOLIA_SEARCH_ONLY_API_KEY`: _see above_
- `ALGOLIA_INDEX_NAME`: get it [here](https://www.algolia.com/apps/O8NJP2H5DA/explorer/browse)
