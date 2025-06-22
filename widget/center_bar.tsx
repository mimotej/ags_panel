import { Props } from './Bar';
import { bind } from 'astal';
import Hyprland from 'gi://AstalHyprland';
import Workspace from 'gi://AstalHyprland';
import { Variable } from 'astal';
import Mpris from 'gi://AstalMpris';
export function CenterBar({ monitor, hyprland }: Props): JSX.Element {
    const youtube_music = Mpris.Player.new('YoutubeMusic');
    return (
        <button>
            <box>
                <image file={youtube_music.get_cover_art()} />
                <label label={youtube_music.title} />
            </box>
        </button>
    );
}
