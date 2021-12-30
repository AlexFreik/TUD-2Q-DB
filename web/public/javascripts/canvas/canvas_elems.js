function convert(ratio) {
    return unifiedSize * ratio
}

function Pos(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.toAbsCord = function () {
        return new Pos(
            convert(this.x),
            convert(this.y),
            convert(this.w),
            convert(this.h)
        )
    }
}

function Rect(pos, fillStyle, lineWidth, strokeStyle) {
    this.pos = pos
    this.fillStyle = fillStyle
    this.lineWidth = lineWidth
    this.strokeStyle = strokeStyle
    this.draw = function () {
        const absPos = this.pos.toAbsCord()

        ctx.fillStyle = this.fillStyle
        ctx.fillRect(absPos.x, absPos.y, absPos.w, absPos.h)

        ctx.beginPath()
        ctx.rect(absPos.x, absPos.y, absPos.w, absPos.h)
        ctx.lineWidth = convert(this.lineWidth)
        ctx.strokeStyle = this.strokeStyle
        ctx.stroke()
    }
}
function Button(pos, fillStyle, lineWidth, strokeStyle) {
    this.rect = new Rect(pos, fillStyle, lineWidth, strokeStyle)
    this.fillStyle = fillStyle
    this.draw = function (state) {
        this.rect.fillStyle = state === 'ON' ? 'rgba(0,0,0,0)' : this.fillStyle
        this.rect.draw()
    }
}
function Text(pos, val, fillStyle, font) {
    this.pos = pos
    this.val = val
    this.fillStyle = fillStyle
    this.font = font
    this.draw = function () {
        const absPos = this.pos.toAbsCord()

        ctx.fillStyle = this.fillStyle
        ctx.font = this.font
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(
            this.val,
            absPos.x + absPos.w / 2,
            absPos.y + absPos.h / 2,
            absPos.w
        )
    }
}

function Elem(pos, figs, draw, state = 'OFF') {
    this.pos = pos
    this.figs = figs
    this.draw = draw
    if (!this.draw) {
        this.draw = () => {
            for (const fig of this.figs) {
                fig.draw(this.state)
            }
        }
    }
    this.state = state
}

function getCornerBtnElem(emoji, { left, down }) {
    const x = left === true ? 0.03 : WIDTH_RATIO - 0.13
    const y = down === true ? 1 - 0.13 : 0.03
    return new Elem((pos = new Pos(x, y, 0.1, 0.1)), [
        new Button(pos, '#3c3f41', 0.01, '#a9abad'),
        new Text(pos, emoji, '#fff', '25px FontAwesome'),
    ])
}
function getBackgroundElem() {
    return new Elem((pos = new Pos(0 * WIDTH_RATIO, 0, 1 * WIDTH_RATIO, 1)), [
        new Rect(pos, '#333333', 0.01, '#a9abad'),
    ])
}
// pos vals is ratios is related to unifiedSize (canvas height)

const homeScreenElems = {
    background: getBackgroundElem(),
    createGameBtn: new Elem(
        (pos = new Pos(0.35 * WIDTH_RATIO, 0.6, 0.3 * WIDTH_RATIO, 0.1)),
        [
            new Button(pos, '#3c3f41', 0.01, '#a9abad'),
            new Text(pos, 'Create New Game', '#fff', '20px Arial'),
        ]
    ),
    joinGameBtn: new Elem(
        (pos = new Pos(0.35 * WIDTH_RATIO, 0.75, 0.3 * WIDTH_RATIO, 0.1)),
        [
            new Button(pos, '#3c3f41', 0.01, '#a9abad'),
            new Text(pos, 'Join Existing Game', '#fff', '20px Arial'),
        ]
    ),
    titleDesc: new Elem(
        (pos = new Pos(0.15 * WIDTH_RATIO, 0.1, 0.7 * WIDTH_RATIO, 0.45)),
        [
            new Rect(pos, '#3c3f41', 0.01, '#a9abad'),
            new Text(pos, 'THE BEST CHECKERS IN DELFT', '#fff', '25px Arial'),
        ]
    ),
    soundBtn: getCornerBtnElem('\uf028', { left: false, down: false }),
}

const gameSettingElems = {
    background: getBackgroundElem(),
    homeBtn: getCornerBtnElem('\uf015', { left: true, down: false }),
    forceJumpsChoseBtn: new Elem(
        (pos = new Pos(
            ((1 - 0.15) * WIDTH_RATIO) / 2,
            0.6,
            0.15 * WIDTH_RATIO,
            0.05
        )),
        [
            new Button(pos, '#3c3f41', 0.01, '#a9abad'),
            new Text(pos, 'ON', '#fff', '15px Arial'),
        ]
    ),
    startGameBtn: new Elem(
        (pos = new Pos(0.35 * WIDTH_RATIO, 0.75, 0.3 * WIDTH_RATIO, 0.1)),
        [
            new Button(pos, '#3c3f41', 0.01, '#a9abad'),
            new Text(pos, 'Start', '#fff', '20px Arial'),
        ]
    ),
}

const gameScreenElems = {
    background: getBackgroundElem(),
    soundBtn: getCornerBtnElem('\uf028', { left: false, down: false }),
    adviceBtn: getCornerBtnElem('\uf0eb', { left: false, down: true }),
    homeBtn: getCornerBtnElem('\uf015', { left: true, down: false }),
    undoBtn: getCornerBtnElem('\uf0e2', { left: true, down: true }),

    board: new Elem(
        (pos = new Pos(
            (WIDTH_RATIO - (1 - 0.1 * 2)) / 2,
            0.1,
            1 - 0.1 * 2,
            1 - 0.1 * 2
        )),
        [new Board(pos, 1, '#ddd')]
    ),
}

const board = gameScreenElems.board.figs[0]
let elems = homeScreenElems
