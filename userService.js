// userService.js
const { connectToDatabase, client } = require('./db');

async function createUser(userData) {
    let db;
    try {
        db = await connectToDatabase();
        const result = await db.collection('users').insertOne(userData);
        console.log('Insert result:', result);  // 디버깅을 위한 로그
        return result;
    } catch (err) {
        console.error('Detailed error:', err);
        if (err.code === 37) {
            throw new Error('DocumentDB connection error. Please check credentials and network settings.');
        }
        throw err;
    }
}

// 사용자 조회
async function getUsers(query = {}) {
  try {
    const db = await connectToDatabase();
    return await db.collection('users').find(query).toArray();
  } catch (err) {
    console.error('Error getting users:', err);
    throw err;
  }
}

// 사용자 업데이트
async function updateUser(userId, updateData) {
  try {
    const db = await connectToDatabase();
    const result = await db.collection('users').updateOne(
      { _id: userId },
      { $set: updateData }
    );
    return result;
  } catch (err) {
    console.error('Error updating user:', err);
    throw err;
  }
}

// 사용자 삭제
async function deleteUser(userId) {
  try {
    const db = await connectToDatabase();
    const result = await db.collection('users').deleteOne({ _id: userId });
    return result;
  } catch (err) {
    console.error('Error deleting user:', err);
    throw err;
  }
}

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser
};