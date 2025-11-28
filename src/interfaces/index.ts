export interface ITransaction {
	date: Date
	items: IRecord[]
}

export interface IInstallment {
	current: number
	total: number
}
export interface IRecord {
	name: string
	value: number
	persist: boolean
	installments?: IInstallment
}
