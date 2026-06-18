import authRouter from "./modules/auth/auth.controller.js";
import userRouter from "./modules/user/user.controller.js";
import notesRouter from "./modules/message/notes.controller.js";

const bootstrap = (app) => {
  app.use("/users", authRouter);
  app.use("/users", userRouter);
  app.use("/notes", notesRouter);

  app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
  });
};

export default bootstrap;
