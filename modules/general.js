const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
};
const htmlUnescapes = {
'&amp;': '&',
'&lt;': '<',
'&gt;': '>',
'&quot;': '"',
'&#39;': "'",
'&ldquo;': '"',
'&rdquo;': '"',
'&lsquo;': "'",
'&rsquo;': "'"
};
		
/** Used to match HTML entities and HTML characters. */
const reUnescapedHtml = /[&<>"'“”‘’]/g;
const reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
const sidedDoubleQuote = /[“”]/g;
const hasSidedDobleQuotes = RegExp(sidedDoubleQuote.source);
const sidedSingleQuote = /[‘’]/g;
const hasSidedSingleQuotes = RegExp(sidedSingleQuote.source);
const reEscapedHtml = /&(?:amp|lt|gt|quot|ldquo|rdquo|lsquo|rsquo|#(0+)?39);/g;
const reHasEscapedHtml = RegExp(reEscapedHtml.source);
const _regrex = /[^a-zA-Z0-9\n"\~`'!@#\$%\^&\*\(\)_.\+\-={}\[\]:;<,>\?/ ]*/gm;

function general_unescape(string) {
    return (string && reHasEscapedHtml.test(string))?
		string.replace(reEscapedHtml, (entity) => (htmlUnescapes[entity] || "'") ) :
		(string || '');
}
function general_escape (string) {
    return (string && reHasUnescapedHtml.test(string))?
		string.replace(reUnescapedHtml, (chr) => htmlEscapes[chr]):
		(string || '');
}
function general_replaceSidedQuotes(string) {
    let replacedString= string;
    if(string && (hasSidedDobleQuotes.test(string)|| hasSidedSingleQuotes.test(string))){
        replacedString = string.replace(sidedDoubleQuote,'"');
        replacedString = replacedString.replace(sidedSingleQuote,"'");
    }
    return replacedString;
}
function general_replaceWithRegExp(text) {
    text = general_replaceSidedQuotes(text);
    text = text.replace(_regrex, "");
    return text;
}
