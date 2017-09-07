import mqtt from "mqtt"

const MQTT_URL = "mqtt://mqtt:1883"

const client = mqtt.connect(MQTT_URL)

client.subscribe("presence/#")
client.subscribe("printat/#")

export default client
