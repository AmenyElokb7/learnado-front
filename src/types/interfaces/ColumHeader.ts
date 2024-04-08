export interface ColumnHeader {
  id: number
  label: string
  minWidth?: number
  align?: 'right' | 'center' | 'left'
  format?: (value: number) => string
}
