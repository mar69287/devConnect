import sendRequest from './send-request'
const BASE_URL = '/api/posts'

export async function createPost(postData) {
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
    return sendRequest(`${BASE_URL}/${id}`, 'PUT', updatedData)
}

export async function addLike(postId, idData) {
    return sendRequest(`${BASE_URL}/${postId}/like`, 'POST', idData)
}

export async function deleteLike(postId, idData) {
    return sendRequest(`${BASE_URL}/${postId}/like`, 'DELETE', idData)
}

export async function getUserLikes(profileId) {
    return sendRequest(`${BASE_URL}/${profileId}/like`)
}

export async function getPostLikes(postId) {
    return sendRequest(`${BASE_URL}/likes/${postId}`)
}

export async function addComment(postId, commentData) {
    return sendRequest(`${BASE_URL}/${postId}/comment`, 'POST', commentData)
}

export async function getPostComments(postId) {
    return sendRequest(`${BASE_URL}/${postId}/comments`)
}

export async function deleteComment(postId, commentId) {
    return sendRequest(`${BASE_URL}/${postId}/comments/${commentId}`, 'DELETE')
}

export async function getProfilePosts(profileId) {
    return sendRequest(`${BASE_URL}/profile/${profileId}`)
}