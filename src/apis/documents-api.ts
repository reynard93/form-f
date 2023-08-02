// not going to use all these common-axios auth related stuff, going to stiumulate the api instead
const documentUrl = process.env.DOCUMENT_URL as string
const removeDocumentApi = (fileId: string) => {
  return fetch(`${documentUrl}/item/${fileId}`, {
    method: 'DELETE'
  })
}

// for testing, don't care
const linkDocumentApi = (files: any) => {
  return fetch(documentUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Specify the content type if sending JSON data
    },
    body: JSON.stringify(files) // Convert your data to JSON format
  })
}

export default {
  removeDocumentApi,
  linkDocumentApi
}
