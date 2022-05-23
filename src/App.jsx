import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import CandidateCard from "./components/CandidateCard";
import "./styles.css";
import axios from "axios";

export default function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [load, setLoad] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() =>{

   fetchData(page);

  },[page]);

  const fetchData = async (page) =>{
    axios({
      method: 'get',
      url: "https://json-server-mocker-masai.herokuapp.com/candidates",
      params:{
           _page : page,
           _limit : 5,
      }
               })
   .then(res =>{
   setData(res.data);
   setLoad(false);
   })
   .catch(err =>{
   setError(true);
   setLoad(false);
   })
  }
  console.log(data);

  return (
    <div className="App">
      <div>
        <div id="loading-container">...Loading</div>
        <Button id="SORT_BUTTON" title={`Sort by Ascending Salary`} />
        <Button onClick={() => setPage(page+1)} title="PREV" id="PREV" />
        <Button onClick={() => setPage(page-1)} id="NEXT" title="NEXT" />
      </div>
      {data.map(item => <CandidateCard key={item.id} {...item} />)}
      
    </div>
  );
}
