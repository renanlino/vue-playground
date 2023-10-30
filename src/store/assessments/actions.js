import { post } from '@/lib/request'
import { ASSESSMENTS_API_URL } from '@/consts/api-urls'
import snakeCase from 'lodash/snakeCase'

export const toFormData = (answer) => {
  const formData = new FormData()
  const prefix = 'answer'

  Object.entries(answer).forEach(([key, value]) => {
    if (value && typeof value !== 'object') {
      formData.append(`${prefix}[${snakeCase(key)}]`, value)
    }
  })

  if ('file' in answer) {
    if (answer.file) {
      formData.append('answer[file]', answer.file)
    } else {
      formData.append('answer[file]', '')
    }
  }

  return formData
}

export default {
  async createAssessmentAnswer (_, answer) {
    const options = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    return post(`${ASSESSMENTS_API_URL}/assessment_answers`, toFormData(answer), options)
  }
}
