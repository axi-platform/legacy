import mqtt from "mqtt"

const MQTT_URL = "mqtt://localhost"

const client = mqtt.connect(MQTT_URL)

client.subscribe("printat/#")

export default client
