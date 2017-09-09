import {Service} from "feathers-mongoose"

import project from "../models/project"

export default function projects() {
  this.use("projects", new Service({
    Model: project,
    paginate: {
      default: 5,
      max: 25
    }
  }))
}
