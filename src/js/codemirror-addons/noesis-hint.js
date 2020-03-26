// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE
/* eslint no-undef: "off"*/
/*eslint-disable */

(function (mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("codemirror/lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["codemirror/lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function (CodeMirror) {
  "use strict";

  var Pos = CodeMirror.Pos;

  function matches(hint, typed, matchInMiddle) {
    if (matchInMiddle) return hint.toLowerCase().indexOf(typed.toLowerCase()) >= 0;
    else return hint.toLowerCase().lastIndexOf(typed.toLowerCase(), 0) == 0;
  }

  function getHints(cm, options) {
    var tags = options && options.schemaInfo;
    var attached = tags["!attached"];
    var quote = (options && options.quoteChar) || '"';
    var matchInMiddle = options && options.matchInMiddle;
    if (!tags) return;
    var cur = cm.getCursor(), token = cm.getTokenAt(cur);
    if (token.end > cur.ch) {
      token.end = cur.ch;
      token.string = token.string.slice(0, cur.ch - token.start);
    }
    var inner = CodeMirror.innerMode(cm.getMode(), token.state);
    if (!inner.mode.xmlCurrentTag) return
    var result = [], replaceToken = false, prefix;
    var tag = /\btag\b/.test(token.type) && !/>$/.test(token.string);
    var tagName = tag && /^\w/.test(token.string), tagStart;
    var line = cm.getLine(cur.line);
    var markupExtensionMode = /{+.*/.test(token.string) && token.type === "string";
    if (tagName) {
      var before = cm.getLine(cur.line).slice(Math.max(0, token.start - 2), token.start);
      var tagType = /<\/$/.test(before) ? "close" : /<$/.test(before) ? "open" : null;
      if (tagType) tagStart = token.start - (tagType == "close" ? 2 : 1);
    } else if (tag && token.string == "<") {
      tagType = "open";
    } else if (tag && token.string == "</") {
      tagType = "close";
    }
    var tagInfo = inner.mode.xmlCurrentTag(inner.state)
    if(markupExtensionMode){ //MarkupExtension: {Tag Attribute=value}
      let markupTags = getMarkupTags(tags, inner);
      let prefix = token.string.replace(/.*{\s*/, '');
      if(prefix.includes(',')){ // Markup attribute separated by commas
        let curMarkup = prefix.substring(prefix.lastIndexOf('{'));
        let curMarkupTag = curMarkup.substring(0,curMarkup.indexOf(' '));
        prefix = prefix.slice(prefix.lastIndexOf(',')+2);
        if(prefix.includes(' ')) prefix = prefix.slice(prefix.lastIndexOf(' ')+1);
        for (var attr in getAttrs(tags, tags[curMarkupTag]))  if (!prefix || matches(attr, prefix, matchInMiddle)) 
          if ( (!tags[curMarkupTag].type || tags[curMarkupTag].type !== 'abstract') && !curMarkup.includes(attr)) result.push(attr);
        result = result.sort();
        return {
          selectedHint: getBestMatch(prefix, result),
          list: result,
          from: Pos(cur.line, cur.ch - prefix.length),
          to: Pos(cur.line, token.end)
        };
      } 
      if(prefix.includes('=')){ // Markup attribute value
        let curMarkup = prefix.split(' ')[0];
        let curAttr = prefix.substring(curMarkup.length+1,prefix.indexOf('='));
        let valuePrefix = prefix.split('=')[1];
        let hintValues = getMarkupValue(tags, curMarkup, curAttr);
        if(Array.isArray(hintValues)) for (var i = 0; i < hintValues.length; ++i) {
          if (!valuePrefix || matches(hintValues[i], valuePrefix, matchInMiddle)){
            result.push(hintValues[i]); 
          } 
        }
        result = result.sort();
        return {
          selectedHint: getBestMatch(valuePrefix, result),
          list: result,
          from: Pos(cur.line, cur.ch - valuePrefix.length),
          to: Pos(cur.line, token.end)
        };
      }
      if(prefix.includes(' ')){ // Markup attribute
        let curMarkup = prefix.substring(0, prefix.lastIndexOf(' '));
        if(prefix.includes(' ')) prefix = prefix.slice(prefix.lastIndexOf(' ')+1);
        for (var attr in getAttrs(tags, tags[curMarkup]))  if (!prefix || matches(attr, prefix, matchInMiddle)) 
          if (!tags[curMarkup].type || tags[curMarkup].type !== 'abstract') result.push(attr);
        result = result.sort();
        return {
          selectedHint: getBestMatch(prefix, result),
          list: result,
          from: Pos(cur.line, cur.ch - prefix.length),
          to: Pos(cur.line, token.end)
        };
      }else{// Markup Tag
        for (var i = 0; i < markupTags.length; i++) if (!prefix || matches(markupTags[i], prefix, matchInMiddle))
          if (!tags[markupTags[i]].type || tags[markupTags[i]].type !== 'abstract') result.push(markupTags[i]);
        return {
          selectedHint: getBestMatch(prefix, result),
          list: result,
          from: Pos(cur.line, cur.ch - prefix.length),
          to: Pos(cur.line, token.end)
        };
      }
    }
    if (!tag && !tagInfo || tagType) {
      if (tagName)
        prefix = token.string;
      replaceToken = tagType;
      var context = inner.mode.xmlCurrentContext ? inner.mode.xmlCurrentContext(inner.state) : []
      var inner = context.length && context[context.length - 1]
      var curTag = inner && tags[inner]
      var childList = inner ? curTag && getChildren(tags, curTag) : tags["!top"];
      var attributeTagMode = inner? inner.indexOf('.') > -1 : false;
      //attached properties
      if(curTag) if(attached){
        for (var tag in attached){
          for (var attr in attached[tag]){
            if (!prefix || matches(tag+"."+attr, prefix, matchInMiddle)) result.push("<" + tag + "." + attr);
          } 
        } 
      }
      //Look for attributes of current tag and include them in result
      if (attributeTagMode) {
        let tagsForAtrr = getTagsForAttr(tags, inner);
        for(var i = 0; i< tagsForAtrr.length; i++) if (!prefix || matches(tagsForAtrr[i], prefix, matchInMiddle)) 
          if ( (!tags[tagsForAtrr[i]].type || tags[tagsForAtrr[i]].type !== 'abstract') ) result.push("<" + tagsForAtrr[i]);
      }
      if (inner && curTag) {
        for (var attr in getAttrs(tags, curTag))  if (!prefix || matches(inner+"."+attr, prefix, matchInMiddle)) 
          if (!tags[inner].type || tags[inner].type !== 'abstract') result.push("<" + inner + "." + attr);
      }
      if (childList && tagType != "close") {
        for (var i = 0; i < childList.length; ++i) if (!prefix || matches(childList[i], prefix, matchInMiddle))
          if (!tags[childList[i]].type || tags[childList[i]].type !== 'abstract') result.push("<" + childList[i]);
      }
      result = result.sort();
      if (inner && (!prefix || tagType == "close" && matches(inner, prefix, matchInMiddle)))
        result.push("</" + inner + ">");
    } else {
      // Attribute completion
      var curTag = tagInfo && tags[tagInfo.name];
      if (!curTag) return; // only for tag nodes
      var attrs = {};
      Object.assign(attrs, tags["!attrs"]);
      var tagAttrs = getAttrs(tags, curTag);
      if (tagAttrs) Object.assign(attrs, tagAttrs);
      if (attached) {
        for (var tag in attached){
          for (var attr in attached[tag]){
            attrs[tag + "." + attr] = attached[tag][attr];
          }
        }
      }
      if (token.type == "string" || token.string == "=") { // A value
        var before = cm.getRange(Pos(cur.line, Math.max(0, cur.ch - 60)),
          Pos(cur.line, token.type == "string" ? token.start : token.end));
        var atName = before.match(/([^\s\u00a0=<>\"\']+)=$/), atValues;
        if (!atName || !attrs.hasOwnProperty(atName[1]) || !(atValues = attrs[atName[1]])) return;
        if (typeof atValues == 'function') atValues = atValues.call(this, cm); // Functions can be used to supply values for autocomplete widget
        if (token.type == "string") {
          prefix = token.string;
          var n = 0;
          if (/['"]/.test(token.string.charAt(0))) {
            quote = token.string.charAt(0);
            prefix = token.string.slice(1);
            n++;
          }
          var len = token.string.length;
          if (/['"]/.test(token.string.charAt(len - 1))) {
            quote = token.string.charAt(len - 1);
            prefix = token.string.substr(n, len - 2);
          }
          if (n) { // an opening quote
            var line = cm.getLine(cur.line);
            if (line.length > token.end && line.charAt(token.end) == quote) token.end++; // include a closing quote
          }
          replaceToken = true;
        }      
        if(Array.isArray(atValues)) for (var i = 0; i < atValues.length; ++i) {
          if (!prefix || matches(atValues[i], prefix, matchInMiddle)){
            result.push(quote + atValues[i] + quote); 
          } 
        }
      } else { // An attribute name
        if (token.type == "attribute") {
          prefix = token.string;
          replaceToken = true;
        }
        for (var attr in attrs) if (attrs.hasOwnProperty(attr) && (!prefix || matches(attr, prefix, matchInMiddle))){
          if (!line.includes(" " + attr + "=")) result.push(attr.concat('=""'));
        }
      }
      result = result.sort();
    }
    return {
      selectedHint: getBestMatch(cm.getTokenAt(cm.getCursor()).string, result),
      list: result,
      from: replaceToken ? Pos(cur.line, tagStart == null ? token.start : tagStart) : cur,
      to: replaceToken ? Pos(cur.line, token.end) : cur
    };
  }

  function getMarkupTags(tags, inner){
    let childList = [];
    for (let tagName in tags) {
      if(tags[tagName].type === "markup") childList.push(tagName)
    }
    return childList;
  }

  function getTagsForAttr(tags, inner) {
    let tagName, attrName;
    let innerArray = inner.split('.');
    tagName = innerArray[0], attrName = innerArray[1];
    // get tag attrs
    let attrs = {};
    let tag = tags[tagName];
    if (tag && tag.attrs) Object.assign(attrs, tag.attrs);
    // append attached attrs
    let attached = tags["!attached"][tagName];
    if (attached) Object.assign(attrs, attached);
    // get attr type
    let type = attrs[attrName];
    // array type will show the list of available options
    if (!type || Array.isArray(type)) return [];
    // find tags that inherit from attr type
    let childList = [type];
    for (let t in tags) {
      if (t !== type) {
        let base = tags[t].base;
        while (base) {
          if (childList.includes(base)) {
            childList.push(t);
            break;
          }
          base = tags[base].base;
        }
      }
    }
    return childList;
  }

  function getAttrs(tags, curTag) {
    if(!curTag) return;
    let attrs = curTag.attrs;
    if (curTag.base != undefined) {
      let parentAttr = getAttrs(tags, tags[curTag.base]);
      Object.keys(parentAttr).forEach(function eachKey(key) {
        attrs[key] = parentAttr[key];
      });
    }
    return attrs;
  }

  function getMarkupValue(tags, markupAttr, curAttr) {
    if(!markupAttr || !curAttr) return;
    let currentMarkup = tags[markupAttr];
    if(!currentMarkup.attrs) return;
    if(Array.isArray(currentMarkup.attrs[curAttr])) return currentMarkup.attrs[curAttr];
    let valueList = [];
    let parent = tags[currentMarkup.attrs[curAttr]];
    if (parent) {
      let parentAttr = getAttrs(tags, parent);
      Object.keys(parentAttr).forEach(function eachKey(key) {
        if(parentAttr[key]){
          if(Array.isArray(parentAttr[key])){
            Object.keys(parentAttr[key]).forEach(function eachKey(value){
              valueList.push(parentAttr[key][value])
            })
          }else valueList.push(parentAttr[key]);
        }
      });
    }
    return valueList;
  }

  function getChildren(tags, curTag) {
    let childList = [];
    let base = curTag.base;
    if (curTag.children) Object.keys(curTag.children).forEach(function eachKey(key) {
      if (!childList.includes(curTag.children[key])){
        childList.push(curTag.children[key]);
      }
    });
    while(base){
      if (tags[base].children) Object.keys(tags[base].children).forEach(function eachKey(key) {
        if (!childList.includes(tags[base].children[key])){
          childList.push(tags[base].children[key]);
        }
      });
      base = tags[base].base;
    }
    for (let tagName in tags){
      let currentBase = tags[tagName].base;
      while (currentBase){
        if(childList.includes(currentBase)){
          if(!childList.includes(tagName)) childList.push(tagName);
          break;
        }else{
          if(!currentBase) break;
          currentBase = currentBase.base;
        }
      }
    }
    return childList;
  }

  function getBestMatch(prefix, hints) {
    if(!prefix) return 0;
    prefix = prefix.toLowerCase();
    for (let i=0; i<hints.length; i++){
      let hintValue = hints[i].toLowerCase().replace('<','');
      if(hintValue.startsWith(prefix)) return i;
    }
    return 0;
  }

  CodeMirror.registerHelper("hint", "xml", getHints);
});