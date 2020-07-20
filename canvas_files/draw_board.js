/*
 * All of the Catan Cafe main code sits here. This should definitely be refactored....
 */

//----------------------------------------------------------------------------------------------------------------------
// Create the global objects, including the canvas and context.
//----------------------------------------------------------------------------------------------------------------------
var	canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

//----------------------------------------------------------------------------------------------------------------------
// Load all of the card images into memory.
//----------------------------------------------------------------------------------------------------------------------

var brick_card_image = new Image();
brick_card_image.src = "./images/cards/brick.png";

var ore_card_image = new Image();
ore_card_image.src = "./images/cards/ore.png";

var sheep_card_image = new Image();
sheep_card_image.src = "./images/cards/sheep.png";

var wheat_card_image = new Image();
wheat_card_image.src = "./images/cards/wheat.png";

var wood_card_image = new Image();
wood_card_image.src = "./images/cards/wood.png";

var knight_card_image = new Image();
knight_card_image.src = "./images/cards/knight.png";

var monopoly_card_image = new Image();
monopoly_card_image.src = "./images/cards/monopoly.png";

var year_of_plenty_card_image = new Image();
year_of_plenty_card_image.src = "./images/cards/year_of_plenty.png";

var road_building_card_image = new Image();
road_building_card_image.src = "./images/cards/road_building.png";

var victory_point_card_image = new Image();
victory_point_card_image.src = "./images/cards/victory_point.png";

// Determine the resource layout.
var random_cards = ["ore", "ore", "ore",
                           "brick", "brick", "brick",
                           "wood", "wood", "wood", "wood",
                           "sheep", "sheep", "sheep", "sheep",
                           "wheat", "wheat", "wheat", "wheat",
			   "knight", "knight", "knight",
			   "victory point", "victory point", "victory point", 
			   "year of plenty","year of plenty","year of plenty",
			   "monopoly", "monopoly", "monopoly", "monopoly", 
			   "road building", "road building", "road building", 
			];
                           

for (let i = random_cards.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * i);
const temp = random_cards[i];
random_cards[i] = random_cards[j];
random_cards[j] = temp;
}

//----------------------------------------------------------------------------------------------------------------------
// Load all of the resource type gifs into memory. Store the in arrays for use later.
//----------------------------------------------------------------------------------------------------------------------
var wheat_video = document.createElement('video');
wheat_video.muted = true;
var wheat_patterns = [];
function draw_wheat_frame(e) {
  wheat_patterns.push(context.createPattern(wheat_video, "repeat"));
}
wheat_video.addEventListener('timeupdate', draw_wheat_frame, false);
wheat_video.src = "./images/wheat2.mp4";
wheat_video.play();

var ocean_video = document.createElement('video');
ocean_video.muted = true;
var ocean_patterns = [];
function draw_ocean_frame(e) {
  ocean_patterns.push(context.createPattern(ocean_video, "repeat"));
}
ocean_video.addEventListener('timeupdate', draw_ocean_frame, false);
ocean_video.src = "./images/ocean.mp4";
ocean_video.play();

var ore_video = document.createElement('video');
ore_video.muted = true;
var ore_patterns = [];
function draw_ore_frame(e) {
  ore_patterns.push(context.createPattern(ore_video, "repeat"));
}
ore_video.addEventListener('timeupdate', draw_ore_frame, false);
ore_video.src = "./images/ore2.mp4";
ore_video.play();

var brick_video = document.createElement('video');
brick_video.muted = true;
var brick_patterns = [];
function draw_brick_frame(e) {
  brick_patterns.push(context.createPattern(brick_video, "repeat"));
}
brick_video.addEventListener('timeupdate', draw_brick_frame, false);
brick_video.src = "./images/brick.mp4";
brick_video.play();

var grass_video = document.createElement('video');
grass_video.muted = true;
var grass_patterns = [];
function draw_grass_frame(e) {
  grass_patterns.push(context.createPattern(grass_video, "repeat"));
}
grass_video.addEventListener('timeupdate', draw_grass_frame, false);
grass_video.src = "./images/yellowgrass.mp4";
grass_video.play();

