
var d = {}
d.MOVE_SPEED = 2;

d.game = new Phaser.Game(600, 600, Phaser.CANVAS, 'd020',
{
    preload: preload,
    create: create,
    update: update,
    render: render
});

function new_fry(x, y, behavior) {
    var fry = d.game.add.sprite(x, y, 'fry');
    fry.animations.add('down_left_move', [0, 1, 2, 3]);
    fry.animations.add('down_right_move', [4, 5, 6, 7]);
    fry.animations.add('up_left_move', [12, 13, 14, 15]);
    fry.animations.add('up_right_move', [8, 9, 10, 11]);

    fry.animations.add('down_left_stop', [2]);
    fry.animations.add('down_right_stop', [6]);
    fry.animations.add('up_left_stop', [14]);
    fry.animations.add('up_right_stop', [10]);
    fry.direction = {up_down: 'down', left_right: 'left', action: 'stop'};

    fry.behavior = behavior;

    fry.get_animation_name = function() {
        return this.direction.up_down + '_' + this.direction.left_right + '_' + this.direction.action;
    };

    fry.update = function() {
        this.direction.action = 'stop';

        var key = this.behavior(this);

        if (key.is_up) {
            this.y -= d.MOVE_SPEED;
            this.direction.up_down = 'up';
            this.direction.action = 'move';
        } else if (key.is_down) {
            this.y += d.MOVE_SPEED;
            this.direction.up_down = 'down';
            this.direction.action = 'move';
        }

        if (key.is_left) {
            this.x -= d.MOVE_SPEED;
            this.direction.left_right = 'left';
            this.direction.action = 'move';
        } else if (key.is_right) {
            this.x += d.MOVE_SPEED;
            this.direction.left_right = 'right';
            this.direction.action = 'move';
        }

        this.animations.play(this.get_animation_name(), 10, true);
    };

    return fry;
}

function preload() {
    d.game.load.path = '../assets/images/';
    d.game.load.spritesheet('fry', 'fry_spritesheet.png', 60, 60);
}

function nothing_behavior(object) {
    return {is_up: false,
            is_down: false,
            is_left: false,
            is_right: false};
}

function keyboard_behavior(object) {
    return {is_up: d.up_key.isDown,
            is_down: d.down_key.isDown,
            is_left: d.left_key.isDown,
            is_right: d.right_key.isDown};
}

function create() {
    d.game.stage.backgroundColor = '#545659';

    d.fries = [new_fry(100, 100, keyboard_behavior), new_fry(200, 200, nothing_behavior)];

    d.up_key = d.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    d.down_key = d.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    d.left_key = d.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    d.right_key = d.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
};

function update() {
    d.fries.forEach(f => f.update());
};

function render() {};
