export interface Media {
  id: number
  modelType: string
  ModelId: number
  fileName: string
  mimeType: string
  externalUrl?: string
  title: string
}

export interface MediaApi {
  id: number
  model_type: string
  model_id: number
  file_name: string
  mime_type: string
  external_url?: string
  title: string
}
