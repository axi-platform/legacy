import mongoose, {Schema} from "mongoose"
import printProperties from "./_print"

const DeviceSchema = new Schema({
  name: {type: String, required: true},
  loc: {type: [Number], index: "2d"},
  presence: {type: String, enum: ["online", "offline"], default: "offline"},
  status: {type: String, enum: ["ready", "busy", "unavailable"]},
  queue: {type: Number, min: 0, default: 0},
  beacon: {
    type: {type: String, enum: ["static", "dynamic"]},
    uid: String,
    url: String
  },
  flags: {
    sensor: Boolean,
    controller: Boolean
  },
  print: printProperties,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

DeviceSchema.set("redisCache", true)

const device = mongoose.model("device", DeviceSchema)

export default device
