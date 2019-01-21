import React from 'react';

function unescapeHTML(html) {
    var escapeEl = document.createElement('textarea');
    escapeEl.innerHTML = html;
    return escapeEl.textContent;
 }

function WasteItem(props) {
    const favIcon = props.isFave ?
        <i className="fa fa-lg fa-star isFave"></i> :
        <i className="fa fa-lg fa-star isNotFave"></i>;
    return(
        <tr className="WasteItem-row">
            <td><button className="fav-button" onClick={props.toggleFave}>{favIcon}</button></td>
            <td className="WasteItem-title">
                {props.title}
            </td>
            <td className="WasteItem-body" dangerouslySetInnerHTML={{__html: unescapeHTML(props.body)}}></td>
        </tr>
    );
}

export default WasteItem;