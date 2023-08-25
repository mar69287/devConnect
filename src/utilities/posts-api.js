import sendRequest from './send-request'
const BASE_URL = '/api/posts'

export async function createPost(postData) {
    console.log('here at post api', postData)
    // return sendRequest(`${BASE_URL}/create`, 'POST', postData)
}