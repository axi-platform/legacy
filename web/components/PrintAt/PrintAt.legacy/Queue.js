import React from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Paper from "../../Paper"
import Button from "../../Button"

import s from "./PrintQueue.scss"

export const Info = withStyles(s)(queue => (
  <div>
    {queue.error && (
      <div>
        <h2>Error: {queue.error}</h2>
      </div>
    )}
    <h2 className={s.heading}>
      Queue <span className={s.text}>{queue.number}</span> -
      <span className={s.text}>&nbsp;{queue.status}</span>
    </h2>
    <div style={{marginBottom: "1em"}}>
      <Button className={s.cancel} onClick={queue.cancel} base light>
        Cancel
      </Button>
    </div>
  </div>
))

export const Summary = withStyles(s)(({station, files}) => (
  <Paper title="Printing Summary">
    <h3 className={s.title}>
      {station ? (
        <span>
          Printing At&nbsp;
          <span className={s.text}>
            {station.name}
          </span>
        </span>
      ) : (
        <span className={s.text}>
          Please select a Print Station first.
        </span>
      )}
    </h3>
    <h3 className={s.title}>
      <span className={s.text}>{files.length}</span> Files in total.
    </h3>
  </Paper>
))

export const Ready = withStyles(s)(props => (
  <div>
    <h2 className={s.heading}>Ready to Queue.</h2>
    <div>
      <Button onClick={props.enqueue} base light>
        Queue Now
      </Button>
      <Button className={s.cancel} onClick={props.clear} base>
        Start Over
      </Button>
    </div>
  </div>
))

export const NotReady = withStyles(s)(({s1, s2}) => (
  <div>
    <h2 className={s.heading}>
      Please complete the following steps first.
    </h2>
    <h3 className={s.heading}>
      {!s1 && <span>- Select a Station <br /></span>}
      {!s2 && <span>- Upload your Documents</span>}
    </h3>
    <div>
      <Button disabled base>
        Printing Unavailable
      </Button>
    </div>
  </div>
))

export const Success = withStyles(s)(({queue = {}, reset}) => (
  <div>
    <h2 className={s.h}>
      Printing Success.
    </h2>
    <h3 className={s.heading}>
      Thank you for printing with PrintAt!
    </h3>
    <h4 className={s.sub}>
      Your queue is #{queue.number}
    </h4>
    <Button onClick={reset} base>
      Reset
    </Button>
  </div>
))

export default ({enqueue, clear, cancel, queue, success, files, station, reset}) => {
  if (success)
    return <Success reset={reset} queue={queue} />
  if (queue)
    return <Info cancel={() => cancel(queue.id, station._id)} {...queue} />
  if (files.length > 0 && station)
    return <Ready enqueue={enqueue} clear={clear} />
  return <NotReady s1={station} s2={files.length > 0} />
}
