import { Props } from './Bar';
import { bind } from 'astal';
import Hyprland from 'gi://AstalHyprland';
import Workspace from 'gi://AstalHyprland';
import { Variable } from 'astal';
import Mpris from 'gi://AstalMpris';
export function CenterBar({ monitor, hyprland }: Props): JSX.Element {
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
        <button>
            <image iconName={bind(youtube_music, "playbackStatus").as(status =>
            status === Mpris.PlaybackStatus.PLAYING
              ? "media-playback-pause"
              : "media-playback-start"
          )} />
        </button>
        </box>
    );
}
