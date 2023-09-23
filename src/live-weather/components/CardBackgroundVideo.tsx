import { CardCover } from '@mui/joy';
import React, { useRef, useState, useEffect } from 'react';


const CardBackgroundVideo: React.FunctionComponent<{
    url: string,
    poster: string,
    opacity: number,
}> = (props) => {
    const playerRef = useRef(null);
    const [video, setVideo] = useState(true);

    function play(){
        if(playerRef.current){
            const player = (playerRef.current as any);
            const promise = player.play() as Promise<any>;
            promise.catch(() => {
                setVideo(false);
            })
        }
    }

    useEffect(() => {    
        if(playerRef.current){
            const player = (playerRef.current as any);
            player.load();
        }
    }, [props.url]);

    return <CardCover style={{opacity: props.opacity}}>
        {video ? (
                <video
                    ref={playerRef}
                    controls={false}
                    loop
                    muted
                    onLoadedData={play}
                    poster={props.poster}
                >
                    <source
                        src={props.url}
                        type="video/mp4"
                    />
                </video>) : <img src={props.poster} alt="Video poster" />}
    </CardCover>;
}

export default CardBackgroundVideo;