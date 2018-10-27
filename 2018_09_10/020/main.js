
var d = {}
d.MOVE_SPEED = 2;

d.game = new Phaser.Game(600, 600, Phaser.CANVAS, 'd016',
{
    preload: preload,
    create: create,
    update: update,
    render: render
});

// TODO should be an obect...
function new_fry() {
    fry = d.game.add.sprite(100, 100, 'fry');
    fry.animations.add('down_left_move', [0, 1, 2, 3]);
    fry.animations.add('down_right_move', [4, 5, 6, 7]);
    fry.animations.add('up_left_move', [12, 13, 14, 15]);
    fry.animations.add('up_right_move', [8, 9, 10, 11]);

    fry.animations.add('down_left_stop', [2]);
    fry.animations.add('down_right_stop', [6]);
    fry.animations.add('up_left_stop', [14]);
    fry.animations.add('up_right_stop', [10]);
    fry.direction = {up_down: 'down', left_right: 'left', action: 'stop'};

    return fry;
}

function preload() {
    d.game.load.path = '../assets/images/';
    d.game.load.spritesheet('fry', 'fry_spritesheet.png', 60, 60);
}

function create() {
    d.game.stage.backgroundColor = '#545659';

    d.fry = new_fry();

    d.up_key = d.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    d.down_key = d.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    d.left_key = d.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    d.right_key = d.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

};

function update() {
    // TODO changed
    d.fry.direction.action = 'stop';

    if (d.up_key.isDown) {
        d.fry.y -= d.MOVE_SPEED;
        d.fry.direction.up_down = 'up';
        d.fry.direction.action = 'move';
    } else if (d.down_key.isDown) {
        d.fry.y += d.MOVE_SPEED;
        d.fry.direction.up_down = 'down';
        d.fry.direction.action = 'move';
    }

    if (d.left_key.isDown) {
        d.fry.x -= d.MOVE_SPEED;
        d.fry.direction.left_right = 'left';
        d.fry.direction.action = 'move';
    } else if (d.right_key.isDown) {
        d.fry.x += d.MOVE_SPEED;
        d.fry.direction.left_right = 'right';
        d.fry.direction.action = 'move';
    }

    d.fry.animations.play(d.fry.direction.up_down + '_' + d.fry.direction.left_right + '_' + d.fry.direction.action, 10, true);
};

function render() {};
