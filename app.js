// app.js
const express = require('express');
const userService = require('./userService');

const app = express();
app.use(express.json());

// 사용자 생성 API
app.post('/users', async (req, res) => {
  try {
    const result = await userService.createUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 사용자 조회 API
app.get('/users', async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 사용자 업데이트 API
app.put('/users/:id', async (req, res) => {
  try {
    const result = await userService.updateUser(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 사용자 삭제 API
app.delete('/users/:id', async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});