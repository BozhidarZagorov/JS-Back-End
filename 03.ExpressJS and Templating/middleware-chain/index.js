import middlewareChain from "./middleware-chain.js";

middlewareChain.use((req, res, next) => {
    console.log('First MIddleware');
    req.user = 'Gosho';
    next();
});

middlewareChain.use((req, res, next) => {
    console.log('Second MIddleware');
    req.age = 20;
    next();
});

middlewareChain.use((req, res) => {
    console.log('Third middlware');
    console.log(req);
});

middlewareChain.execute({}, {});


