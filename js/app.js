/*
 * Transform back each
 * <span>preText <span class="highlighted">stxt</span> postText</span>
 * into its original
 * preText stxt postText
 */
var dehighlight = function(container)
{
    showRows(container);

    var childNodesLength = container.childNodes.length;

    for(var i = 0; i < childNodesLength; i++)
    {
        var node = container.childNodes[i];
        if (node.attributes && node.attributes['class'] && node.attributes['class'].value == 'highlighted')
        {
            node.parentNode.parentNode.replaceChild(
                document.createTextNode(
                    node.parentNode.innerHTML.replace(/<[^>]+>/g, "")),
                node.parentNode);
            // Stop here and process next parent
            return;
        }
        else if (node.nodeType != 3)
        {
            // Keep going onto other elements
            dehighlight(node);
        }
    }
}

/*
 * Create a
 * <span>preText <span class="highlighted">stxt</span> postText</span>
 * around each search stxt
 */
var highlight = function(stxt, container)
{
    var length = container.childNodes.length;

    for(var i = 0; i < length; i++)
    {
        var node = container.childNodes[i];

        if (node.nodeType == 3)
        {
            // Text node
            var data = node.data;
            var data_low = data.toLowerCase();
            if (data_low.indexOf(stxt) >= 0)
            {
                //stxt found!
                if(!hasClass(node.parentNode.parentNode, 'header'))
                {
                    node.parentNode.parentNode.setAttribute("class", "active");
                }

                var new_node = document.createElement('span');
                node.parentNode.replaceChild(new_node, node);
                var result;
                while ((result = data_low.indexOf(stxt)) != -1)
                {
                    new_node.appendChild(document.createTextNode(
                        data.substr(0, result)));
                    new_node.appendChild(create_node(
                        document.createTextNode(data.substr(
                            result, stxt.length))));
                    data = data.substr(result + stxt.length);
                    data_low = data_low.substr(result + stxt.length);
                }
                new_node.appendChild(document.createTextNode(data));
            }
        }
        else
        {
            // Keep going onto other elements
            highlight(stxt, node);
        }
    }
}

var create_node = function(child)
{
    var node = document.createElement('span');
    node.setAttribute('class', 'highlighted');
    node.attributes['class'].value = 'highlighted';
    node.appendChild(child);
    return node;
}

var hideRows = function(container)
{
    var trs = container.getElementsByTagName("tr");
    var trLength = trs.length;

    for(var i=0;i < trLength;i++)
    {
        if(!hasClass(trs[i], 'header'))
        {
            if(!hasClass(trs[i], 'active'))
            {
                trs[i].setAttribute("style", "display:none");
            }
        }
    }
}

var showRows = function(table)
{
    var trs = table.getElementsByTagName("tr");
    var trLength = trs.length;

    for(var i=0;i < trLength;i++)
    {
        if(!hasClass(trs[i], 'header'))
        {
            trs[i].setAttribute("class", "");
            trs[i].setAttribute("style", "");
        }
    }
}

var hasClass = function(element, cls)
{
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

var filterTable = function(stxt, table)
{
    dehighlight(document.getElementById(table));
    if (stxt.value.length > 0)
    {
        highlight(stxt.value.toLowerCase(), document.getElementById(table));
        if(document.getElementById('hideTr').checked)
        {
            setTimeout(function() {
                hideRows(document.getElementById(table));
            },100);
        }
    }
}