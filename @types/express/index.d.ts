export { };
declare global {
    namespace Express {
        interface Request {
            requestURLPrefix: string;
        }
    }
}
