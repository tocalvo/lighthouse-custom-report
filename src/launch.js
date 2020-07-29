const domain = ''
const configName = 'default-only-performance' //'block-3-party' 'default-only-performance'

const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const config = require(`./config/${configName}`);

(async () => {
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    const options = { logLevel: 'info', output: 'html', port: chrome.port };
    const runnerResult = await lighthouse(`https://www.${domain}.com/`, options, config);

    // `.report` is the HTML report as a string
    const reportHtml = runnerResult.report;
    fs.writeFileSync(`out/${domain}/${configName}.html`, reportHtml);

    // `.lhr` is the Lighthouse Result as a JS object
    console.log('Report is done for', runnerResult.lhr.finalUrl);
    console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

    await chrome.kill();
})();