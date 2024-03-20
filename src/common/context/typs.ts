export type ReducerState<T> = {
    errors: Error[],
    status: 'idle' | 'loading' | 'success' | 'failed',
    data: T | null
    name?: string
}