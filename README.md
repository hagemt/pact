# Overview

This is essentially a basic JavaScript `node` interface for the `pact` tool.

Check out Nick O'Dell's C implementation: https://github.com/nickodell/pact

N.B. `waitpids` does not aim to support the exact flags as `pact` does.

Internally, each `Process` object is an `EventEmitter` for signalling.

# Usage

Example: `require('waitpids')(PID1, PID2) # returns Array of Process objects`

* The `Array` contains exactly what's being monitored. (see Future Work)
* Each `Process` object has a basic interface, to e.g. cancel monitoring.

This module packages a basic CLI tool: `waitpids` (wraps exported Function)

Example: `waitpids PID1 PID2 # will send SIGTERM to PIDX when PIDY dies`

# Future Work

N.B. We'd like to do something to avoid polling `kill -0` times a million.

The `natives` folder has some work toward using the `waitpid` syscall.

Ideally, we'd also leverage the host Object `Process` from `node` itself.

The flags that `pact` supports might also be good `waitpid` options.

Consider: `require('waitpids').call({ signal: 'SIGKILL' }, ...)`
