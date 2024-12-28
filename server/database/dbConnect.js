import mongoose from "mongoose";

export const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "Task-Management",
    })
    .then(() => {
      console.log("Connected to database successfully");
    })
    .catch((error) => {
      console.log(
        "Some error occured while connecting database: ",
        error.message
      );
    });
};
