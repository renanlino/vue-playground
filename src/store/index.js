import { createStore } from 'vuex'

import assessments from './assessments'

export const modules = {
  assessments
}

const store = createStore({ modules })

export default store
