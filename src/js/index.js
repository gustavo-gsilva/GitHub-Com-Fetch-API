import { getUser } from './services/user.js'
import { getRepositories } from './services/repositories.js'

import { user } from './objects/user.js';
import { screen } from './objects/screen.js';
import { displayPushEvents } from './objects/events.js';

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if (validateEmptyInput(userName)) return
    getUserData(userName);
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.witch || e.keyCode
    const isEnterKeyPressed = key === 13

    if (isEnterKeyPressed) {
        if (validateEmptyInput(userName)) return
        getUserData(userName)
    }
})

function validateEmptyInput(userName) {
    if (userName.length === 0) {
        alert('Preencha o campo com o nome do usuário do GitHub')
        return true
    }
}

async function getUserData(userName) {

    const userResponse = await getUser(userName)

    if (userResponse.message === "Not Found") {
        screen.renderNotFound()
        return
    }

    const repositoriesResponse = await getRepositories(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)

    screen.renderUser(user)
}

async function getUserInfo(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}/events`)
    if (!response.ok) throw new Error('Usuário não encontrado');
    return await response.json()
}

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if (!userName) {
        return
    }

    try {
        const user = getUserInfo(userName);
        screen.renderUser(user);
        const eventInfo = document.getElementById('eventInfo');
        displayPushEvents(userName, eventInfo);
    } catch (error) {
        console.error(error);
        screen.renderNotFound();
    }

    if (count === 0) {
        eventInfo.innerHTML = `<p>Nenhum evento encontrado</p>`
    }
})