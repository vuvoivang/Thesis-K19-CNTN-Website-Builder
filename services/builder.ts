import { Node, PageData } from 'display/editor/Viewport/Header';
import { fetchWithBuildifyToken } from './config';

const uploadImage = (image: File) => {
  const formData = new FormData();
  formData.append('image', image);
  return fetchWithBuildifyToken('http://file-mgt-buildify.azurewebsites.net/upload/image', 'POST', formData, {
    'Content-Type': 'multipart/form-data',
  });
};

const genCode = (data: { nodes: Array<Node>; pages: Array<PageData> }) => {
  return fetchWithBuildifyToken('https://gencode.azurewebsites.net/api/gen-react-code', 'POST', data, {
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'cross-site',
  });
};

const builderService = {
  uploadImage,
  genCode,
};
export default builderService;
