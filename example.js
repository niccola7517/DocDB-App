// example.js
const userService = require('./userService');

async function example() {
  try {
    // 사용자 생성
    const newUser = await userService.createUser({
      name: { first: 'John', last: 'Doe' },
      email: 'john@example.com',
      age: 30
    });
    console.log('Created user:', newUser);

    // 30세 이상 사용자 조회
    const adults = await userService.getUsers({ age: { $gte: 30 } });
    console.log('Adults:', adults);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    // process.exit();
  }
}

example();