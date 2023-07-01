import React,{useEffect,useState} from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player'
const Iframe = () => {
    const [videoarr,videoarrvalue] = useState([]);
    const [count,countvalue] = useState(0);
    // const [vall,vvalvalue] = useState(true);
    function getdata(){
        axios.post('https://api.chingari.io/post/trending-video-current?skip=0&limit=10&language=english')
        .then(function (response) {
            const arrrr = response.data.data.TrendingFeedData;
            let ar = [];
            for (const iterator of arrrr) {
                const ardata = iterator.mediaLocation.transcoded;
                if(ardata!==undefined){
                    ar.push(ardata.p1024);
                }
            }
            console.log(ar)
            videoarrvalue([...videoarr,...ar]);
        })
    }
    useEffect(() => {
        getdata();
    },[]);
    const handlestate = () => {
        countvalue(count+1);
        if(videoarr.length-2 === count){
            getdata();
        }
    };
    const bstyle = {
        backgroundColor: "rgba(255, 0, 0, 0)",
        position: "absolute",
        height: "90%",
        cursor: "pointer",
        width: "30%",
        fontSize: "5rem",
        fontWeight: "bolder",
        color: "rgb(128 128 128 / 21%)",
        outline:"none",
        border: 0,
        top: 0,
    }
        return (
        <>
        {count>=0?
        <ReactPlayer width="100vw" height="100vh" muted={false} playing={true} loop={true} url={`https://media.chingari.io${videoarr[count]}`}/>:<></>}  
        <button style={{...bstyle, left: 0}} onClick={()=>{if(count>0){countvalue(count-1);}}}>&#10094;&#10094;</button>
        <button style={{...bstyle, right: 0}} onClick={handlestate}>&#10095;&#10095;</button>
        </>
    
);
};

export default Iframe;
