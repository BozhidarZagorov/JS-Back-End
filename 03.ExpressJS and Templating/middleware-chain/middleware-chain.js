const middlewares = [];

function use(middleware) {
    middlewares.push(middleware);
}

function execute(req, res) {
    let index = 0;

    const next = () => {
        if (index >= middlewares.length) {
            return;
        }

        middlewares[index++](req, res, next);
    }

    next();
}

export default {
    use,
    execute,
}
