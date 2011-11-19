class Timer
  constructor : (max, repeat=false, time=0, active=false, complete=undefined) ->
    @set(max)
    @_time = time
    @_active = active
    @_complete = complete
    @_repeat = repeat
  set : (max) ->
    max ?= 0
    @_max = max
    @
  play : ->
    @_active = true
    @
  stop : ->
    @_active = false
    @_time = 0
    @
  pause : ->
    @_active = false
    @
  tick : ->
    if @_time < @_max and @_active
      ++@_time
      if @_time is @_max
        unless complete?
          @_complete()
        if @_repeat
          @_time = 0
    @
  now : ->
    return time
  setComplete : (func) ->
    @_complete = typeof(func) is Function ? func : undefined
    @
  setRepeat : (repeat) ->
    @_repeat = repeat
    @
