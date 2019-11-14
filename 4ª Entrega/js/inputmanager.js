var _input_key;
var _input_keyDown;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function _input_onKeyDown(e) {
    let keyCode = e.keyCode;
    _input_key[keyCode] = true;
    _input_keyDown[keyCode] = true;
    //Key is considered pressed down for the next 100ms
    await sleep(100);
    _input_keyDown[keyCode] = false;

}

function _input_onKeyUp(e) {
    let keyCode = e.keyCode;
    _input_key[keyCode] = false;
}

function input_init() {
    _input_key = new Array(128).fill(false);
    _input_keyDown = new Array(128).fill(false);
    window.addEventListener("keydown", _input_onKeyDown);
    window.addEventListener("keyup", _input_onKeyUp);
}

function input_getKey(keyCode) {
    return (typeof keyCode == "string") ? _input_key[keyCode.charCodeAt(0)] : _input_key[keyCode];
}

function input_getKeyDown(keyCode) {
    let keyVal = (typeof keyCode == "string") ? keyCode.charCodeAt(0) : keyCode;
    if (_input_keyDown[keyVal]) {
        _input_keyDown[keyVal] = false;
        return true;
    }
    return false;
}
