
/**
 * Fry generator
 */
function new_fry(x, y, behavior, is_the_one) {
    var fry = d.fries_group.create(x, y, 'fry');
    fry.visible = true;

    fry.animations.add('down_left_move', [0, 1, 2, 3]);
    fry.animations.add('down_right_move', [4, 5, 6, 7]);
    fry.animations.add('up_left_move', [12, 13, 14, 15]);
    fry.animations.add('up_right_move', [8, 9, 10, 11]);

    fry.animations.add('down_left_stop', [2]);
    fry.animations.add('down_right_stop', [6]);
    fry.animations.add('up_left_stop', [14]);
    fry.animations.add('up_right_stop', [10]);
    fry.direction = {up_down: 'down', left_right: 'left', action: 'stop'};

    if (is_the_one !== undefined) {
        fry.is_the_one = is_the_one;
    } else {
        fry.is_the_one = false;
    }

    fry.behavior = behavior;

    /**
     * Get animation name from sprite direction (state)
     */
    fry.get_animation_name = function() {
        return this.direction.up_down + '_' + this.direction.left_right + '_' + this.direction.action;
    };

    /**
     * Update direction (state) and position from behavior
     */
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

        if (this.x <= 0) { this.x = d.MOVE_SPEED; }
        if (this.x >= d.game.width - this.width) { this.x = d.game.width - this.width - d.MOVE_SPEED; }
        if (this.y <= 0) { this.y = d.MOVE_SPEED; }
        if (this.y >= d.game.height - this.height) { this.y = d.game.height - this.height - d.MOVE_SPEED; }

        this.animations.play(this.get_animation_name(), 10, true);
    };

    /**
     * Randomness to complexify behavior
     */
    fry.should_wait = function() {
        var should_wait = false;

        if (this.wait_delay == undefined) {
            this.wait_delay = rand_btw(0, 300);
            this.is_waiting = false;
        }

        this.wait_delay--;

        if (this.wait_delay == 0) {
            this.wait_delay = this.is_waiting ? rand_btw(100, 300) : rand_btw(50, 100);
            this.is_waiting = !this.is_waiting;
        }

        return this.is_waiting;
    };

    return fry;
}
