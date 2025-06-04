import { App, Gtk } from 'astal/gtk4';

import Hyprland from 'gi://AstalHyprland';
import style from './style.scss';
import Bar from './widget/Bar';
function main() {
    const hyprland = Hyprland.get_default();
    
    const bars = new Map<Gdk.Monitor, Gtk.Widget>()

    // initialize
    for (const gdkmonitor of App.get_monitors()) {
        bars.set(gdkmonitor, Bar(gdkmonitor, hyprland))
    }

    App.connect("monitor-added", (_, gdkmonitor) => {
        bars.set(gdkmonitor, Bar(gdkmonitor, hyprland))
    })

    App.connect("monitor-removed", (_, gdkmonitor) => {
        bars.get(gdkmonitor)?.destroy()
        bars.delete(gdkmonitor)
    })
}
App.start({
    css: style,
    main: main,
});
