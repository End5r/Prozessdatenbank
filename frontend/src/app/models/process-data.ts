export interface ProcessData { // Model that will be linked with Pydantic-Model
    id: number,
    amount: number,

    name: string,
    timestamp: string,
    status: string
}
