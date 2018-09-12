
var d002 = {}
d002.WORLD_SIZE = 400;
d002.MARGIN = 20;
d002.BOX_SIZE = (d002.WORLD_SIZE / 2) - (2 * d002.MARGIN);

d002.game = new Phaser.Game(d002.WORLD_SIZE, d002.WORLD_SIZE, Phaser.AUTO, 'd002',
{
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {};

function newRectangle(x, y) {
    var rect = d002.game.add.graphics(0,0);
    rect.beginFill(0x5cb297, 1);
    rect.drawRect(x, y, d002.BOX_SIZE, d002.BOX_SIZE);
    rect.inputEnabled = true;
    rect.input.useHandCursor = true;
    rect.events.onInputDown.add(onRectangleClicked, this);
    rect.events.onInputUp.add(onRectangleUnclicked, this);
    return rect;
};

function changeColor(rect, newColor) {
    var x = rect.getBounds().x;
    var y = rect.getBounds().y;
    rect.clear();
    rect.beginFill(newColor, 1);
    rect.drawRect(x, y, d002.BOX_SIZE, d002.BOX_SIZE);

};

function onRectangleClicked(rect) {
    changeColor(rect, 0xce6397);
};

function onRectangleUnclicked(rect) {
    changeColor(rect, 0x5cb297);
};

function create() {
    d002.game.stage.backgroundColor = '#5a98fc';

    d002.rects = {};
    d002.rects[0] = newRectangle(d002.MARGIN, d002.MARGIN);
    d002.rects[1] = newRectangle(3 * d002.MARGIN + d002.BOX_SIZE, d002.MARGIN);
    d002.rects[2] = newRectangle(d002.MARGIN, 3 * d002.MARGIN + d002.BOX_SIZE);
    d002.rects[3] = newRectangle(3 * d002.MARGIN + d002.BOX_SIZE, 3 * d002.MARGIN + d002.BOX_SIZE);
};


function update() {};

function render() {};
