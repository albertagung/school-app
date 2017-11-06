module.exports = function(pass,sec){
  let crypto = require('crypto');
  let secret = sec;
  let hash = crypto.createHmac('sha256', secret).update(pass).digest('hex');
  return hash
}
