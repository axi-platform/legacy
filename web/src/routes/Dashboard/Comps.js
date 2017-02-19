import React from "react"

import StatusIcon from "material-ui/svg-icons/action/swap-vertical-circle"
import OnlineIcon from "material-ui/svg-icons/device/wifi-tethering"
import OfflineIcon from "material-ui/svg-icons/communication/portable-wifi-off"

import Grid from "../../components/Grid"
import Paper from "../../components/Paper"

import s from "./Dashboard.scss"

export const getPC = status => {
  if (status === "online")
    return s.online
  if (status === "offline")
    return s.offline
  return s.unknown
}

export const getPI = status => {
  if (status === "online")
    return <OnlineIcon />
  if (status === "offline")
    return <OfflineIcon />
  return <div />
}

export const Device = ({_id, name, loc, presence, remove}) => (
  <Paper style={{marginBottom: "1em"}}>
    <div className={s.device}>
      <h3 className={getPC(presence)}>
        {name} {getPI(presence)}
      </h3>
      {loc && (
        <h4 className={s.sub}>
          ({loc[0].toFixed(7)}, {loc[1].toFixed(7)})
        </h4>
      )}
      <h5 className={s.sub}>
        Id: {_id} <span onClick={() => remove(_id)}>[Delete]</span>
      </h5>
    </div>
  </Paper>
)

/*
<Grid className={s.bottom} xs={12} sm={6}>
  ...
</Grid>
*/

export const Devices = ({data, remove = () => {}}) => (
  <Grid r>
    {data && data.map((device, i) => (
      <Grid key={i} xs={12} sm={6}>
        <Device remove={remove} {...device} />
      </Grid>
    ))}
  </Grid>
)

export const Welcome = () => (
  <div className={s.welcome}>
    <Grid c>
      <h2 className={s.heading}>Welcome Back to the Reminiscence.</h2>
      <h3 className={s.sub}>Let&apos;s get you started.</h3>
    </Grid>
  </div>
)

export const Pipelines = () => (
  <Grid className={s.bottom} r>
    {["Steps", "Procedures", "Onboarding"].map((item, i) => (
      <Grid className={s.bottom} xs={6} sm={4} md={3} key={i}>
        <Paper>
          <h3 className={s.heading}>
            {item}
          </h3>
        </Paper>
      </Grid>
    ))}
  </Grid>
)

export const Heading = ({text, sub}) => (
  <Grid className={s.bottom} r>
    <Grid xs={12}>
      <h2 className={s.heading}>{text}</h2>
      <h3 className={s.sub}>{sub}</h3>
    </Grid>
  </Grid>
)

export const StatHeading = ({text, sub, stat, ctrl}) => (
  <Grid className={s.bottom} r>
    <Grid xs={12}>
      <div>
        <h2 className={s.heading}>{text}</h2>
        <h3 className={s.sub}>
          {sub}{(sub && stat) && <span>&nbsp;</span>}
          <span className={s.status}>
            <StatusIcon /> {stat}
          </span>
        </h3>
        <h4 className={s.sub}>
          {ctrl}
        </h4>
      </div>
    </Grid>
  </Grid>
)

export const Monitoring = () => (
  <Grid className={s.bottom} r>
    <Grid xs={6}>
      <div>
        <h3 className={s.heading}>Monitoring Overview</h3>
        {["Checking", "Logging", "Metrics"].map((item, i) => (
          <h4 className={s.heading} key={i}>
            <span className={s.status}>
              <StatusIcon /> {item} is Active
            </span>
          </h4>
        ))}
      </div>
    </Grid>
    <Grid xs={6}>
      <div>
        <h3 className={s.heading}>Monitoring Targets</h3>
        {["Infrastructure", "Clusters", "Broker", "Feathers Services",
          "IoT Devices", "Beacons", "Clients"
        ].map((item, i) => (
          <h4 className={s.sub} key={i}>
            - {item} are being Monitored.
          </h4>
        ))}
      </div>
    </Grid>
  </Grid>
)

export const AppStore = () => (
  <Grid className={s.bottom} r>
    {["PrintAt App", "PrintAt App"].map((item, i) => (
      <Grid className={s.bottom} xs={6} sm={4} md={3} key={i}>
        <Paper>
          <h3 className={s.heading}>
            {item}
          </h3>
        </Paper>
      </Grid>
    ))}
  </Grid>
)

