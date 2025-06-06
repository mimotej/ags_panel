import { Gtk } from 'astal/gtk4';
import { Props } from './Bar';

export function LeftBar({ monitor, hyprland }: Props): JSX.Element {
    return (
        <box halign={Gtk.Align.START}>
            {hyprland
                .get_workspaces()
                .filter(
                    (workspace) => workspace.get_monitor().get_name() ==
                        monitor.get_connector()
                )
                .sort(
                    (workspace_1, workspace_2) => workspace_1.get_name() - workspace_2.get_name()
                )
                .map((workspace) => (
                    <button
                        onClicked={() => workspace.focus()}
                        label={workspace.get_name()} />
                ))}
        </box>
    );
}

