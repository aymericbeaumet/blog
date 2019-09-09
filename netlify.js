#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const NetlifyAPI = require('netlify')

const netlify = new NetlifyAPI(process.env.NETLIFY_ACCESS_TOKEN)

const DOMAIN = 'aymericbeaumet.com'
const ALIASES = [
  'aymericbeaumet.fr',
  'aymericbeaumet.me',
  'beaumet.fr',
  'beaumet.me',
]
const SUBDOMAINS = ['', 'www.', 'aymeric.', 'blog.', 'links.', 'projects.']

const SITE = {
  name: 'aymericbeaumet',
  custom_domain: DOMAIN,
  domain_aliases: [DOMAIN, ...ALIASES]
    .flatMap(d => SUBDOMAINS.map(sd => `${sd}${d}`))
    .filter(d => !(d === DOMAIN || d === `www.${DOMAIN}`)),
  ssl: true,
  force_ssl: true,
  build_settings: {
    cmd: 'yarn build',
    dir: 'public/',
    private_logs: true,
    allowed_branches: ['master'],
  },
  processing_settings: {
    css: { bundle: true, minify: true },
    js: { bundle: true, minify: true },
    images: { optimize: true },
    html: { pretty_urls: true },
    skip: false,
  },
  prerender: 'netlify',
}

;(async function main() {
  const sites = await netlify.listSites()
  const site = sites.filter(({ name }) => name === SITE.name)[0]
  await netlify.updateSite({ site_id: site.id, body: SITE })
  fs.writeFileSync(
    path.join(__dirname, 'static/_redirects'),
    [`${SITE.name}.netlify.com`, ...SITE.domain_aliases]
      .map(da => `https://${da}/* https://${DOMAIN}/:splat 301!`)
      .join('\n'),
  )
})()
