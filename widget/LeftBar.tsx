import { Gtk, Gdk } from 'astal/gtk4';
import { Props } from './Bar';
import { bind } from 'astal';
import Hyprland from 'gi://AstalHyprland';
import Workspace from 'gi://AstalHyprland';
import { Variable } from 'astal';
function get_icon(wd: Hyprland.Client): string {
    if (wd == null) {
        return 'application-x-executable'; // default icon for no client
    }
    return wd.get_class();
}

function get_current_workspaces(
    hyprland: Hyprland.Hyprland,
    monitor: Gdk.Monitor
): Workspace.Workspace[] {
    return hyprland
        .get_workspaces()
        .filter((ws) => ws.get_monitor().get_name() == monitor.get_connector())
        .sort((a, b) => a.id - b.id);
}

export function LeftBar({ monitor, hyprland }: Props): JSX.Element {
    const focusedWorkspace = bind(hyprland, 'focused_workspace');
    const workspaces = Variable(get_current_workspaces(hyprland, monitor))
        .observe(hyprland, 'client-moved', () =>
            get_current_workspaces(hyprland, monitor)
        )
        .observe(hyprland, 'client-added', () =>
            get_current_workspaces(hyprland, monitor)
        )
        .observe(hyprland, 'client-removed', () =>
            get_current_workspaces(hyprland, monitor)
        );
    return (
        <box halign={Gtk.Align.START}>
            {bind(workspaces).as((w) =>
                w
                    .filter((workspace) => workspace.get_last_client())
                    .map((workspace) => (
                        <button onClicked={() => workspace.focus()}>
                            <box>
                                <label label={workspace.get_name()} />
                                <image
                                    iconName={get_icon(
                                        workspace.get_last_client()
                                    )}
                                />
                            </box>
                        </button>
                    ))
            )}
        </box>
    );
}
