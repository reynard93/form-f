export {}

export interface ErrorState {
  errorState: 'error' | 'warning' | 'disabled' | null
  errorMsg: string
}
