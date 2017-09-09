import mongoose, {Schema} from "mongoose"
import printProperties from "./_print"

const DocumentSchema = new Schema({
  name: String, // File Name
  file: {type: String, required: true}, // Uploaded File URL
  ...printProperties
})

DocumentSchema.set("redisCache", true)

const document = mongoose.model("device", DocumentSchema)

export default document
