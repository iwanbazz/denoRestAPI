import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import userController from "../controllers/userController.ts";
const router = new Router();

router.get("/user", userController.getUser);
router.post("/user", userController.addUser);
router.get("/user/:fullname", userController.detailUser);
router.put("/user/:fullname", userController.updateUser);
router.delete("/user/:fullname", userController.deleteUser);

export default router;
