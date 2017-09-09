import React from 'react'
import {connect} from 'react-redux'

import Map from '../components/PrintAt/Map'
import Upload from '../components/PrintAt/Upload'
import Queues from '../components/PrintAt/Queues'

const Dashboard = props => (
  <main>
    <Map />
    <Upload />
    <Queues />
  </main>
)

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(Dashboard)
