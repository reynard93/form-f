export {}

export interface ErrorState {
  errorState: 'error' | 'warning' | 'disabled' | null | undefined
  errorMsg: string
}
