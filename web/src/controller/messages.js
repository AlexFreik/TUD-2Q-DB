/**
 * @param settings {object}
 * @param sideId {number}
 * @returns {object}
 */
const createWelcomeMessage = (settings, sideId) => ({
    type: 'welcome',
    settings: settings,
    sideId: transformSideId(sideId),
})

/**
 * @param state {string} game state
 * @param currentSideId {number=} current side id
 * @param winnerSideId {number=} winner side id
 * @returns {object}
 */
const createGameStateMessage = (state, currentSideId, winnerSideId) => ({
    type: 'game-state',
    state: state,
    currentSideId: transformSideId(currentSideId),
    winnerSideId: transformSideId(winnerSideId),
})

/**
 * @param from {Pos}
 * @param to {Pos}
 * @param eaten {Pos=}
 * @returns {object}
 */
const createMoveMessage = (from, to, eaten) => ({
    type: 'move',
    from: {
        col: from.x,
        row: from.y,
    },
    to: {
        col: to.x,
        row: to.y,
    },
    eatenPiece: eaten
        ? {
              col: eaten.x,
              row: eaten.y,
          }
        : undefined,
})

/**
 * @param message {string}
 * @returns {object}
 */
const createErrorMessage = (message) => ({
    type: 'error',
    message: message,
})

const transformSideId = (sideId) => (sideId !== undefined ? sideId + 1 : undefined)

module.exports = {
    createWelcomeMessage,
    createGameStateMessage,
    createMoveMessage,
    createErrorMessage,
}