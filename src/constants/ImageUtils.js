import {PRE_DOMAIN} from "./Urls";
export const TYPES = {
    tn65:"tn65",
    tn248:"tn248",
    bg320:"bg320",
    bg:"bg",
};
export default function (image_url,type) {
    let _image = image_url;
    if(image_url===undefined||image_url===null)return;
    if(image_url instanceof Array){
        _image = image_url[0];
    }
    let oldImageUrl = 'http://imageproxy-skms.themeetgroup.com/images.meetmecdna.com/thumb_userimages/__SIZE__';
    let newImageUrl = 'http://images.meetmecdna.com/thumb_userimages/square';
    let isRedirectUrl = _image.indexOf('http://imageproxy-skms.themeetgroup.com/images.meetmecdna.com/thumb_userimages/__SIZE__') === 0;
    let isNotJpgType = _image.endsWith('.jpg') || _image.endsWith('.png');
    let replaceUrl = isRedirectUrl ? _image.replace(oldImageUrl, newImageUrl) : _image;
    let img = PRE_DOMAIN+':3335?__people_image=' + replaceUrl;//使用自己的服务器进行图片流转发
    // let img = replaceUrl;
    img += (isNotJpgType ? '' : ('_'+(type||'tn65')+'.jpg'));
    return img.trim();
};