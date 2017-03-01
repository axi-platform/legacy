# Axi Platform: Scalable Physical Web  Solution Development Platform

Axi Platform is all about solving real world inconveniences, by using the concept of the **Physical Web**.

## Preface: Smart City and IoT

When we think about **Smart City**, most of us only think about gathering data and remotely operating a device.

However, we should be thinking about real solutions that we can use. Solutions that will solve our problems. We should be able to just walk up and use anything with a single tap; the control should be in our hands!

To eliminate security concerns, we should be thinking about threat isolation and decentralization of the platform. Relying on one centralized system is simply just asking to be doomed to fail.

# The Axi Manifesto

We strongly believe that the Axi Platform is like a Game Engine for the Real World. So, it requires design considerations before diving deep to develop the platform. So, here are the Objectives, Goals and Design Considerations that Axi aims to accomplish.

### 1. Open and Decentralized Platform.

Everyone should be able to deploy and use any services. Axi should not be controlled or operated by any entity or organization, but rather with the help of the community.

They can be both consumers and producers at the same time. Human Interaction and User Contribution forms a true ecosystem.

Lock-Ins should be completely zero. Everyone should be able to contribute and swap between providers.

Axi Provides Many Trusted Providers to choose from, and migrate between them.
Axi's Deployment System is just an Interface. You can choose what providers to deploy your cloud services to.

### 2. Everyone must be able to use, deploy and develop with Axi.

> Technology alone is not enough.
Technology must intersect with the liberal arts and the humanities, to create new ideas and experiences that push society forward. - [WWDC 2017](https://developer.apple.com/wwdc)

1 - Service **Developers**

  - Developers develop and innovate new services, solving problems in creative ways.

  - The development team comprises of humans with different skills, aiming to make the world a better place. Software Developers. Engineers. Makers. Scientists. Designers. Entrepreneurs. Legal Supports.

  - Franchises and Monetization Models can be created by them, or they might make it completely free.

2 - Service **Providers**

  - Not everything can be automated, such as the process of refilling supplies and managing sales. Also, the warm and cuddly hug of humanities are still helpful in some cases, especially with older generations and risky situations where observations by humans are stil pretty much mandatory.

  - Providers help in Deployment and Maintenance of the system. They can create their own businesses by using and composing existing services.

  - For instance, Coffee Shops still need baristas and waits to hand-brew the coffee and serve them. Print Stations still need maintainers to refill their Paper and Ink, and make sure the Printer is not Jammed.

  - This way, ecosystems of humans like Uber Drivers or AirBnB Hosts in the gig economy and startup environment is possible. We can also create new jobs for non-developers in this technological era.

### 3. Walk Up and Use Anything in just a tap.

- This is the heart of the Physical Web. The progressive web apps provides instantaneous interaction for the users.

### 4. Provide Accessible, Reliable and Practical Solutions.

What does **Accessiblity** mean?

- It means being able to easily use a service, from discovery up to operation. We strives to simplify the process via the User Experience of the Physical Web, to create a truly smart city for everyone.

- It can also refer to gracefully degrading capabilities to optimize for the minorities.

What does **Reliability** mean?

- It means your end users will give you some credits in regards of being able to use your service with minimal flaws. The entire user experience is what build up trust for your users. Make it count.

What does **Practicality** mean?

- It means being able to adapt to the problems, rather the the solution. Focus on the user's pain points and human aspects, rather than technical purity. 

- We're building Real Solutions, not Toys. It doesn't necessarily have to be shiny, just make it work. If your users are happy, you definitely succeed.

---

## Service Oriented System Design

The **End Users** use **Services** to accomplish our goals.

User-Facing Services can range from:

- **Automation** is interaction with the physical space and controlling devices in the world.
  - Turning on lights and controlling dancing waterfalls
  - Printing documents remotely
  - Checking in to open doors in co-working spaces.

- **Information** provide useful information.
  - Tourism assistant and in-door building maps.
 
- **Communication** to notify a human or a service.
  - Ordering a Coffee or Queuing for a restaurant.

Additionally, there are Backend Services, which Frontend Services can use.

- Queuing Service
- Command Dispatching Service, and abstraction layers.
- Data Gathering and Analysis.
- Monitoring and Telemetry.

Axi Services consists of two major parts: **Devices** and The **Cloud**.

### Axi Devices

Devices can have the following **type** properties.

- Beacons. Advertise the Physical Web Service.
- Sensors. Gather Telemetry from Sensors for Further Usage.
- Controllers. Retrieve Commands and Act Appropriately.

Each of them can be used in a situation where there are no connectivity. 

- Beacons can be deployed in standalone manner for providing access where direct connectivity, such as cellular network, to the Beacon Advertiser is not available.

- Controllers can be connected directly without cloud gateways, and users might directly retrieve Telemetry Data from Sensors, and send it to the Cloud.

- Client might be able to directly connect via BLE, and retrieve information via protocols like SSDP, uPNP or FatBeacon.

Mapping Services to Devices can be Hierachical; You can group devices together.

Here are the data in a device.

1. Metadata
   - Information about the Device
   - Device Identifier, Firmware Version, Location, Properties, etc. 

2. State
   - Current Condition of the Device
   - Not going to be changed very often; R/O or R/W
   - Sample Rate for Frequencies or Set Point for Thermostat.

3. Commands
   - Indicate ACTION to be taken
   - Handlers or RPCs on the device
   - Return value are not idempotent.

4. Telemetry

---

## Deploying Axi Services

Anyone should be able to deploy an Axi service to create their own businesses. Developers can make **Franchise Services** for the Service Providers to deploy by themselves.

1. Go to a **Service Store**. This is similar to how Telegram handle stickers or how Linux handle Repositories; Everyone can make their own store!

   - In the future, a public blockchain might be used for decentralized Service and Identity Management. For now, just let the Physical Web grows in it's infancy stage.

2. Select the service from the Decentralized Dashboard. This will configure the **Cloud Deployment** for your service.

   - We provide a simple abstraction interface to deploy to Cloud Infrastructure Providers, such as Amazon Web Services, Google Cloud Platform and Microsoft Azure, or even your own VPS and Datacenters.

   - They can be swapped out and switched anytime, to ensure no Provider Lock-ins. In reality, they're just a bunch of JSON configurations like Ansible Playbooks to load the Docker Containers and Orchestrate them via Kubernetes or Swarm, which can be used interchangeably between Cloud Providers.

### Device Configuration

> Device Requirements: Active Connectivity (e.g. Cellular) and able to communicate via MQTT or HTTP.

1. Get the Credentials.

  - You'll be given a pair of credentials, namely the ID and Secret Key from the IAM. They'll be used to establish the connection via transport protocols like MQTT over TLS, HTTPS, and Secure Web Sockets.

2. Setup the Hardware, Install the Firmware and Supply the Credentials.

  - Make sure the hardware configuration and wiring are complete. Then, install the firmware, and just supply the credentials to your IoT Devices. Once the device is connected, the firmware will get updated and it'll do their job.

#### For Beacons

  - Devices with Connected Beacons property will synchronize with your cloud services, retrieving their Eddystone-UID or URL packets, and transmit it with their transport of choice, such as Eddystone BLE, mDNS, SSDP or UPnP.

  - Standalone Beacons will require registration of the beacon, and add the UID to the Platform. You might also use GATT.

    - You might also specify a permanent URL, if you wish to use Eddystone-URL instead of Nearby Notifications, but you won't be able to use App Intent in case Android Instant Apps are available.
