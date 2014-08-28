
// inlets and outlets
inlets  = 1;
outlets = 1;

var items = [];
var timeout = null;

function list (value) {
	if(arguments.length > 1) {
		outlet(0, arguments);
	}	
}

function clear() {
	items = [];
	cancelTimer();
}

function cancelTimer() {
	if (timeout !== null) {
		timeout.cancel();
		timeout = null;		
	}
}

function append(value) {
		// cancel previous call if still around
	cancelTimer();

	timeout = new Task(send, this);
	timeout.schedule(200);

	items.push(value);
}

function send() {
		// Send the list out
	var command = "_parameter_range";

		// Set the list
	outlet(0, command, items.sort());
	// messnamed("foo", command, items.sort());

	outlet(0, 0);
	
	timeout = null;
	items = [];
}