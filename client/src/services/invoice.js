import axios from 'axios'

const baseUrl = process.env.NEXT_PUBLIC_API_URL
export async function getAllInvoice() {
  try {
    const { data } = await axios.get(`${baseUrl}/invoice`)
    const sortedInvoiceByDate = data.sort((a, b) => new Date(a.dateTimeRequested) - new Date(b.dateTimeRequested))
    return sortedInvoiceByDate
  } catch (error) {
    console.log('Error: ', error)
  }
}

export async function getInvoiceById(id) {
  try {
    const { data } = await axios.get(`${baseUrl}/invoice/${id}`)
    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}

export async function createInvoice(invoiceData) {
  try {
    const response = await axios.post(`${baseUrl}/invoice`, invoiceData)
    return response.data
  } catch (error) {
    console.log('Error creating invoice: ', error)
    throw error // Re-throwing the error so that it can be handled where the function is called
  }
}

export async function updateInvoice(invoiceData) {
  try {
    const response = await axios.put(`${baseUrl}/invoice/${invoiceData._id}`, invoiceData)
    return response.data
  } catch (error) {
    console.log('Error Updating invoice: ', error)
    throw error // Re-throwing the error so that it can be handled where the function is called
  }
}

//Total Invoices
export async function getTotalUnpaidInvoices(user) {
  let url
  if (user.role === 'admin') {
    url = 'invoice/unpaid/total'
  } else {
    url = `invoice/${user.role}/${user._id}/total-unpaid`
  }
  try {
    const { data } = await axios.get(`${baseUrl}/${url}`)
    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}
