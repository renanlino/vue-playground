import { post } from '@/lib/request'
import { ASSESSMENTS_API_URL } from '@/consts/api-urls'

export default {
  async createAssessmentAnswer (_, answer) {
    return post(`${ASSESSMENTS_API_URL}/assessment_answers`, {
      answer: answer
    })
  }
}
