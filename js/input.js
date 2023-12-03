const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_SPACE = 32;

let holdLeft = false
let holdRight = false
let holdSpace = false

function initInput() {
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
}

function setKeyHoldState(thisKey, setTo) {
    if(thisKey == KEY_LEFT_ARROW) {
        holdLeft = setTo;
    }
    if(thisKey == KEY_RIGHT_ARROW) {
        holdRight = setTo;
    }
    if(thisKey == KEY_UP_ARROW) {
        if(player.onGround) {
            player.speedY = -JUMP_POWER;
            player.onGround = false
        }
    }
    
    if (thisKey == KEY_SPACE) {
        holdSpace = setTo
    }
}

function keyPressed(evt) {
    setKeyHoldState(evt.keyCode, true);
    
    // prevent the page from scrolling when pressing arrow keys
    if ([KEY_LEFT_ARROW, KEY_RIGHT_ARROW, KEY_UP_ARROW, KEY_DOWN_ARROW].includes(evt.keyCode)) {
        evt.preventDefault(); 
    }
}

function keyReleased(evt) {
    setKeyHoldState(evt.keyCode, false);
}