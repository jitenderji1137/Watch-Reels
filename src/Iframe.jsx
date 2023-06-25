import React,{useEffect,useState} from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player'
const Iframe = () => {
    const [videoarr,videoarrvalue] = useState([]);
    const [count,countvalue] = useState(0);
    const [val,valvalue] = useState(true);
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
            videoarrvalue([...videoarr,...ar]);
            valvalue(false)
        })
    }
    useEffect(() => {
        getdata();
    }, []);
    useEffect(() => {}, [val]);
    const handlestate = () => {
        countvalue(count+1);
        if(videoarr.length-2 === count){
            getdata();
        }
    };
    return (
        <>
        {count>0?
        <ReactPlayer width="100%" height="100vh" muted={false} playing={true} loop={true} url={`https://media.chingari.io${videoarr[count]}`}/>:<></>}  
        <button style={{position:"absolute",top:"0",background:"transparent",width:"100vw",height:"50vh",border: "none",borderColor:"transparent"}} onClick={()=>{if(count>0){countvalue(count-1);}}}></button>
        <button style={{position:"absolute",bottom:"0",background:"transparent",width:"100vw",height:"50vh",border: "none",borderColor:"transparent"}} onClick={handlestate}></button>
        </>
    
);
};

export default Iframe;
