import app from "./main";

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export default server;
