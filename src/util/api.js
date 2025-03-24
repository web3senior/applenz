
export async function getNetwork() {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}network`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}
/**
 * Category
 * @returns 
 */
export async function getCategory() {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}category`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}

export async function getApp() {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}app`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}


export async function updateLayer(data, id) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token').slice(1, localStorage.getItem('token').length - 1)}`)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}updateLayer/${id}`, requestOptions)
  if (!response.ok) throw new Response('Failed to ', { status: 500 })
  return response.json()
}
