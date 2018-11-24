
d.MOVE_SPEED = 2;

d.game = new Phaser.Game(600, 600, Phaser.CANVAS, 'd030',
{
    preload: preload,
    create: create,
    update: update,
    render: render
});

d.engine = {
    is_started : false,
    is_paused  : false,

    start : function() {
        d.fries.forEach(f => f.visible = true);
        this.is_started = true;
        this.is_paused = false;
    },

    stop : function() {
        d.fries.forEach(f => f.visible = false);
        this.is_started = true;
        this.is_paused = false;
    }
};

function preload() {
    d.game.load.path = '../assets/';
    d.game.load.spritesheet('fry', 'images/fry_spritesheet.png', 60, 60);

    d.game.load.bitmapFont('carrier_command',
        'fonts/carrier_command.png',
        'fonts/carrier_command.xml');
}

function rand_btw(a, b) {
    return Math.floor((Math.random() * (b-a)) + a);
};

function click_win() {
};

function click_lose() {
};

function create() {
    d.game.stage.backgroundColor = '#545659';
    d.fries_group = d.game.add.group();

    d.fries = [new_fry(100, 100, rotate_anticlockwise_behavior, true)];
    for (var i = 0; i < 50; i++) {
        d.fries.push(new_fry(rand_btw(d.MOVE_SPEED,
            d.game.width - 60 - d.MOVE_SPEED),
            rand_btw(d.MOVE_SPEED, d.game.height - 60 - d.MOVE_SPEED),
            rotate_clockwise_behavior));
    }

    // Few updates to shuffle a bit those fries
    for (var i = 0; i < 100; i++) {
        d.fries.forEach(f => f.update());
    }

    d.text_score = d.game.add.bitmapText(10, 10, 'carrier_command','0', 10);

    d.menus.create(); // Last, just to be on top...
    d.game.input.keyboard.onDownCallback = key_down_dispatch;
};

function key_down_dispatch(key) {
    if (d.engine.is_started && key.keyCode == Phaser.Keyboard.ESC) {
        d.engine.is_paused = !d.engine.is_paused;
    }

    d.menus.on_key_down(key);
}

function update() {
    if (!d.engine.is_started || d.engine.is_paused) { return; }

    d.text_score.text = parseInt(d.text_score.text) + 1;
    // d.fries.forEach(f => f.update());

    var ptr = d.game.input.activePointer;
    if (ptr.isDown) {
        var clicked_on_the_one = false;
        d.fries.forEach(f => {
            if (f.getBounds().contains(ptr.x, ptr.y)) {
                if (f.is_the_one) {
                    clicked_on_the_one = true;
                    return;
                }
            }
        });

        if (clicked_on_the_one) {
            click_win();
        } else {
            click_lose();
        }
    }

    d.fries_group.sort('y', Phaser.Group.SORT_ASCENDING);

};

function render() {};
