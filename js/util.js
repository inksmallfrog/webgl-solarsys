/*
* @Author: inksmallfrog
* @Date:   2017-05-04 10:17:29
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-04 13:35:01
*/

'use strict';
/*
 * 获得节点下的所有文本内容
 * @param node<DOMElement> 目标节点
 * @return <String> 节点下的所有文本内容
 */
function getNodeText(node){
    let text = "";
    if(node) {
        let child = node.firstChild;
        while(child){
            if(child.nodeType == 3){
                text += child.textContent;
            }
            child = child.nextSibling;
        }
    }
    return text;
}
function degToRad(degrees){
    return degrees * Math.PI / 180;
}