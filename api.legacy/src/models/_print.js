// Print Shop's Capabilities and Properties

export default {
  quality: {type: Boolean, default: false}, // High or Standard (Photo Only)
  colored: {type: Boolean, default: true}, // Colored or Grayscale
  borderless: {type: Boolean, default: false}, // Borderless or Bordered
  paper: {type: String, enum: ["glossy", "matte", "thin", "thick"], default: "thick"},
  size: {type: String, enum: ["A3", "A4", "A5"], default: "A4"},
  bundle: {type: String, enum: ["file"]}
}
