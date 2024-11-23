
main();

async function main(){
    const username = process.argv[2];
    
    const opciones = {method:'GET'}
    try {
         await getActivityFromAPI(username, opciones); 
    } catch (error) {
        console.error(error.message);
    }
}

async function getActivityFromAPI(username, opciones){
    const url = `https://api.github.com/users/${username}/events`;
    const response = await fetch(url,opciones);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }        
    const json = await response.json();
    
    console.log(`${username} has...`);
    json.forEach((event)=>{
        switch(event.type){
            case "CommitCommentEvent": console.log(`Created a commit comment in ${event.repo.name}`); break;
            case "CreateEvent": console.log(`Created a ${event.payload.ref_type}  in ${event.repo.name}`);break;
            case "DeleteEvent": console.log(`Deleted a ${event.payload.ref_type} in ${event.repo.name}`);break;
            case "ForkEvent": console.log(`Forked the repository. Object Forked ${event.payload.forkee}`);break;
            case "GollumEvent": console.log(`Updated or created wiki pages on ${event.repo.name}`);break;
            case "IssueCommentEvent": console.log(`${capitalizeFirstLetter(event.payload.action)} a comment related to the issue "${event.payload.issue.title}" in ${event.repo.name}`);break;
            case "IssuesEvent": console.log(`${capitalizeFirstLetter(event.payload.action)} the issue "${event.payload.issue.title}" in ${event.repo.name}`);break;
            case "PublicEvent": console.log(`Maded public the repository ${event.repo.name}`);break;
            case "PullRequestEvent": console.log(`${capitalizeFirstLetter(event.payload.action)} the pull request "${event.payload.pull_request.title}" in ${event.repo.name}`);break;
            case "PullRequestReviewEvent": console.log(`${capitalizeFirstLetter(event.payload.action)} the review ${event.payload.review} in the pull request "${event.payload.pull_request.title}" in the repository ${event.repo.name}`);break;
            case "PullRequestReviewCommentEvent": console.log(`${capitalizeFirstLetter(event.payload.action)} a comment in the pull request review ${event.payload.review} in the repository ${event.repo.name}`);break;
            case "PullRequestReviewThreadEvent": console.log(`${capitalizeFirstLetter(event.payload.action)} a comment thread in the pull request "${event.payload.pull_request.title}"`);break;
            case "PushEvent": console.log(`Pushed ${event.payload.commits.length} commit(s) to ${event.repo.name}`);break;
        }       
    });
}

function capitalizeFirstLetter(str) {
    if (!str) return ''; 
    return str.charAt(0).toUpperCase() + str.slice(1);
}