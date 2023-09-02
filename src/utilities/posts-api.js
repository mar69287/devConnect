import sendRequest from './send-request'
const BASE_URL = '/api/posts'

export async function createPost(postData) {
    console.log('here at post api', postData)
    return sendRequest(`${BASE_URL}/create`, 'POST', postData)
}
export async function getPost(id) {
    return sendRequest(`${BASE_URL}/${id}`)
}

export async function getPosts() {
    return sendRequest(BASE_URL)
}

export async function deletePost(id) {
    return sendRequest(`${BASE_URL}/${id}`, 'DELETE')
}

export async function updatePost(id, updatedData) {
    // console.log(id, updatedData)
    return sendRequest(`${BASE_URL}/${id}`, 'PUT', updatedData)
}
