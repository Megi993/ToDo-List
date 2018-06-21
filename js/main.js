// Variables
var ul = document.getElementById("taskList");
var task = document.getElementById("task");
var btn = document.querySelector('button');
var listItem = document.getElementsByTagName("LI");
task.focus();

// Append close btn to each list item
for (var i = 0; i < listItem.length; i++) {
    // Create a <span> node
    var span = document.createElement("SPAN");
    // Create a text node
    var txt = document.createTextNode("\u00D7");
    span.className = "js-close";
    // Append the text to <span>
    span.appendChild(txt);
    // Append <span> to <li>
    listItem[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("js-close");
for (var i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        this.parentNode.parentNode.removeChild(this.parentNode);
    }
}

// check if ul list exist, if we don't check that it's possible that all JS stop working
if (ul) {
    ul.onmouseover = function (event) {
        var target = event.target;
        target.className = 'js-background';
    };

    ul.onmouseout = function (event) {
        var target = event.target;
        target.className = '';
    };
}

// Add item to list on btn
btn.addEventListener('click', addItem);

// Add item to list on enter
task.onkeyup = function (e) {
    if (e.keyCode == 13) {
        addItem();
        this.blur();
    }
};

// Add item to list
function addItem() {
    // remove extra space
    var inputValue = task.value.trim();
    task.value = "";
    task.blur();

    // Empty values don't allow in list
    if (!inputValue) {
        var modal = document.getElementById('myModal');
        var spanClose = document.getElementsByClassName("close")[0];

        modal.classList.remove('js-hide');

        spanClose.onclick = function () {
            modal.classList.add('js-hide');
        };

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.classList.add('js-hide');
            }
        };
        return
    }
    // Duplicate values don't allow in list
    var listItem = document.querySelectorAll("#taskList li");
    for (var i = 0; i < listItem.length; i++) {
        if (inputValue == listItem[i].firstChild.textContent) {
            var modal = document.getElementById('modalDuplicate');
            var spanClose = document.getElementsByClassName("close")[1];

            modal.classList.remove('js-hide');

            spanClose.onclick = function () {
                modal.classList.add('js-hide');
            };

            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.classList.add('js-hide');
                }
            };
            return
        }
    }

    var li = document.createElement("li");
    li.setAttribute('id', inputValue);
    li.appendChild(document.createTextNode(inputValue));
    ul.appendChild(li);

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "js-close";
    span.appendChild(txt);
    li.appendChild(span);

    for (var i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            this.parentNode.parentNode.removeChild(this.parentNode);
        }
    }
}