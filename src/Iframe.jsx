import React,{useEffect, useState} from 'react';
import axios from 'axios';
const Iframe = () => {
    const [videoarr,videoarrvalue] = useState([]);
    const [count,countvalue] = useState(0);
    function getdata(){
        axios.post('https://api.chingari.io/post/trending-video-current?skip=0&limit=10')
        .then(function (response) {
            const arrrr = response.data.data.TrendingFeedData;
            let ar = [];
            for (const iterator of arrrr) {
                const ardata = iterator.mediaLocation.transcoded;
                if(ardata!==undefined){
                    ar.push(ardata.p1024);
                }
            }
            videoarrvalue(ar);
        })
    }
    useEffect(()=>{
        getdata();
    },[]);
    return (
        <>
        <iframe
            id="video-player"
            src={`https://media.chingari.io${videoarr[count]}`}
            title="Embedded Content"
            style={{position: 'absolute',top: 0,left: 0,width: '100%',height: '100%',border: 0,}}
            allowFullScreen
        />
        <button style={{position:"absolute",top:"0"}} onClick={()=>{
            countvalue(count+1);
            if(videoarr.length-2 === count){
                getdata();
                countvalue(0);
            }
            }}>Next video</button>
        </>
    
);
};

export default Iframe;
