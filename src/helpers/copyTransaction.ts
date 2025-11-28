import type { IInstallment, ITransaction } from '@/interfaces'

export function copyTransaction(date: Date, existingTransaction: ITransaction) {
	date.setMonth(date.getMonth() + 1)
	const newItems = existingTransaction.items.map((item) => ({
		_id: undefined,
		name: item.name,
		value: item.value,
		persist: item.persist,
		installments: updateInstallments(item.installments)
	}))

	const newTransaction: ITransaction = {
		items: newItems,
		date: date
	}
	return newTransaction
}

function updateInstallments(installments: IInstallment | undefined) {
	if (!installments) return installments

	const { current, total } = installments

	if (current >= total) {
		return
	}

	return {
		current: current + 1,
		total: total
	}
}
