//https://github.com/manishsaraan/email-validator/blob/master/index.js
const tester =
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

export function validEmail(email: string): Boolean {
  if (!email) return false;

  var emailParts = email.split("@");

  if (emailParts.length !== 2) return false;

  var account = emailParts[0];
  var address = emailParts[1];

  if (account.length > 64) return false;
  else if (address.length > 255) return false;

  var domainParts = address.split(".");
  if (
    domainParts.some(function (part) {
      return part.length > 63;
    })
  )
    return false;

  if (!tester.test(email)) return false;

  return true;
}
