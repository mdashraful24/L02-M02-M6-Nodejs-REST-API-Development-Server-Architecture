import type { IncomingMessage, ServerResponse } from "http";
import { productController } from "../controller/product.controller";

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
    // console.log(req.url); // * '/', '/user', '/products'
    // console.log(req.method); // * "GET", "POST", "DELETE"

    const url = req.url;
    const method = req.method;

    if (url === "/" && method === "GET") {
        // console.log("This is root route");

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "This is root route" }));

        // ! The server sends a response string or buffer to the client, not an object. Because the server does not send the response in the form of an object to the client side.

    } else if (url?.startsWith("/products")) {
        productController(req, res);
    } else {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
};
