import { stackMiddlewares } from "./middlewares/helper/stackHandler";
import { redirectMiddleware } from "./middlewares/redirect";

const middlewares = [redirectMiddleware];
export default stackMiddlewares(middlewares);
