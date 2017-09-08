/*

  <Grid c>
    <Grid className={s.bottom} r>
      {["PrintAt Alpha", "PrintAt 2.0"].map((item, i) => (
        <Grid className={s.bottom} xs={6} sm={4} md={3} key={i}>
          <Paper>
            <h3 className={s.heading}>
              {item}
            </h3>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Grid>

  <StatHeading text="Centralized Monitoring" stat="Telemetry is in Passive Mode." />
  <Monitoring />
  <StatHeading text="My Deployments" stat="All Systems Go." />
  <Grid className={s.bottom} r>
    <Grid xs={6} md={4}>
      <Infrastructure />
    </Grid>
    <Grid xs={6} md={4}>
      <Environments />
    </Grid>
    <Grid xs={6} md={4}>
      <Clusters />
    </Grid>
  </Grid>
  <Grid className={s.bottom} r>
    <Grid xs={6} md={4}>
      <Containers />
    </Grid>
    <Grid xs={6} md={4}>
      <Providers />
    </Grid>
    <Grid xs={6} md={4}>
      <Playbooks />
    </Grid>
  </Grid>
  <StatHeading text="My Microservices" stat="All Microservices are functioning..." />
  <Grid className={s.bottom} r>
    <Grid xs={6}>
      <Microservices />
    </Grid>
    <Grid xs={6}>
      <Transports />
    </Grid>
  </Grid>
  <Grid className={s.bottom} r>
    <Grid xs={6}>
      <Endpoints />
    </Grid>
    <Grid xs={6}>
      <SideEffects />
    </Grid>
  </Grid>
  <StatHeading text="My Controllers" stat="Controllers are Active." />
  <Grid className={s.bottom} r>
    <Grid xs={6} sm={3}>
      <Scripts />
    </Grid>
    <Grid xs={6} sm={3}>
      <Triggers />
    </Grid>
    <Grid xs={6} sm={3}>
      <Triggers />
    </Grid>
    <Grid xs={6} sm={3}>
      <Triggers />
    </Grid>
  </Grid>
  <Grid className={s.bottom} r>
    <Grid xs={6} sm={3}>
      <Triggers />
    </Grid>
    <Grid xs={6} sm={3}>
      <Triggers />
    </Grid>
    <Grid xs={6} sm={3}>
      <div>
        <h3 className={s.heading}>API Endpoints</h3>
      </div>
    </Grid>
    <Grid xs={6} sm={3}>
      <div>
        <h3 className={s.heading}>API Keys</h3>
        <h4 className={s.sub}>Developer 064 - 0x00024</h4>
      </div>
    </Grid>
  </Grid>
  <StatHeading text="My Tasks" stat="Job Queues are active." />
  <StatHeading text="My Clients" stat="All Clients are functioning normally." />
  <StatHeading text="My Analytics" stat="Your Data is being Processed." />
  <Heading text="My Credentials" sub="Single Sign On Authentication and Authorization" />
  <Heading text="The Offline Experience" sub="Manage the Offline Behaviour" />
  <Grid className={s.bottom} r>
    <Grid xs={12} sm={6}>
      <StatHeading text="My Modules" stat="All Modules are Plugged In." />
      <Grid className={s.bottom} r>
        <Grid xs={12}>
          <div>
            {[
              "Offline Behaviour", "Node-RED", "SmartCityHooks"
            ].map((item, i) => (
              <h4 className={s.sub} key={i}>
                {item} is Enabled
              </h4>
            ))}
          </div>
        </Grid>
      </Grid>
    </Grid>
    <Grid xs={12} sm={6}>
      <StatHeading text="My Integrations" stat="All Integrations are up and running." />
      <Grid className={s.bottom} r>
        <Grid xs={6}>
          <div>
            {[
              "Firebase", "A/B Tester", "Facebook"
            ].map((item, i) => (
              <h4 className={s.sub} key={i}>
                {item} is Connected
              </h4>
            ))}
          </div>
        </Grid>
      </Grid>
    </Grid>
  </Grid>

  <Heading text="My Dashboard" sub="Welcome back to PrintAt 2.0" />
  <Grid className={s.bottom} r>
    {["Overview Cards", "Monitoring", "Alerts", "Controllers"].map((item, i) => (
      <Grid className={s.bottom} xs={6} sm={4} md={3} key={i}>
        <Paper>
          <h3 className={s.heading}>
            {item}
          </h3>
        </Paper>
      </Grid>
    ))}
  </Grid>
  <Heading text="My Pipelines" sub="An overview at your project." />
  <Pipelines />
  <Heading text="My Store" sub="Install new Apps, manage Modules and Integrations." />
  <AppStore />
*/
