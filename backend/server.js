import app from "./index.js";
let port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
