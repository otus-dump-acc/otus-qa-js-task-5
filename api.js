const BOOKSTORE_BASE_URL = 'https://bookstore.demoqa.com';
const headers = new Headers({
  'Content-Type': 'application/json',
})

async function createUser(userName, password) {
  const response = await fetch(BOOKSTORE_BASE_URL + '/Account/v1/User', {
    headers,
    method: 'POST',
    body: JSON.stringify({
      userName,
      password,
    }),
  });
  return response
}

async function generateToken(userName, password) {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });
  return await fetch(BOOKSTORE_BASE_URL + '/Account/v1/GenerateToken', {
    headers,
    method: 'POST',
    body: JSON.stringify({
      userName,
      password,
    }),
  });
}

module.exports = {
  createUser,
  generateToken
}