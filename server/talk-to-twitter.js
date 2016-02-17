var consumerKey = 'sctUvvfMwxXTCcMziXV1cWxJl';
var consumerSecret = '7VEkjATcDahRCuouE8KKqF7xLOuL35Wj59DmgrNbglZopTUmgz';
// I did not URL encode the values above.

var unencodedBearerTokenCredentials = `${consumerKey}:${consumerSecret}`;
// console.log(`Unencoded: ${unencodedBearerTokenCredentials}`);

var encodedBearerTokenCredentials = new Buffer(unencodedBearerTokenCredentials).toString('base64');
// console.log(`Encoded: ${encodedBearerTokenCredentials}`);

