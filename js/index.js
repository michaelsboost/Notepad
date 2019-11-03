// load file function
function loadfile(input) {
  var reader = new FileReader();
  var path = input.value;
  reader.onload = function(e) {
    if (path.toLowerCase().substring(path.length - 4 === ".txt")) {
      notepad.value = e.target.result;
    } else {
      alertify.error("Sorry Notepad does not support that file type. Please only load .txt files.");
    }
  };
  reader.readAsText(input.files[0]);
};
function dropfile(file) {
  var reader = new FileReader();
  reader.onload = function(e) {
    notepad.value = e.target.result;
  };
  reader.readAsText(file, "UTF-8");
}

// clear notepad
newBtn.onclick = function() {
  notepad.value = "";
};

// open file in notepad
openfile.onchange = function() {
  loadfile(this);
};
notepad.ondrop = function(e) {
  this.value = "";
  e.preventDefault();
  var file = e.dataTransfer.files[0];
  dropfile(file);
};

// export file 
saveBtn.onclick = function() {
  alertify.prompt("File name below! (.txt added on save)", "", function (e, value) {
    var blob = new Blob([notepad.value], {type: "text/plain"});
    saveAs(blob, value + ".txt");
  }, function() {
    alertify.error("Abandoned export operation.");
  });
};

// remember notepad text in localStorage
if (localStorage.getItem("notepad")) {
  notepad.value = localStorage.getItem("notepad", this.value);
}
function rememberStorage() {
  if (!this.value) {
	localStorage.clear();
  } else {
	localStorage.setItem("notepad", this.value);
  }
};
notepad.onkeyup = function() {
  rememberStorage();
};
notepad.onchange = function() {
  rememberStorage();
};