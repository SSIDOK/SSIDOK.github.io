var myList = document.querySelector('ul');
      var myInput = document.querySelector('input');
      var myButton = document.querySelector('button');

      myButton.onclick = function() {
        var myListItem = myInput.value;
        myInput.value = '';

        var mySecondListItem = document.createElement("li");
        var mySpan = document.createElement("span");
        var mySecondButton = document.createElement("button");
        var myEditButton = document.createElement("button");

        mySecondButton.innerHTML = "Delete";
        myEditButton.innerHTML = "Edit";
        mySecondListItem.appendChild(mySpan);
        mySecondListItem.appendChild(mySecondButton);
        mySecondListItem.appendChild(myEditButton);

        mySpan.textContent = myListItem;
        myList.appendChild(mySecondListItem);

        mySecondButton.onclick = function() {
          myList.removeChild(mySecondListItem);
        }

        myEditButton.onclick = function() {
          var updatedText = prompt("Edit the item:", mySpan.textContent);
          if (updatedText !== null) {
            mySpan.textContent = updatedText;
          }
        }
      }