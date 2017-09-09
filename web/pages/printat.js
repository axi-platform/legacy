import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'

import Map from '../components/PrintAt/Map'
import Upload from '../components/PrintAt/Upload'
import Queue from '../components/PrintAt/Queues'

const Dashboard = props => (
  <main>
    <Map />
    <Upload />
    <Queue />
  </main>
)

const mapStateToProps = state => ({

})

const enhance = compose(
  connect(mapStateToProps)
)

export default enhance(Dashboard)
