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