export const Infrastructure = () => (
  <div>
    <h3 className={s.heading}>Infrastructure Overview</h3>
    {["S3 Storage", "Azure Windows Server"].map((item, i) => (
      <h4 className={s.heading} key={i}>
        <span className={s.status}>
          <StatusIcon /> {item} is Online.
        </span>
      </h4>
    ))}
  </div>
)

export const Environments = () => (
  <div>
    <h3 className={s.heading}>My Environments</h3>
    {["Development", "Production", "Staging"].map((item, i) => (
      <h4 className={s.heading} key={i}>
        <span className={s.status}>
          <StatusIcon /> {item} Environment is Available.
        </span>
      </h4>
    ))}
  </div>
)

export const Clusters = () => (
  <div>
    <h3 className={s.heading}>My Clusters</h3>
    {["0x000", "0x001", "0x002"].map((item, i) => (
      <h4 className={s.heading} key={i}>
        <span className={s.status}>
          <StatusIcon /> Cluster {item} is in use at 127.0.0.1
        </span>
      </h4>
    ))}
  </div>
)

export const Containers = () => (
  <div>
    <h3 className={s.heading}>My Containers</h3>
    {["Redis", "Mosca", "PostgreSQL", "Jenkins"].map((item, i) => (
      <h4 className={s.heading} key={i}>
        <span className={s.status}>
          <StatusIcon /> {item} Container is Active
        </span>
      </h4>
    ))}
  </div>
)

export const Providers = () => (
  <div>
    <h3 className={s.heading}>My Providers</h3>
    {["DigitalOcean", "Microsoft Azure", "Google Cloud Platform", "Amazon Web Services"].map((item, i) => (
      <h4 className={s.heading} key={i}>
        <span className={s.status}>
          <StatusIcon /> {item} is Online
        </span>
      </h4>
    ))}
  </div>
)

export const Playbooks = () => (
  <div>
    <h3 className={s.heading}>My Playbook Scripts</h3>
    {["DigitalOcean", "Microsoft Azure", "Google Cloud Platform", "Amazon Web Services"].map((item, i) => (
      <h4 className={s.heading} key={i}>
        <span className={s.status}>
          <StatusIcon /> {item} is Online
        </span>
      </h4>
    ))}
  </div>
)

export const Microservices = () => (
  <div>
    <h3 className={s.heading}>Microservices Overview</h3>
    {["LDAP Authentication", "User Account Management", "Print Queue Management"].map((item, i) => (
      <h4 className={s.heading} key={i}>
        <span className={s.status}>
          <StatusIcon /> {item} Service is Online
        </span>
      </h4>
    ))}
  </div>
)

export const Transports = () => (
  <div>
    <h3 className={s.heading}>Transport Status</h3>
    {["HTTP REST", "WebSocket", "MQTT", "GraphQL"].map((item, i) => (
      <h4 className={s.heading} key={i}>
        <span className={s.status}>
          <StatusIcon /> {item} is Online
        </span>
      </h4>
    ))}
  </div>
)

export const Endpoints = () => (
  <div>
    <h3 className={s.heading}>RESTful Endpoints</h3>
    {["/auth", "/user", "/locate", "/file", "/queue", "/payment"].map((item, i) => (
      <h4 className={s.sub} key={i}>
        - {item} - {item.substring(1).replace(/^./, m => m.toUpperCase())} Service
      </h4>
    ))}
  </div>
)

export const SideEffects = () => (
  <div>
    <h3 className={s.heading}>Side Effects</h3>
    {["WebHooks", "MQTT Broker", "Image Processor", "Render Server"].map((item, i) => (
      <h4 className={s.sub} key={i}>
        - {item} is available.
      </h4>
    ))}
  </div>
)

export const Triggers = () => (
  <div>
    <h3 className={s.heading}>Triggers</h3>
    {["IFTTT", "If Online"].map((item, i) => (
      <h4 className={s.sub} key={i}>
        - Condition: {item} => Then Trigger [...]
      </h4>
    ))}
  </div>
)

export const Scripts = () => (
  <div>
    <h3 className={s.heading}>Scripts</h3>
    {
      [
        "Events", "Actions", "Paths", "Choices", "Widgets", "Tasks",
        "Messages", "Notifications", "Integrations", "Plugins"
      ].map((item, i) => (
        <h4 className={s.sub} key={i}>
          {item} are available for usage.
        </h4>
      ))
    }
  </div>
)
