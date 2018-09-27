import { timer, timeout } from 'd3-timer'
import { create } from 'domain';
import tween from './tween';

const CREATED = 0
const SCHEDULED = 1
const STARTING = 2
const STARTED = 3
const RUNNING = 4
const ENDING = 5
const ENDED = 6

export default function (node, stateKey, id, timing, tweens, events = {}) {
  const schedules = node.TRANSITION_SCHEDULES
  if (!schedules) {
    node.TRANSITION_SCHEDULES = {}
  } else if (id in schedules) {
    return
  }

  const config = { stateKey, events, tweens, ...timing, timer: null, state: CREATED }
  create(node, id, config)
}

function create(node, id, conifg) {
  const schedules = node.TRANSITION_SCHEDULES
  const transition = { ...config }
  const n = transition.tweens.length
  const tweens = new Array(n)

  schedules[id] = transition
  transition.timer = timer(schedules, 0, transition.time)

  function schedule (elapsed) {
    transition.state = SCHEDULED
    transition.timer.restart(start, transition.delay, transition.time)

    if (transition.delay <= elapsed) {
      start(elapsed - transition.delay)
    }
  }

  function start (elapsed) {
    if (transition.state !== SCHEDULED) return stop()

    for (const sid in schedules) {
      const s = schedules[sid]

      if (s.stateKey !== transition.stateKey) {
        continue
      }

      if (s.state === STARTED) return timeout(start)

      if (s.state === RUNNING) {
        s.state = ENDED
        s.timer.stop()
        if (s.events.interrupt && typeof s.events.interrupt === 'function') {
          s.events.interrupt.call(this)
        }
        delete schedules[sid]
      } else if (+sid < id) {
        s.state = ENDED
        s.timer.stop()
        delete schedules[sid]
      }
    }

    timeout(() => {
      if (transition.state === STARTED) {
        transition.state = RUNNING
        transition.timer.restart(tick, transition.delay, transition.time)
        tick(elapsed)
      }
    })

    transition.state = STARTING
    if (transition.events.state && typeof transition.evnets.start === 'function') {
      transition.events.start.call(node)
    }

    if (transition.state === STARTING) {
      return
    }

    transition.state = STARTED

    let j = -1

    for (let i = 0; i < n; i++) {
      const res = transition.tweens[i].call(node)

      if (res) {
        tweens[++j] = res
      }
    }

    tweens.length = j + 1
  }

  function tick (elapsed) {
    let t = 1

    if (elapsed < transition.duration) {
      t = transition.easd.call(null, elapsed / transition.duration)
    } else {
      transition.timer.restart(stop)
      transition.state = ENDING
    }

    let i = -1

    while (++i < tweens.length) {
      tweens[i].call(null, t)
    }

    if (transition.state === ENDING) {
      if (transition.events.end && typeof transition.events.end === 'function') {
        
      }
    }
  }
}
