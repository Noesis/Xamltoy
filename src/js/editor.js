let errorMarks = [], editor = null, xamlReady = false;

document.getElementById('run-button').onclick = () => { runCode() }

runCode();

function runCode() {
    clearErrors();
    if (noesisReady && gistFetched) {
        if(!xamlReady){
            xamlReady = true;
            editor.setValue(xaml);
        }
        document.getElementById('errorLog').innerHTML = ""; // Remove all previous errors
        for (const [key, value] of Object.entries(resources)) {
            Module.ccall('LoadResource', null, ['string', 'array', 'number'], [key, value, value.length]);
        }
        resources = {};
        Module.ccall('UpdateXaml', null, ['string'], [editor.getValue()]);
    } else setTimeout(() => { runCode(); }, 300);
}

function clearErrors(){
    if(errorMarks)errorMarks.forEach(mark =>  mark.clear())
        errorMarks = [];
}

function completeAfter(cm, pred) {
    let predResult;
    if (pred) predResult = pred();
    if (!pred || predResult.hint) setTimeout(function () {
        if (!cm.state.completionActive)
            cm.showHint({
                completeSingle: false,
                matchInMiddle: true
            });
    }, 100);
    if (pred && predResult.skipkey) return false;
    return CodeMirror.Pass;
}

function completeIfAfterLt(cm) {
    return this.completeAfter(cm, function () {
        var cur = cm.getCursor();
        return cm.getRange(CodeMirror.Pos(cur.line, cur.ch - 1), cur) === "<";
    });
}

function completeIfInTag(cm, key) {
    return this.completeAfter(cm, function () {
        var tok = cm.getTokenAt(cm.getCursor());
        let currentCursor = cm.getCursor();
        if (tok.type === "string" && (!/['"]/.test(tok.string.charAt(tok.string.length - 1)) || tok.string.length === 1)) return false;
        var inner = CodeMirror.innerMode(cm.getMode(), tok.state).state;
        let replaceWithAttrValue = inner.tagName != null && key === '=' && cm.getTokenAt(currentCursor).type !== "string";
        let markupExtension = inner.tagName != null && (key === '{' || key === '=') && cm.getTokenAt(currentCursor).type === "string";
        if (replaceWithAttrValue) {
            cm.replaceRange('=""', { line: currentCursor.line, ch: currentCursor.ch })
            cm.setCursor({ line: currentCursor.line, ch: currentCursor.ch + 2 })
        }
        if (markupExtension) {
            if (key === '{') {
                cm.replaceRange('{}', { line: currentCursor.line, ch: currentCursor.ch })
                cm.setCursor({ line: currentCursor.line, ch: currentCursor.ch + 1 })
                return { hint: inner.tagName, skipkey: true };
            }
            return { hint: inner.tagName, skipkey: false };
        }
        return { hint: inner.tagName, skipkey: replaceWithAttrValue };
    });
}

function generateErrorMessage(log, lineNumber) {
    let node = document.createElement("div");
    let errorText = "";
    if (lineNumber && editor.getLine(lineNumber - 1)) errorText = "Line " + lineNumber + log.substring(log.indexOf(")") + 1);
    else errorText = log.substring(log.indexOf("]") + 1);
    let errorMessage = document.createTextNode(errorText);
    let iconBg = document.createElement("div");
    iconBg.className = "errorIconBg";
    let icon = document.createElement("i");
    icon.className = "fas fa-times-circle";
    node.appendChild(iconBg);
    node.appendChild(icon);
    node.appendChild(errorMessage);
    node.classList.add('error');
    node.style.cursor = 'pointer';
    if (lineNumber) node.onclick = () => {
        editor.focus();
        editor.setCursor({
            line: lineNumber - 1,
            ch: editor.getLine(lineNumber - 1).length
        });
        var coord = editor.charCoords({ line: lineNumber - 1, ch: 0 }, "local");
        var middleHeight = editor.getScrollerElement().offsetHeight / 2;
        editor.scrollTo(coord.left, coord.top - middleHeight);
    }
    errorLog.appendChild(node);
}

function hightlightLine(lineNumber) {
    if (editor) errorMarks.push(
        editor.markText(
            { line: lineNumber, ch: 0 },
            { line: lineNumber, ch: 10000 },
            {
                className: 'highlighted',
                inclusiveLeft: true,
                inclusiveRight: true
            })
    )
}

let _privateError = console.error;
console.error = function () {
    _privateError.apply(console, arguments);
    var logs = Array.prototype.slice.call(arguments);
    logs.forEach(log => {
        if (log.includes("[NOESIS/E]")) {
            let lineNumber = log.substring(log.indexOf("(") + 1, log.indexOf(")"));
            generateErrorMessage(log, lineNumber);
            hightlightLine(lineNumber - 1);
        }
    });
}

document.addEventListener("keydown", (e) => {
    // ctrl/cmd + s
    if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) && e.keyCode === 83) {
        e.preventDefault();
        runCode();
    }
    // alt + enter
    if ((window.navigator.platform.match("Mac") ? e.altKey : e.altKey) && e.keyCode === 13) {
        e.preventDefault();
        runCode();
    }
});

editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    mode: 'xml',
    xmlHint: true,
    value: 'Loading...',
    autoCloseTags: true,
    lineNumbers: true,
    tabSize: 2,
    foldGutter: true,
    hintOptions: { schemaInfo: Schema },
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    extraKeys: {
        "Ctrl-Space": (cm) => this.completeAfter(cm),
        "'<'": (cm) => this.completeAfter(cm),
        "'/'": (cm) => this.completeIfAfterLt(cm),
        "'='": (cm) => this.completeIfInTag(cm, '='),
        "'{'": (cm) => this.completeIfInTag(cm, '{'),
        "' '": (cm) => this.completeIfInTag(cm, ' '),
        Tab: (cm) => {
            if (cm.somethingSelected()) {
                cm.indentSelection("add");
            } else {
                cm.replaceSelection(cm.getOption("indentWithTabs") ? "\t" :
                    Array(cm.getOption("indentUnit") + 1).join(" "), "end", "+input");
            }
        }
    }
});
editor.save();