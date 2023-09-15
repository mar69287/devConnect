import sendRequest from './send-request'
const BASE_URL = '/api/profiles'

export async function createProfile(profileData) {
    return sendRequest(`${BASE_URL}/create`, 'POST', profileData)
}

export async function getUserProfile() {
    return sendRequest(BASE_URL)
}

export async function updateUserProfile(id, updatedData) {
    return sendRequest(`${BASE_URL}/${id}`, 'PUT', updatedData)
}

export async function deleteProfile(userId) {
    return sendRequest(`${BASE_URL}/${userId}`, 'DELETE')
}

export async function addFollowing(profileId, postProfileId) {
    // console.log(postProfileId)
    return sendRequest(`${BASE_URL}/${profileId}/following/${postProfileId}`, 'POST')
}

export async function deleteFollowing(profileId, postProfileId) {
    return sendRequest(`${BASE_URL}/${profileId}/following/${postProfileId}`, 'DELETE')
}

export async function getProfile(userName) {
    return sendRequest(`${BASE_URL}/${userName}`)
}

export async function addSkill(profileId, skill) {
    return sendRequest(`${BASE_URL}/${profileId}/skills/${skill}`, 'POST')
}

export async function deleteSkill(profileId, skill) {
    return sendRequest(`${BASE_URL}/${profileId}/skills/${skill}`, 'DELETE')
}