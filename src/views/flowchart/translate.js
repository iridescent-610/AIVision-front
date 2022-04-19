
const description = [
  { key: 'Basic', name: '基本元素' },
  { key: 'OCR', name: 'OCR相关预置模型' },
  { key: 'Video', name: '视频相关预置模型' },
  { key: 'Other', name: '其他预置模型' }
]

export const transDict = description.reduce((s, cur) => {
  s[cur.key] = cur.name
  return s
}, {})
