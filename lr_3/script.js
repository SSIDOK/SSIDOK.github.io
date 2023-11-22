var tab;
var tabContent;

window.onload = function() {
    tabContent = document.getElementsByClassName('tabContent');
    tab = document.getElementsByClassName('tab');
    hideTabsContent(1);
}

function hideTabsContent(a) {
    for (var i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add("hide");
        tab[i].classList.remove('whiteborder');
    }
}

document.getElementById('tabs').onclick = function(event) {
    var target = event.target;
    if (target.className == 'tab') {
        for (var i = 0; i < tab.length; i++) {
            if (target == tab[i]) {
                showTabsContent(i);
                break;
            }
        }
    }
}

function showTabsContent(b) {
    if (tabContent[b].classList.contains('hide')) {
        hideTabsContent(0);
        tab[b].classList.add('whiteborder');
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
    }
}

function generate() {
    var rtl = document.getElementById('rtl').value;
    var rtr = document.getElementById('rtr').value;
    var rbr = document.getElementById('rbr').value;
    var rbl = document.getElementById('rbl').value;

    var mt = document.getElementById('mt').value;
    var mr = document.getElementById('mr').value;
    var mb = document.getElementById('mb').value;
    var ml = document.getElementById('ml').value;

    var maxHeight = document.getElementById('maxHeight').value;
    var maxHeightValue = document.getElementById('maxHeightValue');
    maxHeightValue.value = maxHeight;

    var block = document.getElementById('block');
    block.style.borderRadius = rtl + "px " + rtr + "px " + rbr + "px " + rbl + "px";
    //block.style.margin = mt + "px " + mr + "px " + mb + "px " + ml + "px";

    var cssCode = document.getElementById('cssCode');
    cssCode.value = "border-radius: " + rtl + "px " + rtr + "px " + rbr + "px " + rbl + "px;\n";
    cssCode.value += "margin: " + mt + "px " + mr + "px " + mb + "px " + ml + "px;\n";
    cssCode.value += "max-height: " + maxHeight + "px;";

    var ttl = document.getElementById('ttl');
    var ttr = document.getElementById('ttr');
    var tbr = document.getElementById('tbr');
    var tbl = document.getElementById('tbl');

    var mtValue = document.getElementById('mtValue');
    var mrValue = document.getElementById('mrValue');
    var mbValue = document.getElementById('mbValue');
    var mlValue = document.getElementById('mlValue');

    ttl.value = rtl;
    ttr.value = rtr;
    tbr.value = rbr;
    tbl.value = rbl;

    mtValue.value = mt;
    mrValue.value = mr;
    mbValue.value = mb;
    mlValue.value = ml;

    
}
generate();
