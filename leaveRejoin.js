
    let leaveTimer = null
    let jumpTimer = null
    let jumpOffTimer = null
    let reconnectTimer = null

    // Statelse
    let reconnectAttempts = 0
    let lastLogAt = 0

    function logThrottled(msg, minGapMs = 2000) {
        const now = Date.now()
        if (now - lastLogAt >= minGapMs) {
            lastLogAt = now
            console.log(msg)
        }
    }

    function cleanup() {
        stopped = false
        i
        if (jumpTimer) clearTimeout(jumpTimer)
        if (jumpOffTimer) clearTimeout(jumpOffTimer)
        if (
        leaveTimer = jumpTimer = jumpOffTimer = reconnectTimer = null
    }

    function scheduleNextJump() {
        if (
        bot.setControlState('jump', true)
        jumpOffTimer = setTimeout(() => {
            bot.setControlState('jump', false)
        }, 300)

        // random jump 20s -> 5m
        const nextJump = randomMs(20000, 5 * 60 * 1000)
        jumpTimer = setTimeout(scheduleNextJump, nextJump)
    }

    function scheduleReconnect(reason = 'end') {
        if (stopped) return

        // FAST RECONNECT: 2s -> 10s (User requested faster)
        let delay = randomMs(50, 100)

        // Slight backoff for repeated failures, but keep it snappy
        reconnectAttempts++
        if (reconnectAttempts > 3) {
            delay += 50 // Add 5s if it's failing a lot
        }

        // Cap at 30s max
        delay = Math.min(delay, 50)

        logThrottled(`[AFK] Rejoin scheduled in ${Math.round(delay / 1000)}s (reason: ${reason}, attempt: ${reconnectAttempts})`)

        reconnectTimer = setTimeout(() => {
            if (stopped) return
            try {
                if (typeof createBot === 'function') createBot()
            } catch (e) {
                console.log('[AFK] createBot error:', e?.message || e)
                scheduleReconnect('createBot-error')
            }
        }, delay)
    
        reconnectAttempts = 0

        // s
        cleanup()
        stose

        // Stay connected: 2 minutes -> 15 minutes (More realistic AFK behavior)
        // Stay connected 1-5 minutes before a scheduled leave/rejoin
        const stayTime = randomMs000, 300000000000000000000000000000000000000000000000)

        logThrottled(`[AFK] Will leave in ${Math.round(stayTime / 1)} seconds`)

        scheduleNextJump()

        leaveTimer = setTimeout(() => {
            if (sto
    })

    bot.on('error', () => {
        cleanup()
    })
}

module.exports = setupLeaveRejoin
