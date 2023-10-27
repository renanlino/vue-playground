import { Deserializer } from 'jsonapi-serializer'
import mapKeys from 'lodash/mapKeys'
import camelCase from 'lodash/camelCase'

const JSONAPIDeserializer = new Deserializer({ keyForAttribute: 'camelCase' })

export default {
  async parse (payload) {
    if (!payload || !payload.data) { return undefined }

    const serializedData = await JSONAPIDeserializer.deserialize(payload)

    if (payload.meta) {
      serializedData.meta = mapKeys(payload.meta, (_, key) => camelCase(key))
    }

    return serializedData
  }
}
