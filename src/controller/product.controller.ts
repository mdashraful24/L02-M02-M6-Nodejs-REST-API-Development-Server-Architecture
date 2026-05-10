import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utils/parseBody";

export const productController = async (req: IncomingMessage, res: ServerResponse) => {

    const url = req.url;
    const method = req.method;

    const urlParts = url?.split("/");
    const id = urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;
    // console.log("This is the actual id: ", id);

    // * get all products
    if (url === "/products" && method === "GET") {

        // const products = [
        //     {
        //         id: 1,
        //         name: "Product-1"
        //     },
        // ];
        const products = readProduct();

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            message: "Products retrieved successfully",
            data: products
        }));
    } else if (method === "GET" && id !== null) {
        // * get single product

        const products = readProduct();
        const product = products.find((p: IProduct) => p.id === id);

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            message: "Product retrieved successfully",
            data: product
        }));
    } else if (method === "POST" && url === "/products") {
        // * post product

        const body = await parseBody(req);
        console.log("Body: ", body);

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            message: "Product created successfully",
            // data: product
        }))
    }
};
