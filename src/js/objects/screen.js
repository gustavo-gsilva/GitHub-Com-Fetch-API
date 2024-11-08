const followersIcon = `<i class="fa-solid fa-users"></i>`
const followingIcon = `<i class="fa-solid fa-user"></i>`

const screen = {
    userProfile: document.querySelector('.profile-data'),

    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">

                            <img src="${user.avatarUrl}" alt="Foto do Perfil do Usuário"/>

                            <div class="data">
                                <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                            </div>

                            <ul>
                                <li>${followersIcon} Seguidores ${user.followers}</li>
                                <li>${followingIcon} Seguindo ${user.following}</li>
                            </ul>

                        </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `
                                                                <ul>
                                                                    <li>
                                                                        <a href="${repo.html_url}" target="_blank">${repo.name}
                                                                        <div class="repositories-info">
                                                                            <span>🍴${repo.forks_count}</span>
                                                                            <span>⭐${repo.stargazers_count}</span>
                                                                            <span>👀${repo.watchers_count}</span>
                                                                            <span>🧑‍💻 ${repo.language}</span>
                                                                        </div>
                                                                        </a>
                                                                    </li>
                                                                </ul>`);

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class= "repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`
        }
        this.userProfile.innerHTML += `<div class="events-section">
                                        <h2>Eventos</h2>
                                    </div>`
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }