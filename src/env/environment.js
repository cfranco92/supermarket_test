const environment = {
    dbUrl: process.env.DB_URL || 'mongodb://cristian:UlRY53hxJueBpSiK@cluster0-shard-00-00-ksmmt.gcp.mongodb.net:27017,cluster0-shard-00-01-ksmmt.gcp.mongodb.net:27017,cluster0-shard-00-02-ksmmt.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'http://localhost',
    publicRoute: process.env.PUBLIC_ROUTE || './../../src/client/dist/',
    filesRoute: process.env.FILES_ROUTE || 'files',
    angularIndex: './../../src/client/dist/adminSocialMarket/index.html'
};

module.exports = environment;