/*
* @Author: inksmallfrog
* @Date:   2017-05-04 10:17:29
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-11 10:33:33
*/

'use strict';
/*
 * 获得节点下的所有文本内容
 * @param node<DOMElement> 目标节点
 * @return <String> 节点下的所有文本内容
 */
export function getNodeText(node){
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
export function degToRad(degrees){
    return degrees * Math.PI / 180;
}