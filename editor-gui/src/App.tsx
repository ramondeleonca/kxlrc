import lyricsJSON from "./supershylrctimestamped";
import KXLRC from './../../src';

export default function App() {
    const lyrics = KXLRC.parse(lyricsJSON)!;
    
    return (
        <div className="flex flex-col items-stretch justify-start pl-20 pr-56 pt-8 pb-8">
            {lyrics.map((lyric, i) => <textarea key={i}>{KXLRC.timestampedTextToString(lyric.text)}</textarea>)}
        </div>
    )
}