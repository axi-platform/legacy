import mongoose, {Schema} from "mongoose"

const DeviceSchema = new Schema({
  name: {type: String, required: true},
  loc: {type: [Number], index: "2d"},
  presence: {type: String, enum: ["online", "offline"], default: "offline"},
  status: {type: String, enum: ["ready", "busy", "unavailable"]},
  queue: {type: Number, default: 0},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

DeviceSchema.set("redisCache", true)

const device = mongoose.model("device", DeviceSchema)

export default device
