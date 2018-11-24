
function nothing_behavior(object) {
    return {is_up: false,
            is_down: false,
            is_left: false,
            is_right: false};
};

function rotate_clockwise_behavior(object) {
    var dir = nothing_behavior(object);
    var x = Math.floor(object.x + (object.width / 2));
    var y = Math.floor(object.y + (object.height / 2));
    var h = d.game.height;
    var w = d.game.width;

    var in_top_left_triangle = (x + y) < ((h + w) / 2);
    var in_top_right_triangle = x >= y;

    var keep_moving = !object.should_wait();

    if (in_top_left_triangle && in_top_right_triangle) {
        dir.is_right = keep_moving;
    } else if (in_top_left_triangle && !in_top_right_triangle) {
        dir.is_up = keep_moving;
    } else if (!in_top_left_triangle && in_top_right_triangle) {
        dir.is_down = keep_moving;
    } else {
        dir.is_left = keep_moving;
    }

    return dir;
};

function rotate_anticlockwise_behavior(object) {
    var dir = nothing_behavior(object);
    var x = Math.floor(object.x + (object.width / 2));
    var y = Math.floor(object.y + (object.height / 2));
    var h = d.game.height;
    var w = d.game.width;

    var in_top_left_triangle = (x + y) < ((h + w) / 2);
    var in_top_right_triangle = x >= y;

    var keep_moving = !object.should_wait();

    if (in_top_left_triangle && in_top_right_triangle) {
        dir.is_left = keep_moving;
    } else if (in_top_left_triangle && !in_top_right_triangle) {
        dir.is_down = keep_moving;
    } else if (!in_top_left_triangle && in_top_right_triangle) {
        dir.is_up = keep_moving;
    } else {
        dir.is_right = keep_moving;
    }

    return dir;
};
