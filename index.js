const app = require('express')()

app.get('/', (req, res) => res.send('Hello world!'))

const PORT = 4000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))