const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });

nightmare
  .goto('https://ems.riseuplabs.com/login')
  .type('#id_username', 'injamamul.haque.riseuplabs@gmail.com')
  .type('#id_password', 'WX2558HRRS27166')
  .click('.btn.btn-primary.btn-block')
  .wait('.nav-sidebar')
  .click('.nav-sidebar .nav-item.has-treeview a')
  .wait('.table')
  //   .type('.table tr:first-child .form-group input.timeinput', '8')
  .type('.table .timeinput', '8')
  .then(console.log);
