
/*
 *  This script contains functions which will draw the catan board on the canvas.
 */
window.onload = function(){
	var	canvas = document.querySelector("canvas"),
		context = canvas.getContext( '2d' ),
		time = 0,
		cos = Math.cos,
		sin = Math.sin,
		PI = Math.PI;

	function resize() {
		width = canvas.width = window.innerWidth;
		height = canvas.height = window.innerHeight;
	}


	//------------------------------------------------------------------------------------------\
	// Some video stuff.
	//------------------------------------------------------------------------------------------
    var wheat_video = document.createElement('video');
    wheat_video.loop = true;
    wheat_video.muted = true;
    var wheat_vid_pattern;
    function draw_wheat_frame(e) {
      wheat_video.pause();
      wheat_vid_pattern = context.createPattern(wheat_video, "repeat");
      wheat_video.play();
    }
    wheat_video.addEventListener('timeupdate', draw_wheat_frame, false);
    wheat_video.src = "./images/wheat2.mp4";
    wheat_video.width = 50;
    wheat_video.height = 100;
    wheat_video.play();

    var ocean_video = document.createElement('video');
    ocean_video.loop = true;
    ocean_video.muted = true;
    var ocean_vid_pattern;
    function draw_ocean_frame(e) {
      ocean_video.pause();
      ocean_vid_pattern = context.createPattern(ocean_video, "repeat");
      ocean_video.play();
    }
    ocean_video.addEventListener('timeupdate', draw_ocean_frame, false);
    ocean_video.src = "./images/ocean.mp4";
    ocean_video.play();

    var ore_video = document.createElement('video');
    ore_video.loop = true;
    ore_video.muted = true;
    var ore_vid_pattern;
    function draw_ore_frame(e) {
      ore_video.pause();
      ore_vid_pattern = context.createPattern(ore_video, "repeat");
      ore_video.play();
    }
    ore_video.addEventListener('timeupdate', draw_ore_frame, false);
    ore_video.src = "./images/ore2.mp4";
    ore_video.play();

    var brick_video = document.createElement('video');
    brick_video.loop = true;
    brick_video.muted = true;
    var brick_vid_pattern;
    function draw_brick_frame(e) {
      brick_video.pause();
      brick_vid_pattern = context.createPattern(brick_video, "repeat");
      brick_video.play();
    }
    brick_video.addEventListener('timeupdate', draw_brick_frame, false);
    brick_video.src = "./images/brick.mp4";
    brick_video.play();

    var grass_video = document.createElement('video');
    grass_video.loop = true;
    grass_video.muted = true;
    var grass_vid_pattern;
    function draw_grass_frame(e) {
      grass_video.pause();
      grass_vid_pattern = context.createPattern(grass_video, "repeat");
      grass_video.play();
    }
    grass_video.addEventListener('timeupdate', draw_grass_frame, false);
    grass_video.src = "./images/grass2.mp4";
    grass_video.play();

    var wood_video = document.createElement('video');
    wood_video.loop = true;
    wood_video.muted = true;
    var wood_vid_pattern;
    function draw_wood_frame(e) {
      wood_video.pause();
      wood_vid_pattern = context.createPattern(wood_video, "repeat");
      wood_video.play();
    }
    wood_video.addEventListener('timeupdate', draw_wood_frame, false);
    wood_video.src = "./images/trees3.mp4";
    wood_video.play();

    var desert_video = document.createElement('video');
    desert_video.loop = true;
    desert_video.muted = true;
    var desert_vid_pattern;
    function draw_desert_frame(e) {
      desert_video.pause();
      desert_vid_pattern = context.createPattern(desert_video, "repeat");
      desert_video.play();
    }
    desert_video.addEventListener('timeupdate', draw_desert_frame, false);
    desert_video.src = "./images/desert.mp4";
    desert_video.play();

	//------------------------------------------------------------------------------------------
	// Load all of the fill pattern images / videos.
	//------------------------------------------------------------------------------------------
	var table_image = new Image();
	var table_top_pattern;
	table_image.src = "./images/table_top.jpeg"
	table_image.onload = function() {
        table_top_pattern = context.createPattern(table_image, "repeat");
	}

	var board_outer_image = new Image();
	var board_outer_pattern;
	board_outer_image.src = "./images/dark_wood.jpg"
	board_outer_image.onload = function() {
        board_outer_pattern = context.createPattern(board_outer_image, "repeat");
	}

	var board_inner_image = new Image();
	var board_inner_pattern;
	board_inner_image.src = "./images/inner_wood_lighter.jpg"
	board_inner_image.onload = function() {
        board_inner_pattern = context.createPattern(board_inner_image, "repeat");
	}

	// Monitor browser resize
	addEventListener( 'resize', resize, false );

	// Initial size
	resize();

	// Determine the resource layout.
    var resource_layout = ["ore", "ore", "ore",
                           "brick", "brick", "brick",
                           "wood", "wood", "wood", "wood",
                           "sheep", "sheep", "sheep", "sheep",
                           "wheat", "wheat", "wheat", "wheat",
                           "desert"];

    for (let i = resource_layout.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = resource_layout[i];
      resource_layout[i] = resource_layout[j];
      resource_layout[j] = temp;
    }

	// The main animation loop
	setInterval( function() {

	    // The background color.
	    context.fillStyle = table_top_pattern;
        context.fillRect(0, 0, canvas.width, canvas.height);

        //-------------------------------------------------------------------------------------------------------------
        // Define structural parameters to layout the board, using ratios relative to the 1920 x 1080 resolution.
        //-------------------------------------------------------------------------------------------------------------

        // Define the dimensions of the main board.
        board_side_length = canvas.width * 360 / 1920;
        board_inner_side_length = 0.95 * board_side_length;
        board_x_offset = canvas.width / 2.0;
        board_y_offset = canvas.height / 2.0;

        // Define the dimensions of the hexes.
        rows = [3, 4, 5, 4, 3];  // These are the number of hexagons in each row of the board.
        hex_side_length = Math.sqrt(3) * board_side_length / 10.0;
        hex_starting_x = board_x_offset - 2 * Math.sqrt(3) * hex_side_length;
        hex_starting_y = board_y_offset - 3 * hex_side_length;


        //-------------------------------------------------------------------------------------------------------------
        // Draw the board and its hexes.
        //-------------------------------------------------------------------------------------------------------------

        // First draw the board.
        context.beginPath();
        context.moveTo(board_x_offset + board_side_length * Math.cos(0),
                       board_y_offset + board_side_length * Math.sin(0));
        for (var side = 0; side < 7; side++)
            {
            var new_x = board_x_offset + board_side_length * Math.cos(side * 2 * Math.PI / 6);
            var new_y = board_y_offset + board_side_length * Math.sin(side * 2 * Math.PI / 6);
            context.lineTo(new_x, new_y);
            }
        context.fillStyle = board_outer_pattern;
        context.fill();

        // Then draw the inner board.
        context.beginPath();
        context.moveTo(board_x_offset + board_inner_side_length * Math.cos(0),
                       board_y_offset + board_inner_side_length * Math.sin(0));
        for (var side = 0; side < 7; side++)
            {
            var new_x = board_x_offset + board_inner_side_length * Math.cos(side * 2 * Math.PI / 6);
            var new_y = board_y_offset + board_inner_side_length * Math.sin(side * 2 * Math.PI / 6);
            context.lineTo(new_x, new_y);
            }
        //context.fillStyle = board_inner_pattern;
        context.fillStyle = ocean_vid_pattern;
        context.fill();

        // Then, draw the hexes.
        var hex_y_offset = hex_starting_y;
        var hex_num = 0;
        for (var idx = 0; idx < rows.length; idx++)
            {
            var hex_x_offset = hex_starting_x;
            var hex_count = rows[idx];
            if (hex_count === 3)
                {
                hex_x_offset += Math.sqrt(3) * hex_side_length;
                }
            else if (hex_count === 4)
                {
                hex_x_offset += Math.sqrt(3) * hex_side_length / 2.0;
                }
            for (var hex = 0; hex < hex_count; hex++)
                {
                context.beginPath();
                context.moveTo(hex_x_offset + hex_side_length * Math.cos(Math.PI / 2),
                               hex_y_offset + hex_side_length * Math.sin(Math.PI / 2));
                for (var side = 0; side < 7; side++)
                    {
                    var new_x = hex_x_offset + hex_side_length * Math.cos(Math.PI / 2 + side * 2 * Math.PI / 6);
                    var new_y = hex_y_offset + hex_side_length * Math.sin(Math.PI / 2 + side * 2 * Math.PI / 6);
                    context.lineTo(new_x, new_y);
                    }
                //context.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
                resource_type = resource_layout[hex_num];
                if (resource_type === "desert") {
                    context.fillStyle = desert_vid_pattern;
                } else if (resource_type === "ore") {
                    context.fillStyle = ore_vid_pattern;
                } else if (resource_type === "wheat") {
                    context.fillStyle = wheat_vid_pattern;
                } else if (resource_type === "sheep") {
                    context.fillStyle = grass_vid_pattern;
                } else if (resource_type === "wood") {
                    context.fillStyle = wood_vid_pattern;
                } else {
                    context.fillStyle = brick_vid_pattern;
                }
                hex_num += 1;
                context.strokeStyle = board_outer_pattern;
                context.lineWidth = 5;
                context.fill();
                context.stroke();
                hex_x_offset += Math.sqrt(3) * hex_side_length;
                }
            hex_y_offset += 1.5 * hex_side_length;
            }

	}, 1);
}