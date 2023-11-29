const { createUser, generateToken } = require('./api')

describe('Bookstore API Account', () => {
  const username = 'username' + Date.now();
  const password = 'P@ssword123';
  const invalidPassword = 'password';
  let createdUserId = null;

  test('Creating user: success', async () => {
    const response = await createUser(username, password);
    expect(response.status).toBe(201);
    const userData = await response.json();
    createdUserId = userData.userId;
    expect(userData.username).toBe(username);
  });
  test('Creating user: username is already used', async () => {
    const response = await createUser(username, password);
    expect(response.status).toBe(406);
    const errorData = await response.json();
    expect(errorData.code).toBe('1204');
  });
  test('Creating user: invalid password', async () => {
    const response = await createUser(username, invalidPassword);
    expect(response.status).toBe(400);
    const errorData = await response.json();
    expect(errorData.code).toBe('1300');
  });
  test('Token generation: success', async () => {
    const response = await generateToken(username, password);
    expect(response.status).toBe(200);
    const tokenData = await response.json();
    expect(tokenData.status).toBe('Success');
    expect(tokenData.token).not.toBeNull();
  });
  test('Token generation: error', async () => {
    const response = await generateToken(username, invalidPassword);
    expect(response.status).toBe(200); // я не знаю почему у них ошибка авторизации 200 статус возвращает-_-
    const errorData = await response.json();
    expect(errorData.status).toBe('Failed');
    expect(errorData.token).toBeNull();
  });
});