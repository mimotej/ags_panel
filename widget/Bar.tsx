import { App, Astal, Gtk, Gdk } from "astal/gtk4"
import Hyprland from 'gi://AstalHyprland';
import { Variable } from "astal"

const time = Variable("").poll(1000, "date")

export default function Bar(monitor: Gdk.Monitor, hyprland: Hyprland) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

    return <window
        visible
        cssClasses={["Bar"]}
        gdkmonitor={monitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={TOP | LEFT | RIGHT}
        application={App}>
        <centerbox cssName="centerbox">
            <box halign={Gtk.Align.START}>
                {hyprland.get_workspaces().filter(workspace => workspace.get_monitor().get_name() == monitor.get_connector()).sort((workspace_1, workspace_2) => workspace_1.get_name() - workspace_2.get_name()).map(workspace =>(
                <button
                        onClicked={() => workspace.focus()}
                        label={workspace.get_name()}
                />

                ))}
            </box>

            <button
                onClicked="echo hello"
                hexpand
                halign={Gtk.Align.CENTER}
            >
                Welcome to AGS!
            </button>
            <box />
            <menubutton
                hexpand
                halign={Gtk.Align.CENTER}
            >
                <label label={time()} />
                <popover>
                    <Gtk.Calendar />
                </popover>
            </menubutton>
        </centerbox>
    </window>
}
