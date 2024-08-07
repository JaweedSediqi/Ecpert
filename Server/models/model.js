import mongoose from "mongoose";
const myModel1 = new mongoose.Schema({
    name: {
        type: String
    }
});
const myModel = mongoose.model('model', myModel1);
export default myModel;
