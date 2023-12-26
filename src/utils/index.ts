export const Utils = {
  /**
   * base64转Blob
   * 调用方式 const blob = base64ToBlob(b64Data, contentType);
   * @param {string} b64Data base64正文
   * @param {string} contentType 正文类型类型
   * @param sliceSize {number} 切片大小
   * @return {Blob} blob对象
   */
  base64ToBlob: (b64Data: string, contentType: string = '', sliceSize: number = 512): Blob => {
    if (b64Data.indexOf(';base64,') > -1) {
      const parts = b64Data.split(';base64,');
      b64Data = parts[1];
      contentType = parts[0].split(':')[1];
    }

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  },
  /**
   * base64转Blob异步
   * @param {string} b64Data base64正文
   * @param {string} contentType 正文类型类型
   * @return {Promise<Blob>}
   */
  b64toBlob: async (b64Data: string, contentType: string = 'application/octet-stream'): Promise<Blob> => {
    let base64 = '';
    if (b64Data.indexOf(';base64,') > -1) {
      base64 = b64Data;
    } else {
      base64 = `data:${contentType};base64,${b64Data}`;
    }

    const res = await fetch(base64);
    return await res.blob();
  }
}
