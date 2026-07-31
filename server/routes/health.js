import express from "express";

const router = express.Router();


// Liveness probe
// Question: Is the application process running?
router.get("/live", (req, res) => {

    res.status(200).json({
        status: "UP",
        message: "Application is alive",
        timestamp: new Date().toISOString()
    });

});


// Readiness probe
// Question: Is the application ready to receive traffic?
router.get("/ready", async (req, res) => {

    res.status(200).json({
        status: "READY",
        message: "Application is ready",
        timestamp: new Date().toISOString()
    });

});

export { router as healthRouter };
