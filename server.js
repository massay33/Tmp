const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main game page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🎮 Игра "Крестики-Нолики" запущена!`);
    console.log(`🌐 Откройте в браузере: http://localhost:${PORT}`);
    console.log(`🎨 Дизайн с фоновым изображением применён`);
});
