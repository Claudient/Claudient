#!/usr/bin/env node
const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');

const authPath = path.join(os.homedir(), 'Library/Application Support/com.vercel.cli/auth.json');
const auth = JSON.parse(fs.readFileSync(authPath, 'utf8'));

// Find the uitkit-site project ID
const req = https.request({
  hostname: 'api.vercel.com',
  path: '/v9/projects?teamId=team_NDyL4VGNQKwczUbIEnil0EiZ&search=uitkit',
  method: 'GET',
  headers: { 'Authorization': `Bearer ${auth.token}` }
}, (res) => {
  let body = '';
  res.on('data', (c) => body += c);
  res.on('end', () => {
    if (res.statusCode === 200) {
      const data = JSON.parse(body);
      data.projects.forEach(p => {
        console.log(`${p.name} -> ${p.id} (orgId: ${p.orgId || 'team'})`);
      });
    } else {
      console.error(`Error ${res.statusCode}: ${body}`);
    }
  });
});
req.on('error', (e) => console.error(e.message));
req.end();
