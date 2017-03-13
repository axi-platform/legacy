import mongoose, {Schema} from "mongoose"

const ProjectSchema = new Schema({
  name: String,
  users: [{type: Schema.Types.ObjectId, ref: "user"}],
  devices: [{type: Schema.Types.ObjectId, ref: "device"}],
  createdAt: {type: Date, default: Date.now}
})

ProjectSchema.set("redisCache", true)

export default mongoose.model("project", ProjectSchema)
