const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");

if (isMainThread) {
    console.log(`Main thread ${process.pid} is running`);
    new Worker(__filename, {
        workerData: [1, 2, 3, 4, 5]
    });
    new Worker(__filename, {
        workerData: [6, 7, 8, 9, 10]
    });
} else {
    console.log(`Worker ${process.pid} started`);
    console.log(`${workerData} sorted is ${workerData.sort((a, b) => a - b)}`);
    // parentPort.on("message", (message) => {
    //     console.log(`Worker ${process.pid} received message: ${message}`);
    // });
    // parentPort.postMessage("Hello from the worker thread");
}

