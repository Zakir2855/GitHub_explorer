import { useEffect, useState } from "react";
import Main from "../body";
const githubToken = import.meta.env.VITE_APP_GITHUB_TOKEN;


function SearchBar() {

  //to handle the pagination of language
  const [page,setPage]=useState(1);
  console.log(page);
  //state to handle the search bar
  const [input, setInput] = useState("");
  // function to handle the above
  const handleInput = (e) => {
    let inputVal = e.target.value;
    let inputValue = inputVal.toLowerCase();
    setInput(inputValue);
  };
  //to handle type of search by select
  const [type, setType] = useState("");

  //func for above
  const handleType = (e) => {
    setType(e.target.value);
  };
  //handling the api here++++++++++++++++++++++++++++++++++++
  const [data, setData] = useState([]);
  //user api 
  const [profile,setProfile]=useState([]);
  //default results-------------------
  useEffect(() => {
    fetch(
      "https://api.github.com/search/repositories?q=node+in:name+language:javascript&sort=stars&order=desc&per_page=30&page=1",
      {
        method: 'GET',
        headers: {
          'Authorization':  `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    )
      .then((res) => res.json())
      .then((rt) => {
        setData(rt.items);
        console.log(rt.items,"default js lang results");
      });
  }, [page]);

  //++++ submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "" || type === "none") {
      alert("Please select a type and enter a valid input.");
      return;
    }

    if (type === "language") {
      fetch(
        `https://api.github.com/search/repositories?q=node+in:name+language:${input}&sort=stars&order=desc&per_page=30&page=${page}`,{
          method: 'GET',
          headers: {
            'Authorization':  `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      )
        .then((res) => res.json())
        .then((rt) => setData(rt.items))
        .catch((err) => {alert(err.message); console.error("Error fetching user results:", err);});
    } else if (type === "user") {
      fetch(`https://api.github.com/users/${input}`,{
        method: 'GET',
        headers: {
          'Authorization':  `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      })
        .then((res) => res.json())
        .then((rt) =>{ setProfile([rt])})
        .catch((err) => alert(err.message));
    }
  };
  //end

  //page change handler


  //   testing purposes
  useEffect(() => {
    console.log(data, "here is data ");
  }, [data, setData]);

  return (
    <>
      <form onSubmit={handleSubmit} action="">
        <input type="text" placeholder="search" onChange={handleInput} />
        <div className="selector">
          <span>Select user or language</span>
          <select onChange={handleType} name="type" id="">
            <option value="none">Select type</option>
            <option value="language">Language</option>
            <option value="user">User</option>
          </select>
        </div>

        <button type="submit">Search</button>
      </form>
      {/* passing type of search and searched data in important.jsx */}
     <Main  data={data} setData={setData} type={type} profile={profile} page={page} setPage={setPage} input={input} setInput={setInput}/>
    
    </>
  );
}
export default SearchBar;