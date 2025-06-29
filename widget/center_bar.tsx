import { bind } from 'astal';
import Mpris from 'gi://AstalMpris';
export function CenterBar(): JSX.Element {
    const youtube_music = Mpris.Player.new('YoutubeMusic');
    return (
        <box>
        <button>

            <box>
                <image file={bind(youtube_music, "coverArt")} />
                <label label={bind(youtube_music, "artist")} />
                <label label={" - "} />
                <label label={bind(youtube_music, "title")} />
            </box>
        </button>
        <button onClicked={() => youtube_music.previous()}>
            <image iconName={"media-seek-backward"} />
        </button>
        <button onClicked={() => youtube_music.play_pause()}>
            <image iconName={bind(youtube_music, "playbackStatus").as(status =>
            status === Mpris.PlaybackStatus.PLAYING
              ? "media-playback-pause"
              : "media-playback-start"
          )} />
        </button>
        <button onClicked={() => youtube_music.next()}>
            <image iconName={"media-seek-forward"} />
        </button>

        </box>
    );
}
