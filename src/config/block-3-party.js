module.exports = {
    extends: 'lighthouse:default',
    settings: {
        onlyCategories: ['performance'],
    },
    passes:[
        {
            blockedUrlPatterns: ['*google*', '*controltag*', '*indigital*', '*byside*']
        }
    ]
};