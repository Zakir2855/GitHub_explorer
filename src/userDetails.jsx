import { use, useState } from "react";
import { useEffect } from "react";
const githubToken = import.meta.env.VITE_APP_GITHUB_TOKEN;

function UserRepo(){

    let [repos,setRepos]=useState([]);
    let username=sessionStorage.getItem("user");
    useEffect(()=>{console.log(username)},[username])
     function fetchUserRepos() {
        fetch(`https://api.github.com/users/${username}/repos`,{
            method: 'GET',
            headers: {
              'Authorization':  `token ${githubToken}`,
              'Accept': 'application/vnd.github.v3+json'
            }
          }).then((res)=>res.json()).then((ress)=>setRepos(ress));
      }
    useEffect(()=>{
fetchUserRepos();
    },[])
    return(
        <>
         <h2>Repositories</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>{" "}
            ⭐ {repo.stargazers_count}
          </li>
        ))}
      </ul>
    
        </>
    )
}
export default UserRepo;