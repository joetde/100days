
var d = {}
var MODE_AUTO = 0;
var MODE_PLAY = 1;
d.WORLD_SIZE = 400;
d.MARGIN = 20;
d.BOX_SIZE = (d.WORLD_SIZE / 2) - (2 * d.MARGIN);
d.MODE = MODE_AUTO;

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

    // rect.timer = d.game.time.create(false);
    // rect.timer.loop(100, () => onRectangleUnclicked(rect), this);
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
    // rect.timer.stop();
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
    d.rects[0].partition = "x-x-----x-------";
    d.rects[1].partition = "----x-------xxxx";
    d.rects[2].partition = "x-x-x-x-x-x-x-x-";
    d.rects[3].partition = "x---------------";

    d.tick_timer = d.game.time.create(false);
    d.tick_timer.loop(200, tick, this);
    if (d.MODE == MODE_AUTO) { d.tick_timer.start(); }
    d.tick_timer.tick_increment = 0;
};

function tick() {
    if (d.MODE == MODE_PLAY) { d.tick_timer.stop(); return; }

    for (var i = 0; i < 4; i++) {
        onRectangleUnclicked(d.rects[i]);
        if (d.rects[i].partition[d.tick_timer.tick_increment % d.rects[i].partition.length] == "x") {
            onRectangleClicked(d.rects[i]);
            // d.rects[i].timer.loop(100, () => onRectangleUnclicked(d.rects[i]), this);
            // d.rects[i].timer.start();
        }
    }

    d.tick_timer.tick_increment++;
}

function sound_decoded() {
    console.log("Sound decoded");
}

function update() {};

function render() {};
