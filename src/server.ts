// src/server.js
import { createServer, Model, Response } from 'miragejs'

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    models: {
      institution: Model,
      document: Model
    },

    seeds(server) {
      server.create('institution', { index: 'NTU', value: 'NTU', label: 'nanyang' })
      server.create('institution', { index: 'NUS', value: 'NUS', label: 'nus' })
    },

    routes() {
      this.namespace = 'api'

      this.get('/institutions', (schema, _request) => {
        // const queryParams = request.queryParams;
        // console.log(queryParams, 'what my queryparms')
        const insti = schema.institutions.all().models //.findBy({value: queryParams?.q?.toUpperCase()})
        return new Response(200, {}, { results: insti, success: true })
      })

      // Mock DELETE request to remove a document
      this.delete('/document/item/:fileId', (schema, request) => {
        const fileId = request.params.fileId
        schema.documents.find(fileId).destroy()
        return new Response(204)
      })

      // Mock POST request to link a document
      this.post('/document', (schema, request) => {
        const payload = JSON.parse(request.requestBody)
        const document = schema.documents.create(payload)
        return document
      })

      // for testing get all documents
      this.get('/document', (schema, request) => {
        const documents = schema.documents.all()
        return documents
      })
    }
  })
}
