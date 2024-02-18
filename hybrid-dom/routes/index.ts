import { Express, Request, Response, Router } from "express";
import { MainController } from "../controllers";

const router = Router();
const controller = new MainController();

class Route {
    init(app: Express) {
        router.post('/new-signedhash', async (req: Request, res: Response) => {
            const { owner, data } = req.query;

            const result = await controller.newSignedMessage(
                owner as string,
                data as string
            );

            res.status(result.code).send(result);
        });

        router.post('/new-bind', async (req: Request, res: Response) => {
            const { owner, email } = req.query;

            const result = await controller.bindRequest(
                owner as string,
                email as string
            );

            res.status(result.code).send(result);
        });

        router.post('/get-bind', async (req: Request, res: Response) => {
            const { owner } = req.query;

            const result = await controller.getBinding(
                owner as string
            );

            res.status(result.code).send(result);
        });

        router.post('/delete-bind', async (req: Request, res: Response) => {
            const { owner } = req.query;

            const result = await controller.onDeleteBind(
                owner as string
            );

            res.status(result.code).send(result);
        });

        app.use('/', router);
    }
}

export default Route;