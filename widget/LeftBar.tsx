import { Gtk } from 'astal/gtk4';
import Apps from 'gi://AstalApps';
import { Props } from './Bar';

export function LeftBar({ monitor, hyprland }: Props): JSX.Element {
    const apps = new Apps.Apps({
    nameMultiplier: 2,
    entryMultiplier: 0,
    executableMultiplier: 2,
    })
    let list_icons = []
    for (const client of hyprland.get_clients()) {
        const name = client.get_initial_class().split('.').pop().replace(/_/g, ' ');
        for (const app of apps.fuzzy_query(name)) {
            list_icons.push(app.get_icon_name())
            break;
        }
    }
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
                .map((workspace) => {
                    {list_icons.filter(
                            (icon) => workspace.get_clients ? '' : workspace.get_clients()[0].get_initial_class().includes(icon)
                    ).map((icon) => (
                    <img src={`/home/icons/${icon}.svg`} width={16} height={16} />))
                }
                    <button
                        onClicked={() => workspace.focus()}
                        label={workspace.get_name()} />
                })}
        </box>
    );
}

