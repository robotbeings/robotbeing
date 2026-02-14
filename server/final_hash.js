const bcrypt = require('bcryptjs');
const password = 'MailBala&*^001';
const hash = bcrypt.hashSync(password, 10);
console.log('HASH:' + hash + ':END');
