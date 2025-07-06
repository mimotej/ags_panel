import { App, Astal, Gtk, Gdk } from 'astal/gtk3';
import Hyprland from 'gi://AstalHyprland';
import { Variable } from 'astal';
import { LeftBar } from './left_bar';
import { CenterBar } from './center_bar';

const time = Variable('').poll(1000, 'date');
export type Props = {
    hyprland: Hyprland;
    monitor: Gdk.Monitor;
}

export default function Bar(monitor: Gdk.Monitor, hyprland: Hyprland) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;
    return (
        <window
            visible
            cssClasses={['Bar']}
            gdkmonitor={monitor}
            exclusivity={Astal.Exclusivity.EXCLUSIVE}
            anchor={TOP | LEFT | RIGHT}
            application={App}
        >
            <centerbox cssName="centerbox">
                <LeftBar monitor={monitor} hyprland={hyprland} />
                <CenterBar />
                <menubutton >
                    <label label={time()} />
                    <popover>
                        <Gtk.Calendar />
                    </popover>
                </menubutton>
            </centerbox>
        </window>
    );
}
