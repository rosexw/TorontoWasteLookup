import React from 'react';

function unescapeHTML(html) {
    var escapeEl = document.createElement('textarea');
    escapeEl.innerHTML = html;
    return escapeEl.textContent;
 }

function WasteItem(props) {
    return(
            <tr>
                <td className="WasteItem-title"> {props.title}</td>
                <td className="WasteItem-body" dangerouslySetInnerHTML={{__html: unescapeHTML(props.body)}}></td>
            </tr>
    );
}

export default WasteItem;