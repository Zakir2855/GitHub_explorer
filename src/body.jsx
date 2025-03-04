import React from "react";
import { useNavigate } from "react-router-dom";
const githubToken = import.meta.env.VITE_APP_GITHUB_TOKEN;


function Main({ data, setData, type, profile, page, setPage, input}) {
  let navigate=useNavigate();
  //handling navigation to repositories page
  function handleRepos(){
sessionStorage.setItem("user",input);
navigate("/userDetails");
  }
  //handling pagination
  //decreses pages
  function decPage() {
    if (page > 1) {
      setPage((page) => page - 1);
    }
  }
  //inc page
  function incPage() {
    setPage((page) => page + 1);
    fetch(
      `https://api.github.com/search/repositories?q=node+in:name+language:${input}&sort=stars&order=desc&per_page=30&page=${page}`
    )
      .then((res) => res.json())
      .then((rt) => setData(rt.items))
      .catch((err) => {
        alert(err.message);
        console.error("Error in fetching next page results:", err);
      });
  }
  // for default show
  if (!data || data.length === 0) {
    return <div>No results found</div>;
  } else {
    if (type === "language") {
      return (
        <div className="mainBar">
          <div className="gridTable">
            {data.map((item, index) => {
              return (
                <div className="box" key={index}>
                  <h3>Name: {item.full_name}</h3>
                  <h3>Description: {item.description}</h3>
                  <h3>Language: {item.language}</h3>
                  <h3>Forks Count: {item.forks_count}</h3>
                  <h3>Viewers:{item.watchers}</h3>
                  <h3>
                    <a href={item.svn_url}>Go to the repository</a>
                  </h3>
                </div>
              );
            })}
          </div>
          <button onClick={decPage}>Previous</button>
          <button onClick={incPage}>Next</button>
        </div>
      );
    } else if (type === "user" && profile.length > 0) {
      return (
        <div className="mainBar">
          <div className="gridTable">
            {profile.map((item, index) => {
              return (
                <div className="box" key={index}>
                  <img src={item.avatar_url} alt="avatar" />
                  <h3>Name: {item.login}</h3>
                  <p>Followers: {item.followers} | Following: {item.following}</p>
                  <button onClick={()=>handleRepos()}>Public Repos: {item.public_repos}</button>
                  <h3>StarCount:{item.starred_url}</h3>
                  <h3>
                    <a href={item.html_url}>Go to the profile</a>
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div className="mainBar">
          <div className="gridTable">
            {data.map((item, index) => {
              return (
                <div className="box" key={index}>
                  <h3>Name: {item.full_name}</h3>
                  <h3>Description: {item.description}</h3>
                  <h3>Language: {item.language}</h3>
                  <h3>Forks Count: {item.forks_count}</h3>
                  <h3>Viewers:{item.watchers}</h3>

                  <h3>
                    <a href={item.svn_url}>Go to the repository</a>
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }
}

export default Main;