var wood_video = document.createElement('video');
wood_video.muted = true;
var wood_patterns = [];
function draw_wood_frame(e) {
  wood_patterns.push(context.createPattern(wood_video, "repeat"));
}
wood_video.addEventListener('timeupdate', draw_wood_frame, false);
wood_video.src = "./images/trees3.mp4";
wood_video.play();

var desert_video = document.createElement('video');
desert_video.muted = true;
var desert_patterns = [];
function draw_desert_frame(e) {
  desert_patterns.push(context.createPattern(desert_video, "repeat"));
}
desert_video.addEventListener('timeupdate', draw_desert_frame, false);
desert_video.src = "./images/desert.mp4";
desert_video.play();


//----------------------------------------------------------------------------------------------------------------------
// Load the table and board images into pattern types, which will be used as part of the background.
//----------------------------------------------------------------------------------------------------------------------
var table_image = new Image();
var table_top_pattern;
table_image.src = "./images/table_top_blue.jpeg"
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

var nametag_image = new Image();
var nametag_pattern;
//nametag_image.src = "./images/slate.jpeg"
nametag_image.src = "./images/chalkboard.jpg"
nametag_image.onload = function() {
    nametag_pattern = context.createPattern(nametag_image, "repeat");
}

var nametag_border_image = new Image();
var nametag_border_pattern;
nametag_border_image.src = "./images/slate.jpeg"
nametag_border_image.onload = function() {
    nametag_border_pattern = context.createPattern(nametag_border_image, "repeat");
}

var chalk_image = new Image();
var chalk_pattern;
chalk_image.src = "./images/chalk.jpg"
chalk_image.onload = function() {
    chalk_pattern = context.createPattern(chalk_image, "repeat");
}


var options_image = new Image();
options_image.src = "./images/options.png"


//----------------------------------------------------------------------------------------------------------------------
// This function will load the game state from the game state file on the server.
//----------------------------------------------------------------------------------------------------------------------
function load_game_state()
    {
    // TODO Write all of this...
    return;
    }



//----------------------------------------------------------------------------------------------------------------------
// These functions will display cards for the corresponding players, based on the game state.
//----------------------------------------------------------------------------------------------------------------------

function draw_top_side_cards(num_regular, num_development)
    {
    context.fillStyle = nametag_pattern;
    context.strokeStyle = nametag_border_pattern;
    context.lineWidth = 2;
    var card_width = canvas.width * 50 / 1920;
    var card_height = canvas.height * 75 / 1080;
    var card_spacing = canvas.width * 16 / 1920;
    var first_row_y_offset = canvas.height * 16 / 1080;
    var second_row_y_offset = first_row_y_offset + 0.5*card_height;
    var total_cards = num_regular + num_development;
    var num_first_row = Math.ceil(total_cards / 2.0);
    var num_second_row = Math.floor(total_cards / 2.0);
    var first_row_x_offset = (canvas.width - num_first_row*card_width - (num_first_row - 1)*card_spacing) / 2;
    var second_row_x_offset = 0.5 * card_width + first_row_x_offset;
    for (var i = 0; i < num_first_row; i++)
        {
        var card_type = random_cards[i % random_cards.length];
        var image_type;
        if (card_type === "brick") { image_type = brick_card_image; }
        else if (card_type === "wheat") { image_type = wheat_card_image; }
        else if (card_type === "ore") { image_type = ore_card_image; }
        else if (card_type === "sheep") { image_type = sheep_card_image; }
        else if (card_type === "wood") { image_type = wood_card_image; }
        else if (card_type === "knight") { image_type = knight_card_image; }
        else if (card_type === "monopoly") { image_type = monopoly_card_image; }
        else if (card_type === "victory point") { image_type = victory_point_card_image; }
        else if (card_type === "road building") { image_type = road_building_card_image; }
        else if (card_type === "year of plenty") { image_type = year_of_plenty_card_image; }
        var x_value = first_row_x_offset + i * (card_width + card_spacing);
    	context.drawImage(image_type,
                      dx=x_value, dy=first_row_y_offset,
                      dWidth=card_width, dHeight=card_height);
        context.strokeRect(x_value, first_row_y_offset, card_width, card_height);
        }
    for (var i = 0; i < num_second_row; i++)
        {
        var card_type = random_cards[i % random_cards.length];
        var image_type;
        if (card_type === "brick") { image_type = brick_card_image; }
        else if (card_type === "wheat") { image_type = wheat_card_image; }
        else if (card_type === "ore") { image_type = ore_card_image; }
        else if (card_type === "sheep") { image_type = sheep_card_image; }
        else if (card_type === "wood") { image_type = wood_card_image; }
        else if (card_type === "knight") { image_type = knight_card_image; }
        else if (card_type === "monopoly") { image_type = monopoly_card_image; }
        else if (card_type === "victory point") { image_type = victory_point_card_image; }
        else if (card_type === "road building") { image_type = road_building_card_image; }
        else if (card_type === "year of plenty") { image_type = year_of_plenty_card_image; }
        var x_value = second_row_x_offset + i * (card_width + card_spacing);
    	context.drawImage(image_type,
                      dx=x_value, dy=second_row_y_offset,
                      dWidth=card_width, dHeight=card_height);
        context.strokeRect(x_value, second_row_y_offset, card_width, card_height);
        }
    }

