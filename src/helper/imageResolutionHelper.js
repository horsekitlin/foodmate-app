import isEmpty from 'lodash/isEmpty';

export const RESOLUTION = {
  SMALL_SQUARE: 's', // 90x90
  BIG_SQUARE: 'b',   // 160x160 square
  SMALL: 't',        // 160x160 Thumbnail
  MEDIUM: 'm',       // 320x320 Thumbnail
  LARGE: 'l',        // 640x640 Thumbnail
  HUG: 'h'           // 1024x1024 Thumbnail
}

export const getResolution = (url = '', type = RESOLUTION.SMALL) => {
  // TODO: upload a default image in order to execute resolution control
  if (url === 'https://www.bomb01.com/upload/news/original/9a8c43cd1bef6b3a0d66bd88c8cb2ee9.jpg')
    return url;
  if(isEmpty(url)) return '';
  const preString = url.split('.');
  const extent = preString.pop();
  const fileName = preString.pop();
  const result = [ ...preString, `${fileName}${type}`, extent].join('.');
  return result;
}