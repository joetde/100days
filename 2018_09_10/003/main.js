
var d = {}
d.WORLD_SIZE = 400;
d.MARGIN = 20;
d.BOX_SIZE = (d.WORLD_SIZE / 2) - (2 * d.MARGIN);

d.game = new Phaser.Game(d.WORLD_SIZE, d.WORLD_SIZE, Phaser.AUTO, 'd003',
{
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {
    d.game.load.audio('kick', 'kick.mp3');
    d.game.load.audio('hat', 'hat.mp3');
    d.game.load.audio('snare', 'snare.mp3');
    d.game.load.audio('crash', 'crash.mp3');
};

function newRectangle(x, y, fx) {
    var rect = d.game.add.graphics(0,0);
    rect.beginFill(0x9a9da0, 1);
    rect.drawRect(x, y, d.BOX_SIZE, d.BOX_SIZE);
    rect.inputEnabled = true;
    rect.input.useHandCursor = true;
    rect.events.onInputDown.add(onRectangleClicked, this);
    rect.events.onInputUp.add(onRectangleUnclicked, this);
    rect.fx = fx;
    return rect;
};

function changeColor(rect, newColor) {
    var x = rect.getBounds().x;
    var y = rect.getBounds().y;
    rect.clear();
    rect.beginFill(newColor, 1);
    rect.drawRect(x, y, d.BOX_SIZE, d.BOX_SIZE);

};

function onRectangleClicked(rect) {
    changeColor(rect, 0xd7dce2);
    rect.fx.play();
};

function onRectangleUnclicked(rect) {
    changeColor(rect, 0x9a9da0);
};

function create() {
    d.game.stage.backgroundColor = '#545659';

    // Add two additional multitouch possibility (2 + 2)
    d.game.input.addPointer();
    d.game.input.addPointer();

    d.kick = d.game.add.audio('kick');
    d.hat = d.game.add.audio('hat');
    d.snare = d.game.add.audio('snare');
    d.crash = d.game.add.audio('crash');
    d.game.sound.setDecodedCallback([d.kick, d.hat, d.snare, d.crash], sound_decoded, this);

    d.rects = {};
    d.rects[0] = newRectangle(d.MARGIN, d.MARGIN, d.kick);
    d.rects[1] = newRectangle(3 * d.MARGIN + d.BOX_SIZE, d.MARGIN, d.snare);
    d.rects[2] = newRectangle(d.MARGIN, 3 * d.MARGIN + d.BOX_SIZE, d.hat);
    d.rects[3] = newRectangle(3 * d.MARGIN + d.BOX_SIZE, 3 * d.MARGIN + d.BOX_SIZE, d.crash);
};

function sound_decoded() {
    console.log("Sound decoded");
}


function update() {};

function render() {};