function draw_bottom_side_cards(num_regular, num_development)
{
    context.fillStyle = nametag_pattern;
    context.strokeStyle = nametag_border_pattern;
    context.lineWidth = 2;
    var card_width = canvas.width * 50 / 1920;
    var card_height = canvas.height * 75 / 1080;
    var card_spacing = canvas.width * 16 / 1920;
    var first_row_y_offset = canvas.height - canvas.height * 16 / 1080 - card_height;
    var second_row_y_offset = first_row_y_offset - 0.5*card_height;
    var total_cards = num_regular + num_development;
    var num_first_row = Math.ceil(total_cards / 2.0);
    var num_second_row = Math.floor(total_cards / 2.0);
    var first_row_x_offset = (canvas.width - num_first_row*card_width - (num_first_row - 1)*card_spacing) / 2;
    var second_row_x_offset = 0.5 * card_width + first_row_x_offset;
    for (var i = 0; i < num_first_row; i++)
    {
        var x_value = first_row_x_offset + i * (card_width + card_spacing);
        context.fillRect(x_value, first_row_y_offset, card_width, card_height);
        context.strokeRect(x_value, first_row_y_offset, card_width, card_height);
    }
    for (var i = 0; i < num_second_row; i++)
    {
        var x_value = second_row_x_offset + i * (card_width + card_spacing);
        context.fillRect(x_value, second_row_y_offset, card_width, card_height);
        context.strokeRect(x_value, second_row_y_offset, card_width, card_height);
    }
}

function draw_left_side_cards(num_regular, num_development) {
    context.fillStyle = nametag_pattern;
    context.strokeStyle = nametag_border_pattern;
    context.lineWidth = 2;
    var card_width = canvas.width * 50 / 1920;
    var card_height = canvas.height * 75 / 1080;
    var card_spacing = canvas.width * 16 / 1920;
    var first_row_y_offset = (canvas.height / 2) - 2.5 * card_height - 2 * card_spacing;
    var row_offsets = [];
    for (var i = 0; i < 5; i++)
        {
        row_offsets.push(first_row_y_offset + i*(card_spacing + card_height));
        }
    var column_offsets = [];
    for (var i = 0; i < 5; i++)
        {
        column_offsets.push(4*card_spacing + i*(card_spacing + card_width));
        }
    for (var i = 0; i < num_regular + num_development; i++)
        {
        var row_idx = Math.floor(i / 5);
        var col_idx = i % 5;
        context.fillRect(column_offsets[col_idx], row_offsets[row_idx], card_width, card_height);
        context.strokeRect(column_offsets[col_idx], row_offsets[row_idx], card_width, card_height);
        }
}

