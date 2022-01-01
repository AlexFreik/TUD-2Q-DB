const gameScreenElems = {
    background: background,
    soundBtn: soundBtn,
    homeBtn: homeBtn,

    board: new Elem(
        (ratioPos = new RatioCnvPos(
            (WIDTH_RATIO - (1 - 0.1 * 2)) / 2,
            0.1,
            1 - 0.1 * 2,
            1 - 0.1 * 2
        )),
        [new Board(ratioPos, 1, '#ddd')]
    ),

    turn: new Elem(
        (ratioPos = new RatioCnvPos(0, 0, WIDTH_RATIO, 0.1)),
        [new Text(ratioPos, '', '#ddd', '20px Arial')],
        function () {
            this.drawDynamicTxt(0, 'Turn: ' + '"' + game.turn + '"')
        }
    ),
    eatenPiecesStat: new Elem(
        (ratioPos = new RatioCnvPos(WIDTH_RATIO - 0.15, 0, 0.1, 1)),
        [
            new Text(ratioPos, 'Eaten:', '#ddd', '20px Arial'),
            new Text(ratioPos.shift(0, 0.05), '', '#ddd', '20px Arial'),
            new Text(ratioPos.shift(0, 0.1), '', '#ddd', '20px Arial'),
        ],
        function () {
            this.drawDynamicTxt(
                1,
                '"1" - ' + game.getEatenPiecesNum(Setup.PLAYER_0)
            )
            this.drawDynamicTxt(
                2,
                '"2" - ' + game.getEatenPiecesNum(Setup.PLAYER_1)
            )
        }
    ),
    gameId: new Elem(
        (ratioPos = new RatioCnvPos(0, 0.9, WIDTH_RATIO, 0.1)),
        [new Text(ratioPos, '', '#ddd', '20px Arial')],
        function () {
            this.drawDynamicTxt(0, 'gameId: ' + game.gameId)
        }
    ),
}

const board = gameScreenElems.board.figs[0]

gameScreenElems.board.onclick = (event) => {
    board.processClick(AbsCnvPos.constructFromEvent(event))
}
