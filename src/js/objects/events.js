document.getElementById('btn-search').addEventListener('click', handleSearch);

async function handleSearch() {
    const userName = document.getElementById('input-search').value.trim();
    if (!userName) return;

    await displayPushEvents(userName);
}

async function getGitHubEvents(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}/events`);
    return await response.json();
}

async function displayPushEvents(userName) {
    const eventInfo = document.getElementById('eventInfo');
    eventInfo.innerHTML = '';
    
    try {
        const events = await getGitHubEvents(userName);
        
        const pushEvents = events.filter(event => event.type === 'PushEvent');
        const createEvents = events.filter(event => event.type === 'CreateEvent');

        const eventMessages = [...pushEvents, ...createEvents]
            .slice(0, 10)
            .map(formatEvent)
            .join('');

        eventInfo.innerHTML = eventMessages || '<p>Nenhum evento encontrado</p>';
    } catch{
    }
}

function formatEvent(event) {
    const repoName = event.repo.name;
    
    if (event.type === 'PushEvent') {
        const commitMessages = event.payload.commits.map(commit => commit.message.trim()).filter(message => message.length > 0);
        const message = commitMessages.length > 0 ? commitMessages.join(', ') : 'Sem mensagem de commit';
        return `<div class="events-info">
                        <p class="repositories-events">${repoName} - <span>${message}</span></p>
                </div>`;
    }
    
    return `<p>${repoName} - Sem mensagem de commit</p>`;
}

export { displayPushEvents };