function draw_right_side_cards(num_regular, num_development) {
    context.fillStyle = nametag_pattern;
    context.strokeStyle = nametag_border_pattern;
    context.lineWidth = 2;
    var card_width = canvas.width * 50 / 1920;
    var card_height = canvas.height * 75 / 1080;
    var card_spacing = canvas.width * 16 / 1920;
    var first_row_y_offset = (canvas.height / 2) - 2.5 * card_height - 2 * card_spacing;
    var row_offsets = [];
    for (var i = 0; i < 5; i++)
    {
        row_offsets.push(first_row_y_offset + i*(card_spacing + card_height));
    }
    var column_offsets = [];
    for (var i = 0; i < 5; i++)
    {
        column_offsets.push(canvas.width - (4*card_spacing + i*(card_spacing + card_width) + card_width));
    }
    for (var i = 0; i < num_regular + num_development; i++)
    {
        var row_idx = Math.floor(i / 5);
        var col_idx = i % 5;
        context.fillRect(column_offsets[col_idx], row_offsets[row_idx], card_width, card_height);
        context.strokeRect(column_offsets[col_idx], row_offsets[row_idx], card_width, card_height);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// This block will load the cup and plate icons for each player.
//----------------------------------------------------------------------------------------------------------------------

// For the left and right player, we need their names to be vertical.
function write_vertical_text(player_id, x_offset, y_offset)
    {
    context.save();
    context.rotate(Math.PI / 2.0);
    console.log("canvas width: ", canvas.width);
    var new_name = player_id[0] + ". " + player_id.slice(1);
    context.fillText(new_name, x_offset, -y_offset);
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.restore();
    }

// Bottom player.
var bottom_player_id = "HWingo";
var bottom_left_player_plate_image = new Image();
bottom_left_player_plate_image.src = "./images/hwingo_plate.png"
var bottom_left_player_cup_image = new Image();
bottom_left_player_cup_image.src = "./images/hwingo_cup.png"

// Right player.
var right_player_id = "CFreeman";
var bottom_right_player_plate_image = new Image();
bottom_right_player_plate_image.src = "./images/cfreeman_plate.png"
var bottom_right_player_cup_image = new Image();
bottom_right_player_cup_image.src = "./images/cfreeman_cup.png"

// Left player.
var left_player_id = "KFreeman";
var top_left_player_plate_image = new Image();
top_left_player_plate_image.src = "./images/kfreeman_plate.png"
var top_left_player_cup_image = new Image();
top_left_player_cup_image.src = "./images/kfreeman_cup.png"

// Top player.
var top_player_id = "SGraham";
var top_right_player_plate_image = new Image();
top_right_player_plate_image.src = "./images/sgraham_plate.png"
var top_right_player_cup_image = new Image();
top_right_player_cup_image.src = "./images/sgraham_cup.png"

function display_plate_and_cup_icons(plate_radius, cup_radius, plate_image, cup_image, plate_x, plate_y, cup_x, cup_y)
    {
    context.save();
    context.beginPath();
    context.arc(plate_x, plate_y, plate_radius, 0, Math.PI * 2, true);
    context.clip();
    context.drawImage(plate_image,
                      dx=plate_x - plate_radius, dy=plate_y - plate_radius,
                      dWidth=plate_radius*2, dHeight=plate_radius*2);
    context.restore();
    context.save();
    context.beginPath();
    context.arc(cup_x, cup_y, cup_radius, 0, Math.PI * 2, true);
    context.clip();
    context.drawImage(cup_image,
                      dx=cup_x - cup_radius, dy=cup_y - cup_radius,
                      dWidth=cup_radius*2, dHeight=cup_radius*2);
    context.restore();
    }


//----------------------------------------------------------------------------------------------------------------------
// The main action will happen here.
//----------------------------------------------------------------------------------------------------------------------

window.onload = function(){



	var	time = 0,
		cos = Math.cos,
		sin = Math.sin,
		PI = Math.PI;

	function resize() {
		width = canvas.width = window.innerWidth;
		height = canvas.height = window.innerHeight;
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
	var counter = 0;  // Use this counter to access the relevant frame number for the hex patterns.
	setInterval( function() {


        context.fillStyle = table_top_pattern;
        context.fillRect(0, 0, canvas.width, canvas.height);

        //bottom_left_player_plate_image.onload();
        //context.restore();

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

        // Get the main patterns.
        var ocean_idx = counter % ocean_patterns.length;
        var ocean_pattern = ocean_patterns[ocean_idx];

        var ore_idx = counter % ore_patterns.length;
        var ore_pattern = ore_patterns[ore_idx];

        var wood_idx = counter % wood_patterns.length;
        var wood_pattern = wood_patterns[wood_idx];

        var wheat_idx = counter % wheat_patterns.length;
        var wheat_pattern = wheat_patterns[wheat_idx];

        var grass_idx = counter % grass_patterns.length;
        var grass_pattern = grass_patterns[grass_idx];

        var brick_idx = counter % brick_patterns.length;
        var brick_pattern = brick_patterns[brick_idx];

        var desert_idx = counter % desert_patterns.length;
        var desert_pattern = desert_patterns[desert_idx];

        // Increment the counter. This will eventually overflow and roll over.
        counter += 1;

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
        context.fillStyle = ocean_pattern;
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
                    context.fillStyle = desert_pattern;
                } else if (resource_type === "ore") {
                    context.fillStyle = ore_pattern;
                } else if (resource_type === "wheat") {
                    context.fillStyle = wheat_pattern;
                } else if (resource_type === "sheep") {
                    context.fillStyle = grass_pattern;
                } else if (resource_type === "wood") {
                    context.fillStyle = wood_pattern;
                } else {
                    context.fillStyle = brick_pattern;
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


        // Draw the plates and cups.
        var plate_radius = canvas.width * 15 / 490;
        var cup_radius = canvas.width * 7.5 / 490;

        // Display the top left icons.
        var top_left_plate_center_x = canvas.width * 60 / 490;
        var top_left_plate_center_y = canvas.height * 45 / 275;
        var top_left_cup_center_x = canvas.width * 25 / 490;
        var top_left_cup_center_y = canvas.height * 22 / 275;
        display_plate_and_cup_icons(plate_radius, cup_radius,
                                    top_left_player_plate_image, top_left_player_cup_image,
                                    top_left_plate_center_x, top_left_plate_center_y,
                                    top_left_cup_center_x, top_left_cup_center_y);

        // Display the top right icons.
        var top_right_plate_center_x = canvas.width - canvas.width * 30 / 490;
        var top_right_plate_center_y = canvas.height * 30 / 275;
        var top_right_cup_center_x = canvas.width - canvas.width * 56 / 490;
        var top_right_cup_center_y = canvas.height * 46 / 275;
        display_plate_and_cup_icons(plate_radius, cup_radius,
                                    top_right_player_plate_image, top_right_player_cup_image,
                                    top_right_plate_center_x, top_right_plate_center_y,
                                    top_right_cup_center_x, top_right_cup_center_y);

        // Display the bottom left icons.
        var bottom_left_plate_center_x = canvas.width * 60 / 490;
        var bottom_left_plate_center_y = canvas.height - canvas.height * 40 / 275;
        var bottom_left_cup_center_x = canvas.width * 28 / 490;
        var bottom_left_cup_center_y = canvas.height - canvas.height * 40 / 275;
        display_plate_and_cup_icons(plate_radius, cup_radius,
                                    bottom_left_player_plate_image, bottom_left_player_cup_image,
                                    bottom_left_plate_center_x, bottom_left_plate_center_y,
                                    bottom_left_cup_center_x, bottom_left_cup_center_y);


        // Display the bottom right icons.
        var bottom_right_plate_center_x = canvas.width - canvas.width * 56 / 490;
        var bottom_right_plate_center_y = canvas.height - canvas.height * 30 / 275;
        var bottom_right_cup_center_x = canvas.width - canvas.width * 23 / 490;
        var bottom_right_cup_center_y = canvas.height - canvas.height * 18 / 275;
        display_plate_and_cup_icons(plate_radius, cup_radius,
                                    bottom_right_player_plate_image, bottom_right_player_cup_image,
                                    bottom_right_plate_center_x, bottom_right_plate_center_y,
                                    bottom_right_cup_center_x, bottom_right_cup_center_y);

        // Draw the options panel.
        var option_panel_width = canvas.width * 74 / 490;
        var option_panel_height = canvas.height * 15 / 275;
        var option_panel_x_offset = canvas.width * 3 / 490;
        var option_panel_y_offset = canvas.height - canvas.height * 3 / 275 - option_panel_height;
    	context.drawImage(options_image,
                      	  dx=option_panel_x_offset, dy=option_panel_y_offset,
                          dWidth=option_panel_width, dHeight=option_panel_height);

        //---------------------------------------
        // Draw the four name tags.
        //---------------------------------------
        var tag_length = board_side_length;
        var tag_width = tag_length / 9;
        var lr_player_x_offset = canvas.width / 2.0 - 1.2 * board_side_length;
        var lr_player_y_offset = (canvas.height - tag_length) / 2.0;

        var left_x_offset = (canvas.height - board_side_length) / 2.0 + tag_length / 2;
        var left_y_offset = canvas.width / 2.0 - 1.2 * board_side_length + tag_width / 2;

        var right_x_offset = (canvas.height - board_side_length) / 2.0 + tag_length / 2;
        var right_y_offset = canvas.width / 2.0 + 1.2 * board_side_length - tag_width / 2;

        var tb_player_x_offset = (canvas.width - tag_length) / 2.0;
        var tb_player_y_offset = canvas.height / 2.0 - 1.0 * board_side_length
        var font_size = 0.7 * tag_width;
        context.font = 'bold ' + font_size.toString() + 'px Brush Script MT';
        context.textAlign="center";
        context.textBaseline = "middle";;

        // Draw the left players name tag.
        context.beginPath();
        context.moveTo(lr_player_x_offset, lr_player_y_offset);
        context.lineTo(lr_player_x_offset, lr_player_y_offset + tag_length);
        context.lineTo(lr_player_x_offset + tag_width, lr_player_y_offset + tag_length);
        context.lineTo(lr_player_x_offset + tag_width, lr_player_y_offset);
        context.closePath();
        context.fillStyle = nametag_pattern;
        context.strokeStyle = nametag_border_pattern;
        context.lineWidth = 2;
        context.fill();
        context.stroke();
        context.fillStyle = chalk_pattern;
        write_vertical_text(left_player_id, left_x_offset, left_y_offset);

        // Draw the right players name tag.
        context.beginPath();
        context.moveTo(canvas.width - lr_player_x_offset, lr_player_y_offset);
        context.lineTo(canvas.width - lr_player_x_offset, lr_player_y_offset + tag_length);
        context.lineTo(canvas.width - lr_player_x_offset - tag_width, lr_player_y_offset + tag_length);
        context.lineTo(canvas.width - lr_player_x_offset - tag_width, lr_player_y_offset);
        context.closePath();
        context.fillStyle = nametag_pattern;
        context.strokeStyle = nametag_border_pattern;
        context.lineWidth = 2;
        context.fill();
        context.stroke();
        context.fillStyle = chalk_pattern;
        write_vertical_text(right_player_id, right_x_offset, right_y_offset);

        // Draw the top players name tag.
        context.beginPath();
        context.moveTo(tb_player_x_offset, tb_player_y_offset);
        context.lineTo(tb_player_x_offset, tb_player_y_offset + tag_width);
        context.lineTo(tb_player_x_offset + tag_length, tb_player_y_offset + tag_width);
        context.lineTo(tb_player_x_offset + tag_length, tb_player_y_offset);
        context.closePath();
        context.fillStyle = nametag_pattern;
        context.strokeStyle = nametag_border_pattern;
        context.lineWidth = 2;
        context.fill();
        context.stroke();
        context.fillStyle = chalk_pattern;
        context.fillText(top_player_id[0] + ". " + top_player_id.slice(1), tb_player_x_offset + tag_length / 2,
                         tb_player_y_offset + tag_width / 2);

        // Draw the bottom players name tag.
        context.beginPath();
        context.moveTo(tb_player_x_offset, canvas.height - tb_player_y_offset);
        context.lineTo(tb_player_x_offset, canvas.height - tb_player_y_offset - tag_width);
        context.lineTo(tb_player_x_offset + tag_length, canvas.height - tb_player_y_offset - tag_width);
        context.lineTo(tb_player_x_offset + tag_length, canvas.height - tb_player_y_offset);
        context.closePath();
        context.fillStyle = nametag_pattern;
        context.strokeStyle = nametag_border_pattern;
        context.lineWidth = 2;
        context.fill();
        context.stroke();
        context.fillStyle = chalk_pattern;
        context.fillText(bottom_player_id[0] + ". " + bottom_player_id.slice(1), tb_player_x_offset + tag_length / 2,
                         canvas.height - tb_player_y_offset - tag_width / 2);


        // Draw the cards.
        draw_top_side_cards(24, 8);
        draw_bottom_side_cards(22, 3);
        draw_left_side_cards(22, 3);
        draw_right_side_cards(22, 3);

	}, 33*5);
}
