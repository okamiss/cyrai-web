// 检测文件类型
export function getFileTypeByMime(mimeType: string) {
  if (mimeType.startsWith('image/')) {
    return 'image'
  } else if (mimeType.startsWith('video/')) {
    return 'video'
  } else if (mimeType.startsWith('audio/')) {
    return 'audio'
  } else if (mimeType.startsWith('text/')) {
    return 'document'
  } else if (mimeType.startsWith('application/pdf')) {
    return 'document'
  } else if (
    mimeType.startsWith('application/msword') ||
    mimeType.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.')
  ) {
    return 'document'
  } else if (
    mimeType.startsWith('application/vnd.ms-excel') ||
    mimeType.startsWith('application/vnd.openxmlformats-officedocument.spreadsheetml.')
  ) {
    return 'spreadsheet'
  } else if (
    mimeType.startsWith('application/vnd.ms-powerpoint') ||
    mimeType.startsWith('application/vnd.openxmlformats-officedocument.presentationml.')
  ) {
    return 'presentation'
  } else if (
    mimeType.startsWith('application/zip') ||
    mimeType.startsWith('application/x-rar-compressed')
  ) {
    return 'archive'
  } else if (mimeType.startsWith('application/json')) {
    return 'data'
  } else if (mimeType.startsWith('application/javascript')) {
    return 'code'
  } else if (mimeType.startsWith('application/xml')) {
    return 'code'
  } else if (mimeType.startsWith('multipart/form-data')) {
    return 'formData'
  } else {
    return 'unknown'
  }
}

export const timeCalc = (e: string) => {
  const sendT = new Date(e).getTime()
  const nowT = new Date().getTime()
  const sxt = Math.floor((nowT - sendT) / 1000)

  if (sxt < 1) {
    return '刚刚'
  } else if (sxt < 60) {
    return `${sxt}秒前`
  } else if (sxt < 3600) {
    return `${Math.floor(sxt / 60)}分钟前`
  } else if (sxt < 3600 * 24) {
    return `${Math.floor(sxt / 3600)}小时前`
  } else if (sxt < 3600 * 24 * 31) {
    return `${Math.floor(sxt / (3600 * 24))}天前`
  } else if (sxt < 3600 * 24 * 365) {
    return `${Math.floor(sxt / (3600 * 24 * 31))}月前`
  } else {
    return `${Math.floor(sxt / (3600 * 24 * 365))}年前`
  }
}
