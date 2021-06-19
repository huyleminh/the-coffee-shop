import TestModel from "../models/test.model.js";

class TestController {
    static getData = async (req, res) => {
        const model = new TestModel();
        const data = await model.getTest();
        res.send(data)
    }
}

export default TestController;