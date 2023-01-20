let selectedText;
let definitionBox;
let detailBox;
let viewBtn;

document.addEventListener("dblclick", function (event) {
  selectedText = window.getSelection().toString();

  if (definitionBox) {
    definitionBox.remove();
  }
  if (detailBox) {
    detailBox.remove();
  }
  if (viewBtn) {
    viewBtn.remove();
  }
  var rect = window.getSelection().getRangeAt(0).getBoundingClientRect();

  definitionBox = document.createElement("div");
  definitionBox.innerHTML = "Loading...";
  definitionBox.setAttribute("class", "def-box");
  definitionBox.style.cssText = " position: absolute; background-color: rgb(236, 245, 255); color: rgb(94, 94, 94); border: 1px solid rgb(255, 153, 0); border-radius: 3px; padding: 5px 2px; box-shadow: 0px 0px 5px rgb(91, 87, 87);";
  document.body.appendChild(definitionBox);

  definitionBox.style.top = rect.top + 20 + window.scrollY + "px";
  definitionBox.style.left = rect.left + window.scrollX + "px";

  const xhr = new XMLHttpRequest();
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedText}`;
  xhr.open("GET", url);
  xhr.send();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.response);
        definitionBox.innerHTML = data[0].meanings[0].definitions[0].definition;

        viewBtn = document.createElement("a");
        viewBtn.innerText = "View more...";
        viewBtn.addEventListener("click", () => {
          detailBox = document.createElement("div");
          detailBox.innerHTML = '';
          detailBox.setAttribute("class", "detail-box");
          detailBox.style.cssText = "position : absolute; width:300px; z-index : 99999; background-color: rgb(236, 245, 255); color: rgb(94, 94, 94); border: 1px solid rgb(255, 153, 0); border-radius: 3px; padding: 5px 10px; box-shadow: 0px 0px 5px rgb(91, 87, 87);";
          detailBox.innerHTML = `<p><b>Word</b> &nbsp &nbsp &nbsp &nbsp &nbsp: ${selectedText.toUpperCase()}<p>
                                 <p><b>Meaning</b> &nbsp &nbsp : ${data[0].meanings[0].definitions[0].definition}</p>
                                 <p><b>Example</b> &nbsp &nbsp : ${data[0].meanings[0].definitions[0].example}</p>`;
          document.body.appendChild(detailBox);
          detailBox.style.top = rect.top + 20+ window.scrollY + "px";
          detailBox.style.left = rect.left + window.scrollX + "px";
          definitionBox.remove();
          viewBtn.remove();
        });
        document.querySelector(".def-box").appendChild(viewBtn);
        viewBtn.setAttribute('class','view-btn');
        viewBtn.style.cssText = "cursor : pointer;";
      } else {
        definitionBox.innerHTML = "No definitions found";
      }
    }
  }
});
document.addEventListener("click", function (event) {
  if (!event.target.classList.contains("def-box") && !event.target.classList.contains("view-btn") && !event.target.parentNode.classList.contains("detail-box")) {
    if (definitionBox) {
      definitionBox.remove();
    }
    if (detailBox) {
      detailBox.remove();
    }
    if (viewBtn) {
      viewBtn.remove();
    }
  }
});